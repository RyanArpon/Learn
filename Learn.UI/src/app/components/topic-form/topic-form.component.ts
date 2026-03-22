import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseComponent } from 'src/app/base.component';
import { TopicsService } from 'src/app/services/topics.service';

export interface DialogData {
  animal: string;
  name: string;
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
  }

  onSubmit(): void {
    console.log(this.topic.value);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
