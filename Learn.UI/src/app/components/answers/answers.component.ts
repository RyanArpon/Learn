import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { AnswersService } from 'src/app/services/answers.service';

@Component({
  selector: 'answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['description', 'isCorrect', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private questionsService: AnswersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAnswers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAnswers(): void {
    this.questionsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.dataSource = data;
    });
  }
}
