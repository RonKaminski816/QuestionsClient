import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.css']
})
export class ChartsViewComponent implements OnInit {

  qList: QuestionModel[];
  chartsData: any[];
  chartSeries: string[];

//TODO Install ANT and make the date picker
//TODO Create the popular toggle logic with 'others'
  constructor(private questionsState: QuestionsStateService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getChartsData();
  }

  getChartsData() {
    return this.questionsState.retrieveMappedQuestionListState().subscribe(
      res => {
        this.createChartsObjects(res);
      },
      error => this.snackbarService.openSimpleTextSnackBar(`An error occurred, please refresh the page: ${error['message']}`)
    );
  }

  createChartsObjects(questions: QuestionModel[]) {
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
}
