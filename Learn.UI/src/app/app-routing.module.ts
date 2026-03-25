import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './components/topics/topics.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AnswersComponent } from './components/answers/answers.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';

const routes: Routes = [
  {
    path: 'topic',
    component: TopicComponent,
    children: [
      { path: 'list', component: TopicsComponent },
      { path: ':id', component: TopicDetailsComponent }
    ]
  },
  { path: 'questions', component: QuestionsComponent },
  { path: 'answers', component: AnswersComponent },
  { path: '', redirectTo: '/topics', pathMatch: 'full' }, // Default route
  { path: '**', component: TopicsComponent } // Wildcard route for unmatched URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
