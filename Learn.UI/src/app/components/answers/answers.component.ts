import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { AnswersService } from 'src/app/services/answers.service';

@Component({
  selector: 'answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent extends BaseComponent implements OnInit, OnDestroy {
  answers: any[] = [];

  constructor(
    private questionsService: AnswersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.questionsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.answers = data;
    });
  }
}
