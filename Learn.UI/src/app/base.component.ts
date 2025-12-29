import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
  protected stop$: Subject<boolean>;

  constructor() {
    this.stop$ = new Subject<boolean>();
    let f = this.ngOnDestroy;

    this.ngOnDestroy = () => {
      f.bind(this)();
      this.stop$.next(true);
      this.stop$.complete();
    };
  }

  // Placeholder of ngOnDestroy. No need to do super() call of extended class.
  ngOnDestroy() { }
}
