import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentChecked {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  sectionNameSubscription: Subscription;
  sectionName;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private utilService: UtilService,
    private cdref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.sectionNameSubscription = this.utilService.subjectSectionName.subscribe(value => {
      this.sectionName = value;
    });
  }

  ngOnDestroy(): void {
    this.sectionNameSubscription.unsubscribe();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
