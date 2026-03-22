import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { QuestionsService } from 'src/app/services/questions.service';

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
    private questionsService: QuestionsService
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
}
