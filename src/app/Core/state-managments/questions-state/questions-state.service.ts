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

  constructor(private questionsService: QuestionsService) {
    this.questionsService.getAllQuestions().subscribe(
      res => {
        this.mapQuestionListState(res);
      },
      err => console.log(err['message'])
    )
  }

  private mapQuestionListState(questions: QuestionModel[]) {
    this.sharedQues.next(questions);
  }

  //used to share the data received from the backend
  public retrieveMappedQuestionListState(): Observable<QuestionModel[]> {
    return this.sharedQues.asObservable();
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
