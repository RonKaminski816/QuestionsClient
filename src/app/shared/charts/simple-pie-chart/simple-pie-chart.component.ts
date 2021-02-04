import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-simple-pie-chart',
  templateUrl: './simple-pie-chart.component.html',
  styleUrls: ['./simple-pie-chart.component.css']
})
export class SimplePieChartComponent implements OnInit, OnDestroy {

  private chart: am4charts.PieChart;
  constructor(private questionsState: QuestionsStateService) { }


  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.getChartData();
  }
  getChartData() {
    this.questionsState.dataForChartsState().subscribe(
      res => {
        console.log(res);
        if (!res.data) {
          return;
        }
        this.chart = am4core.create("piechartdiv", am4charts.PieChart);
        this.chart.data = res.data;
        this.chartConfigue();
      }
    )
  }

  chartConfigue() {

    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "category";

    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    pieSeries.slices.template.tooltipText = "[white] {category}: {value.percent}%({value})";

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    pieSeries.legendSettings.labelText = "{category}";
    pieSeries.legendSettings.valueText = "[none]";

    this.chart.legend = new am4charts.Legend();
    this.chart.legend.itemContainers.template.width = am4core.percent(8);
  }
  
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
