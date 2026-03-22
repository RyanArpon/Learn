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
}