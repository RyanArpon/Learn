import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}Questions`);
  }

  createQuestion(question: IQuestion): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}Questions`, question);
  }

  updateQuestion(question: IQuestion): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}Questions/${question.id}`, question);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}Questions/${id}`);
  }
}