import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionFormComponent } from '../question-form/question-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['description', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageNumber: number = 1;
  pageSize: number = 10;
  length: number = 0;

  constructor(
    private questionsService: QuestionsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.checkURLParams();
  }

  ngOnInit(): void {
    this.getQuestions(this.pageNumber, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getQuestions(pageNumber: number, pageSize: number): void {
    this.questionsService.getQuestions(pageNumber, pageSize).pipe(takeUntil(this.stop$)).subscribe(data => {
      this.dataSource = data.questions;
      this.length = data.count;
    });
  }

  createQuestion(): void {
    const dialogRef = this.dialog.open(QuestionFormComponent, {
      width: '350px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getQuestions(this.pageNumber, this.pageSize);

        Swal({
          text: `Question has been created.`,
          type: 'success',
          confirmButtonText: 'OK'
        });
      }
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
        this.getQuestions(this.pageNumber, this.pageSize);

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
      this.getQuestions(this.pageNumber, this.pageSize);

      Swal({
        text: `Question has been deleted.`,
        type: 'success',
        confirmButtonText: 'OK'
      });
    });
  }

  checkURLParams(): void {
    const hasPageNumber = this.route.snapshot.queryParamMap.has('pageNumber');
    const hasPageSize = this.route.snapshot.queryParamMap.has('pageSize');

    if (!hasPageNumber && !hasPageSize) {
      this.router.navigateByUrl(`/questions?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`);
    }
  }

  onPageChange(event: any): void {
    const pageNumber = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.router.navigateByUrl(`/questions?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    this.getQuestions(pageNumber, pageSize);
  }
}
