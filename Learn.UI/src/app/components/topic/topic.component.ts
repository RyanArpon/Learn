import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent extends BaseComponent {
  constructor() {
    super();
  }
}
