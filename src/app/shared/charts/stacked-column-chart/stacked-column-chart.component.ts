import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.css']
})
export class StackedColumnChartComponent implements OnInit, OnDestroy, OnChanges {

  private chart: am4charts.XYChart;
  private colorIndex: number = 4;

  @Input() stackedData: any[]
  @Input() stackedSeries: string[];
  /**This property is the name of the group to which the objects we receive and measure belong.
   * Since it's a generic chart and we do not know in advance what the objects will be or
   * what their type will be, I would like to get from the outside what these objects are and
   * what their name is as a multiple group.
   * 
   * For Example:
   *  "Questions" is possible name for a group of objects.
   */
  @Input()
  chartMeasuredObjectsGroupName: string;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartDispose();
    if (!this.stackedData && !this.stackedSeries) {
      return;
    }
    this.chart = am4core.create("stackedchartdiv", am4charts.XYChart);
    this.chart.data = this.stackedData;
    this.chartConfigue();
  }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
  }

  chartConfigue() {
    //Create title
    let title = this.chart.titles.create();
    title.text = `${this.chartMeasuredObjectsGroupName} Stacked Column Chart`;
    title.fontSize = 25;
    title.marginBottom = 30;

    // Create axes
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    this.stackedSeries.forEach(q => {
      this.createSeries(q, q, this.colorIndex);
    });

    // Legend
    this.chart.legend = new am4charts.Legend();

    // this.chart.scrollbarX =new am4core.Scrollbar();
    // this.chart.scrollbarX.disabled = true;

    // this.chart.responsive.enabled = true;
    // this.chart.responsive.rules.push({
    //   relevant: am4core.ResponsiveBreakpoints.maybeL,
    //   state: function (target, stateId) {
    //     if (target instanceof am4charts.XYChart) {
    //       let state = target.states.create(stateId);
    //       let scrollState = target.scrollbarX.states.create(stateId);
    //       scrollState.properties.disabled = false;
    //       return scrollState;
    //     }
    //     return null;
    //   }
    // });
  }

  

  // Create series
  private createSeries(field, name, colorIndex) {

    //Set up colors
    let currentColor = this.chart.colors.getIndex(colorIndex);

    // Set up series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = field;
    series.name = name;
    series.readerValueText = this.chartMeasuredObjectsGroupName;
    series.dataFields.categoryX = "category";
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(85);
    series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    //Configure tooltip    
    series.tooltip.getFillFromObject = false;
    series.tooltip.label.fill = currentColor
    series.tooltip.background.stroke = currentColor;
    series.columns.template.tooltipHTML = `
    <div class="tooltip-container">
    <div class="tooltip-category">{categoryX}</div>
    <div class="field-container">
    <span class="field-name">{name}</span>
    <span class="field-value">{valueY} {readerValueText}</span>
    </div>
    </div>`;

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    // let hoverState = labelBullet.states.create("hover");

    // /* Create a gentle shadow for columns */
    // let shadow = series.columns.template.filters.push(new am4core.DropShadowFilter);
    // shadow.opacity = 0.1;

    /* Create hover state */
    let hoverState = series.columns.template.states.create("hover");
    hoverState.properties.scale = 1.02;
    hoverState.properties.dx = -2;
    hoverState.properties.dy = -0.2;
    hoverState.properties.fillOpacity = 0.75;

    this.colorIndex += 1;
    return series;
  }

  ngOnDestroy(): void {
    this.chartDispose();
  }

  private chartDispose() {
    if (this.chart) {
      this.colorIndex = 0;
      this.chart.dispose();
    }
  }
}
