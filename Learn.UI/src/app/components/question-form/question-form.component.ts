import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseComponent } from 'src/app/base.component';
import { IQuestion } from 'src/app/models/question.model';
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
  question = new FormControl('');
  topicId = new FormControl('');

  constructor(
    private questionsService: QuestionsService,
    public dialogRef: MatDialogRef<QuestionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.question.setValue(this.data.title);
    } else {
      this.question.setValue('');
    }
  }

  onSubmit(): void {
    let question: IQuestion;

    if (this.data.isEdit) {
      question = {
        id: this.data.id,
        description: this.question.value
      }

      this.questionsService.updateQuestion(question).subscribe(() => {
        this.dialogRef.close(true);
      });

      return;
    }

    question = {
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
