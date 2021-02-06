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

  chartQListTemp: QuestionModel[];
  qCount: number;//amount of question measured in charts
  isChanged: boolean;//bool for checking if the chart values has changed in the previous date-range adjust 
  chartsData: any[];
  chartSeries: string[];
  ranges = { Today: [new Date(), new Date()], 'This Week': [startOfWeek(new Date), new Date()], 'This Month': [startOfMonth(new Date), new Date()] };

  //TODO Create toggle logic 'others' in chart
  constructor(private questionsState: QuestionsStateService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getChartsData();
  }

  getChartsData() {
    return this.questionsState.retrieveMappedQuestionListState().subscribe(
      res => {
        this.chartQListTemp = res;
        this.qCount = res.length;
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

  onAdjustDateChange(range: Date[]) {
    if (range.length == 0 && this.qCount != this.chartQListTemp.length) {
      this.createFullChartsObjects(this.chartQListTemp);
      this.qCount = this.chartQListTemp.length;
      return;
    }
    else if (range.length === 0) {
      return;
    }
    try {
      const qTempList = [];
      this.chartQListTemp.forEach(q => {
        const dateCheck = new Date(q.creationDate);
        if (dateCheck >= startOfDay(range[0]) && dateCheck <= endOfDay(range[1])) {
          qTempList.push(q);
        }
      });
      if (qTempList.length < 1) {
        this.isChanged = false;
        return this.snackbarService.openSimpleTextSnackBar('No questions were created within this date range!');
      }
      this.createFullChartsObjects(qTempList);
      this.qCount = qTempList.length;
      this.isChanged = true;
    } catch (error) {
      this.snackbarService.openSimpleTextSnackBar(error);
    }
  }
}
