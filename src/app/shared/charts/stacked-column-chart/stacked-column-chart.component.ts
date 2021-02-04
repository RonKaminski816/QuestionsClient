import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.css']
})
export class StackedColumnChartComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart;
  private stackedSeries: string[];
  constructor(private questionsState: QuestionsStateService) { }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.getChartData();
  }
  getChartData() {
    this.questionsState.dataForChartsState().subscribe(
      res => {
        console.log(res);
        if (!res.data && !res.series) {
          return;
        }
        this.chart = am4core.create("stackedchartdiv", am4charts.XYChart);
        this.chart.data = res.data;
        this.stackedSeries = res.series;
        this.chartConfigue();
      }
    )
  }

  chartConfigue() {

    // Create axes
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    this.stackedSeries.forEach(q => {
      this.createSeries(q, q);

    });

    // Legend
    this.chart.legend = new am4charts.Legend();
  }


  // Create series
  private createSeries(field, name) {

    // Set up series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = field;
    series.name = name;
    series.dataFields.categoryX = "category";
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold,white]{name}[/]\n[white,font-size:14px]{categoryX}: {valueY}";
    //TODO Finish the tooltip HTML text.

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
