import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  Renderer2,
  Type,
  ChangeDetectorRef,
  ViewContainerRef,
  inject
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDrawerMode,
  MatSidenav,
  MatSidenavModule
} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, DOCUMENT, NgComponentOutlet } from '@angular/common';
import { SideSheetComponent } from './components/side-sheet/side-sheet.component';
import { NavDrawerComponent } from './components/nav-drawer/nav-drawer.component';
import { DrawerService } from './services/drawer.service';
import { SocketService } from '@shared/services/socket.service';
import { TopAppBarComponent } from './components/top-bar/top-app-bar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StickyDirective } from './components/top-bar/directives/sticky.directive';
import { ExtendedFabDirective } from './directives/extended-fab.directive';
import { MatButtonModule } from '@angular/material/button';
import { IconComponent } from '@components/icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MiniGuideRendererComponent } from '../mini-guide-renderer/mini-guide-renderer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TopAppBarComponent,
    StickyDirective,
    ExtendedFabDirective,
    MatSidenavModule,
    MatButtonModule,
    NgComponentOutlet,
    RouterOutlet,
    RouterLink,
    IconComponent,
    MatIconModule,
    MatChipsModule,
    MiniGuideRendererComponent,
    AsyncPipe
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MainComponent implements OnInit, AfterViewInit {
  mode!: MatDrawerMode;
  isSmallScreen!: boolean;

  @ViewChild('sidenav', { static: true }) navSidenav!: MatSidenav;
  @ViewChild('sheet') sidenavSheet!: MatSidenav;
  @ViewChild('navDrawerComponentRef', { read: ViewContainerRef })
  navDrawerComponentRef!: ViewContainerRef;
  NavDrawerComponent!: Type<NavDrawerComponent>;
  SideSheetComponent!: Type<SideSheetComponent>;

  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private breakpointObserver = inject(BreakpointObserver);
  private drawerService = inject(DrawerService);
  private socketService = inject(SocketService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((breakpointState) => breakpointState.matches),
      shareReplay()
    );

  ngAfterViewInit() {
    this.drawerService.setSidenav(this.navSidenav);
  }

  ngOnInit(): void {
    this.listenToAnsweredQuestions();
  }

  initializeDrawerMode() {
    this.isSmallScreen =
      this.breakpointObserver.isMatched('(max-width: 599px)');
    this.isSmallScreen ? (this.mode = 'over') : 'side';
    this.mode = 'side';
  }

  listenToAnsweredQuestions() {
    this.socketService.on('new answer').subscribe(({ event, payload }) => {
      this.snackBar.open('One line text string.', 'TAMAM', {
        duration: 4000
      });
    });
  }

  showScrollBar() {
    this.renderer.setStyle(this.document.body, 'overflow', '');
  }

  hideScrollBar() {
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
  }

  async sidenavOpenedStart() {
    await this.loadNavDrawerComponent();
    // this.hideScrollBar();
  }

  sidenavClosedStart(): void {
    // this.showScrollBar();
  }

  /**
   * Loads the nav drawer component
   */
  async loadNavDrawerComponent() {
    const { NavDrawerComponent } = await import(
      './components/nav-drawer/nav-drawer.component'
    );
    this.NavDrawerComponent = NavDrawerComponent;
    this.changeDetectorRef.markForCheck();
  }

  async loadSidenavSheetComponent() {
    const { SideSheetComponent } = await import(
      './components/side-sheet/side-sheet.component'
    );
    this.SideSheetComponent = SideSheetComponent;
    this.changeDetectorRef.markForCheck();
  }

  sheetOpenedStart(): void {
    if (this.isSmallScreen) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  sheetClosedStart(): void {
    this.document.body.style.overflow = '';
  }
}
