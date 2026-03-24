import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionFormComponent } from '../question-form/question-form.component';
import Swal from 'sweetalert2';

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

  constructor(
    private questionsService: QuestionsService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getQuestions(): void {
    this.questionsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.dataSource = data;
    });
  }

  createQuestion(): void {
    const dialogRef = this.dialog.open(QuestionFormComponent, {
      width: '350px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getQuestions();

        Swal({
          text: `Topic has been created.`,
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
      this.getQuestions();

      Swal({
        text: `Topic has been deleted.`,
        type: 'success',
        confirmButtonText: 'OK'
      });
    });
  }
}
