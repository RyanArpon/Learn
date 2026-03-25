import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITopic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  constructor(private http: HttpClient) { }

  getTopics(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}Topics`);
  }

  createTopic(topic: ITopic): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}Topics`, topic);
  }

  updateTopic(topic: ITopic): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}Topics/${topic.id}`, topic);
  }

  deleteTopic(id: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}Topics/${id}`);
  }

  getTopic(id: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}Topics/${id}`);
  }
}