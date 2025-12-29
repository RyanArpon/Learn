import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent extends BaseComponent implements OnInit, OnDestroy {
  questions: any[] = [];

  constructor(
    private questionsService: QuestionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.questionsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.questions = data;
    });
  }
}
