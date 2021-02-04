import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionModel } from 'src/app/core/models/question.model';
import { QuestionsService } from 'src/app/features/website/questions-management/Services/questions.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionsStateService {

  private sharedQues = new BehaviorSubject<QuestionModel[]>([]);
  chartsData: any[];
  chartSeries: string[];

  constructor(private questionsService: QuestionsService) {
    this.questionsService.getAllQuestions().subscribe(
      res => {
        this.mapQuestionListState(res);
      },
      err => console.log(err['message'])
    )
  }

  private mapQuestionListState(questions: QuestionModel[]) {
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
    console.log(this.chartsData);
    this.sharedQues.next(questions);
  }

  //used to share the data received from the backend
  public retrieveMappedQuestionListState(): Observable<QuestionModel[]> {
    return this.sharedQues.asObservable();
  }

  public dataForChartsState(): Observable<{data: any[], series:string[]}> {
    return this.sharedQues.asObservable().pipe(
      map(_ => ({data: this.chartsData,series: this.chartSeries}))
    );
  }

  addQuestion(q: QuestionModel) {
    const questions = [...this.sharedQues.value, q];
    this.mapQuestionListState(questions);
  }

  updateQuestion(q: QuestionModel) {
    const updatedQuestion = this.sharedQues.value.find(ques => ques.id === q.id)
    let index = this.sharedQues.value.indexOf(updatedQuestion);
    this.sharedQues.value[index] = q;
    const questions = [...this.sharedQues.value];
    this.mapQuestionListState(questions);
  }

  deleteQuestion(id: string) {
    const questions = this.sharedQues.value.filter(ques => ques.id !== id)
    this.mapQuestionListState(questions);
  }
}
