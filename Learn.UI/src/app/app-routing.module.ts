import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './components/topics/topics.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AnswersComponent } from './components/answers/answers.component';

const routes: Routes = [
  { path: 'topics', component: TopicsComponent },
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
