import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  description?: string;
  topicId?: string;
}

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent extends BaseComponent implements OnInit, OnDestroy {
  topics: ITopic[] = [];
  questions: IQuestion[] = [];

  questionForm = new FormGroup({
    question: new FormControl({ value: '', disabled: true }, [Validators.required]),
    topic: new FormControl({ value: '', disabled: true }, [Validators.required])
  });

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
    this.checkMode();
    this.subscribeToTopic();
  }

  checkMode(): void {
    if (this.data.isEdit) {
      this.questionForm.get('question').setValue(this.data.description);
      this.questionForm.get('topic').setValue(this.data.topicId);
    } else {
      this.questionForm.get('question').setValue('');
      this.questionForm.get('topic').setValue('');
    }
  }

  subscribeToTopic(): void {
    this.questionForm.get('topic').valueChanges.pipe().pipe(takeUntil(this.stop$)).subscribe(data => {
      if (data) {
        this.questionForm.get('question').enable();
      } else {
        this.questionForm.get('question').disable();
      }
    });
  }

  getTopics(): void {
    this.topicsService.getTopics().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.topics = data;
      this.questionForm.get('topic').enable();
    });
  }

  onSubmit(): void {
    let question: IQuestion;

    if (this.data.isEdit) {
      question = {
        topicId: this.questionForm.get('topic').value,
        id: this.data.id,
        description: this.questionForm.get('question').value
      }

      this.questionsService.updateQuestion(question).subscribe(() => {
        this.dialogRef.close(true);
      });

      return;
    }

    question = {
      topicId: this.questionForm.get('topic').value,
      description: this.questionForm.get('question').value
    }

    this.questionsService.createQuestion(question).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
