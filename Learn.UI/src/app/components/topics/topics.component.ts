import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { TopicsService } from 'src/app/services/topics.service';
import { TopicFormComponent } from '../topic-form/topic-form.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // ... more data
];


@Component({
  selector: 'topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  topics: any[] = [];
  animal: string;
  name: string;

  displayedColumns: string[] = ['title', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private topicsService: TopicsService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTopics();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTopics(): void {
    this.topicsService.getTopics().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.dataSource = data;
    });
  }

  onEdit(id: string): void {
    console.log(id);
  }

  onDelete(id: string): void {
    console.log(id);
  }

  createTopic(): void {
    const dialogRef = this.dialog.open(TopicFormComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTopics();
      }
    });
  }
}
