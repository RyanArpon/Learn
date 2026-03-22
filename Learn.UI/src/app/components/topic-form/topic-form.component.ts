import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseComponent } from 'src/app/base.component';
import { ITopic } from 'src/app/models/topic.model';
import { TopicsService } from 'src/app/services/topics.service';

export interface DialogData {
  isEdit: boolean;
  id?: string;
  title?: string;
}

@Component({
  selector: 'topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent extends BaseComponent implements OnInit, OnDestroy {
  topic = new FormControl('');

  constructor(
    private topicsService: TopicsService,
    public dialogRef: MatDialogRef<TopicFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.topic.setValue(this.data.title);
    } else {
      this.topic.setValue('');
    }
  }

  onSubmit(): void {
    let topic: ITopic;

    if (this.data.isEdit) {
      topic = {
        id: this.data.id,
        title: this.topic.value
      }

      this.topicsService.updateTopic(topic).subscribe(() => {
        this.dialogRef.close(true);
      });

      return;
    }

    topic = {
      title: this.topic.value
    }

    this.topicsService.createTopic(topic).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
