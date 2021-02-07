import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

import { startOfDay, endOfDay, startOfWeek, startOfMonth } from 'date-fns';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.css']
})
export class ChartsViewComponent implements OnInit {

  /**Full List with all the questions its porpuse is to refill and get all the question if needed without another request */
  chartQListTemp: QuestionModel[];
  /**amount of question measured in charts */
  qCount: number;
  /**bool for checking if the chart values has changed in the previous date-range adjust  */
  isChanged: boolean;
  /**an object for the date range and its contains a constants ranges to pick in the date range  */
  ranges = { 'Today': [new Date(), new Date()], 'This Week': [startOfWeek(new Date), new Date()], 'This Month': [startOfMonth(new Date), new Date()] };

  /**A state of the current questions that measured inside the charts */
  afterChangeQList: QuestionModel[];
  /**Two way binding object thats bind with the html toggle for 'popular hours'  */
  isToggleChecked: boolean;
  /**To disable the toggle after clicking it until the data is inserted to chart */
  isPopularAvailable: boolean = true;

  /**Array of the custom Objects for the charts */
  chartsData: any[];
  /**Array of the custom strings for the charts series */
  chartSeries: string[];

  constructor(private questionsState: QuestionsStateService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getChartsData();
  }

  getChartsData() {
    return this.questionsState.retrieveMappedQuestionListState().subscribe(
      res => {
        this.chartQListTemp = res;
        this.qCount = res.length;
        this.afterChangeQList = [...res];
        this.createFullChartsObjects(this.chartQListTemp);
      },
      error => this.snackbarService.openSimpleTextSnackBar(`An error occurred, please refresh the page: ${error['message']}`)
    );
  }

  createFullChartsObjects(questions: QuestionModel[]) {
    this.chartsData = [];
    this.chartSeries = [];
    const days = [];
    for (let index = 0; index < questions.length; index++) {
      const q = questions[index];
      if (q.creationDate && q.creationDate !== null) {
        const date = new Date(q.creationDate);
        const day = date.toLocaleString('en-us', { weekday: 'long' });
        const hour = date.toLocaleString('en-us', { hour: "numeric" });
        this.chartsData[day] = this.chartsData[day] || {};
        this.chartsData[day][hour] = this.chartsData[day][hour] || 0;
        this.chartsData[day][hour] += 1;
        this.chartsData[day]["count"] = this.chartsData[day]["count"] || 0;
        this.chartsData[day]["count"] += 1;
        if (!days.includes(day)) {
          this.chartsData[day]["category"] = day;
          days.push(day);
          this.chartsData.push(this.chartsData[day]);
        }
        if (!this.chartSeries.includes(hour)) {
          this.chartSeries.push(hour);
        }
      }
    }
    this.chartsData = [...this.chartsData];
    //this.chartSeries = this.chartSeries.sort();
    //TODO Fix the sorting
  }


  

  //TODO Fix the popular logic
  async onTogglePopularHoursChanged() {
    this.isPopularAvailable = false;
    if (this.isToggleChecked) {
      await this.toggleChecked(this.afterChangeQList)
      .catch(err => this.snackbarService.openSimpleTextSnackBar(err.message))
      .finally(() => { this.isPopularAvailable = true });
    } else {
      await this.toggleUnChecked()
      .catch(err => this.snackbarService.openSimpleTextSnackBar(err.message))
      .finally(() => { this.isPopularAvailable = true });
    }
  }
  
  private toggleChecked(questions: QuestionModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chartSeries = [];
      const chartHoursTempData = [];
      const hours = [];
      try {
        // First Section
        // Purpose: to find the 5 most popular hours and create with them the series
        // before creating the 'day objects' for an easy filtering during the 'day objects' creation.

        // Loop for finding and creating an 'hour objects' with the amount of every hour.
        questions.forEach(q => {
          if (q.creationDate && q.creationDate !== null) {
            const date = new Date(q.creationDate);
            const hour = date.toLocaleString('en-us', { hour: "numeric" });
            chartHoursTempData[hour] = chartHoursTempData[hour] || {};
            chartHoursTempData[hour]["count"] = chartHoursTempData[hour]["count"] || 0;
            chartHoursTempData[hour]["count"] += 1;
            if (!hours.includes(hour)) {
              chartHoursTempData[hour]["hour"] = hour;
              hours.push(hour);
              chartHoursTempData.push(chartHoursTempData[hour]);
            }
          }
        });
        // Sort the temporary hours array in descending order by th count of the 'hour object',
        // then take first 5 objects and store them in 'temp'.
        const temp = chartHoursTempData.sort((ha, hb) => hb["count"] - ha["count"]).slice(0, 5);
        // Insert all the popular hours strings to the chart series array.
        temp.map(h => this.chartSeries.push(h["hour"]));
        //////////////////////
        // Second Section
        // Purpose: creating the 'day objects' for the charts data with
        // the filtering we created inside the 'chartSeries' array.
        this.chartsData = [];
        const days = [];
        // Loop for the 'day objects' creation.
        questions.forEach(q => {
          if (q.creationDate && q.creationDate !== null) {
            const date = new Date(q.creationDate);
            const day = date.toLocaleString('en-us', { weekday: 'long' });
            const hour = date.toLocaleString('en-us', { hour: "numeric" });

            this.chartsData[day] = this.chartsData[day] || {};
            // The filtering if the 'chartSeries' array contain the specipic hour value.
            if (this.chartSeries.includes(hour)) {
              // If the hour value included in series, it's mean the hour is one of the popular 
              // and we insert it to the 'day object' that is been creating.
              this.chartsData[day][hour] = this.chartsData[day][hour] || 0;
              this.chartsData[day][hour] += 1;
            } else {
              // else it's mean the hour value isn't included in series and isn't
              // one of the popular, so we add 1 to the object's 'Others' property.
              this.chartsData[day]["Others"] = this.chartsData[day]["Others"] || 0;
              this.chartsData[day]["Others"] += 1;
            }
            this.chartsData[day]["count"] = this.chartsData[day]["count"] || 0;
            this.chartsData[day]["count"] += 1;
            if (!days.includes(day)) {
              this.chartsData[day]["category"] = day;
              days.push(day);
              this.chartsData.push(this.chartsData[day]);
              this.chartsData[day]["Others"] ? this.chartSeries.push("Others") : null;
            }
          }
        });
        //////////////////////
        // Note: If the number of hours to measure is 5 or less, the 'Others' property won't be initialize.
        this.chartsData = [...this.chartsData];
        return resolve({});
      } catch (error) {
        return reject(error.message)
      }
    })
  }

  private toggleUnChecked(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createFullChartsObjects(this.afterChangeQList);
      return resolve({});
    })
  }

  onAdjustDateChange(range: Date[]) {
    if (range.length == 0 && this.qCount != this.chartQListTemp.length) {
      !this.isToggleChecked ? this.createFullChartsObjects(this.chartQListTemp) : this.toggleChecked(this.chartQListTemp);
      this.qCount = this.chartQListTemp.length;
      this.afterChangeQList = [...this.chartQListTemp];
      return;
    }
    else if (range.length === 0) {
      return;
    }
    try {
      this.afterChangeQList = [];
      this.chartQListTemp.forEach(q => {
        const dateCheck = new Date(q.creationDate);
        if (dateCheck >= startOfDay(range[0]) && dateCheck <= endOfDay(range[1])) {
          this.afterChangeQList.push(q);
        }
      });
      if (this.afterChangeQList.length < 1) {
        this.isChanged = false;
        return this.snackbarService.openSimpleTextSnackBar('No questions were created within this date range!');
      }
      !this.isToggleChecked ? this.createFullChartsObjects(this.afterChangeQList) : this.toggleChecked(this.afterChangeQList);
      this.qCount = this.afterChangeQList.length;
      this.isChanged = true;
    } catch (error) {
      this.snackbarService.openSimpleTextSnackBar(error.message);
    }
  }
}
