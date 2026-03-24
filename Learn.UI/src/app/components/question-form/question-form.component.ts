import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { IQuestion } from 'src/app/models/question.model';
import { ITopic } from 'src/app/models/topic.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { TopicsService } from 'src/app/services/topics.service';

export interface DialogData {
  isEdit: boolean;
  id?: string;
  title?: string;
}

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent extends BaseComponent implements OnInit, OnDestroy {
  question = new FormControl('', [Validators.required]);
  topic = new FormControl('', [Validators.required]);
  topics: ITopic[] = [];

  constructor(
    private questionsService: QuestionsService,
    public dialogRef: MatDialogRef<QuestionFormComponent>,
    private topicsService: TopicsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTopics();

    if (this.data.isEdit) {
      this.question.setValue(this.data.title);
    } else {
      this.question.setValue('');
    }
  }

  getTopics(): void {
    this.topicsService.getTopics().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.topics = data;
    });
  }

  onSubmit(): void {
    let question: IQuestion;

    if (this.data.isEdit) {
      question = {
        topicId: this.topic.value,
        id: this.data.id,
        description: this.question.value
      }

      this.questionsService.updateQuestion(question).subscribe(() => {
        this.dialogRef.close(true);
      });

      return;
    }

    question = {
      topicId: this.topic.value,
      description: this.question.value
    }

    this.questionsService.createQuestion(question).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
