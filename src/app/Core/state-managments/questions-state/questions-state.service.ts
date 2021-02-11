import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { QuestionsService } from 'src/app/core/http/questions/questions.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionsStateService {

  private sharedQues = new BehaviorSubject<IQuestionModel[]>([]);

  constructor(private questionsService: QuestionsService) {
    this.questionsService.getAllQuestions().subscribe(
      res => {
        this.mapQuestionListState(res);
      },
      err => console.log(err['message'])
    )
  }

  private mapQuestionListState(questions: IQuestionModel[]) {
    this.sharedQues.next(questions);
  }

  //used to share the data received from the backend
  public retrieveMappedQuestionListState(): Observable<IQuestionModel[]> {
    return this.sharedQues.asObservable();
  }

  addQuestion(q: IQuestionModel) {
    const questions = [...this.sharedQues.value, q];
    this.mapQuestionListState(questions);
  }

  updateQuestion(q: IQuestionModel) {
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
