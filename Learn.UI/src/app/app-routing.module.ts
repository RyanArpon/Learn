import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTypeComponent } from './components/search-type/search-type.component';
import { TopicsComponent } from './components/topics/topics.component';

const routes: Routes = [
  { path: 'topics', component: TopicsComponent },
  { path: 'search-type', component: SearchTypeComponent },
  { path: '', redirectTo: '/topics', pathMatch: 'full' }, // Default route
  { path: '**', component: TopicsComponent } // Wildcard route for unmatched URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
