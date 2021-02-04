import { Injectable } from '@angular/core';
import { QuestionModel } from "src/app/core/models/question.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionsPath = environment.baseUrl + environment.questionsPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization": 
  constructor(private http: HttpClient) { }


  getAllQuestions(): Observable<QuestionModel[]> {
    return this.http.get<{ questions: QuestionModel[] }>(`${this.questionsPath}/`, { headers: this.headers })
      .pipe(catchError(this.handleError),
        map(res => res.questions));
  }

  getQuestion(questionId: string): Observable<QuestionModel> {
    return this.http.get<QuestionModel>(`${this.questionsPath}/${questionId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  addQuestion(question: QuestionModel): Observable<{ message: string, qa?: QuestionModel }> {
    return this.http.post<{ message: string, qa?: QuestionModel }>(`${this.questionsPath}/create`, JSON.stringify(question), { headers: this.headers })
      .pipe(catchError(this.handleError));

  }

  updateQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.http.put<{ newQuestion: QuestionModel }>(`${this.questionsPath}/update/${question.id}`, JSON.stringify(question), { headers: this.headers })
      .pipe(catchError(this.handleError),
        map(res => res.newQuestion));
  }

  deleteQuestion(questionId: string): Observable<{ message }> {
    return this.http.delete<{ message }>(`${this.questionsPath}/delete/${questionId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any) {
    let msg = error.error;
    return throwError(msg);
  }
}
