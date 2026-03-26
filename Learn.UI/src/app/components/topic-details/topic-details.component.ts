import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { TopicsService } from 'src/app/services/topics.service';
import { TopicFormComponent } from '../topic-form/topic-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ITopic } from 'src/app/models/topic.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
  selector: 'topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  topicId: string = '';
  topicTitle: string = '';
  displayedColumns: string[] = ['title', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private topicsService: TopicsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTopic();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTopic(): void {
    this.topicId = this.route.snapshot.paramMap.get('id');

    this.topicsService.getTopic(this.topicId).pipe(takeUntil(this.stop$)).subscribe((topic: ITopic) => {
      this.topicTitle = topic.title;

      this.getQuestionsByTopicId();
    });
  }

  getQuestionsByTopicId(): void {
    this.questionsService.getQuestionsByTopicId(this.topicId).pipe(takeUntil(this.stop$)).subscribe(data => {
      this.dataSource = data;
    });
  }

  onEdit(id: string, description: string, topicId: string): void {
    const dialogRef = this.dialog.open(QuestionFormComponent, {
      width: '350px',
      data: {
        isEdit: true,
        id: id,
        description: description,
        topicId: topicId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getQuestionsByTopicId();

        Swal({
          text: `Question has been updated.`,
          type: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onDelete(id: string, description: string): void {
    Swal({
      text: `Are you sure you want to delete "${description}" question?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      type: 'warning',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'swal-confirm-button',
      cancelButtonClass: 'swal-cancel-button',
      cancelButtonColor: '#E2483D',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.deleteQuestion(id);
      }
    })
  }

  deleteQuestion(id: string): void {
    this.questionsService.deleteQuestion(id).subscribe(() => {
      this.getQuestionsByTopicId();

      Swal({
        text: `Question has been deleted.`,
        type: 'success',
        confirmButtonText: 'OK'
      });
    });
  }
}
