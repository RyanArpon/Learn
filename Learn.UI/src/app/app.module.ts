import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
} from "@angular/material";
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TopicsComponent } from './components/topics/topics.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AnswersComponent } from './components/answers/answers.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    QuestionsComponent,
    AnswersComponent,
    TopicFormComponent,
    QuestionFormComponent,
    TopicComponent,
    TopicDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
  entryComponents: [
    TopicFormComponent,
    QuestionFormComponent
  ]
})
export class AppModule { }
