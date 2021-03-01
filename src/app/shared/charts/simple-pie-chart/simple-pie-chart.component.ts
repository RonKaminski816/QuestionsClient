import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
@Component({
  selector: 'app-simple-pie-chart',
  templateUrl: './simple-pie-chart.component.html',
  styleUrls: ['./simple-pie-chart.component.css']
})
export class SimplePieChartComponent implements OnInit, OnDestroy, OnChanges {

  private chart: am4charts.PieChart;

  @Input() pieData: any[]
  @Input() chartMeasuredObjectsGroupName: string;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartDispose();
    console.log(changes.pieData);
    if (!this.pieData) {
      return;
    }
    this.chart = am4core.create("piechartdiv", am4charts.PieChart);
    this.chart.data = this.pieData;
    this.chartConfigue();
  }


  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
  }

  chartConfigue() {
    // Create Title
    let title = this.chart.titles.create();
    title.text = `${this.chartMeasuredObjectsGroupName} Pie Chart`;
    title.fontSize = 25;
    title.marginBottom = 20;

    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "category";

    // Pie slices
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

    // Legend
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.itemContainers.template.width = 100;
    this.chart.legend.properties.paddingTop = 25;
    this.chart.legend.properties.marginBottom = 20;
  }

  ngOnDestroy(): void {
    this.chartDispose();
  }

  private chartDispose() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
