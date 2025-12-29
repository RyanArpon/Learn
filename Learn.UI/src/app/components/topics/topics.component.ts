import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent extends BaseComponent implements OnInit, OnDestroy {
  topics: any[] = [];

  constructor(
    private topicsService: TopicsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.topicsService.getTopics().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.topics = data;
    });
  }
}
