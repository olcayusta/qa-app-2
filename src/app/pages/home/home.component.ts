import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '@shared/services/state.service';
import { SocketService } from '@shared/services/socket.service';
import { Subscription } from 'rxjs';
import { CloseScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { BannerComponent } from './banner/banner.component';
import { FilterComponent } from './filter/filter.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { FilterByComponent } from './filter-by/filter-by.component';
import { HomeGridListComponent } from './home-grid-list/home-grid-list.component';
import { IsVisibleDirective } from './directives/is-visible.directive';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    FilterComponent,
    SortByComponent,
    FilterByComponent,
    HomeGridListComponent,
    IsVisibleDirective,
    MatBottomSheetModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_MENU_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay]
    }
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    private socketService: SocketService,
    private stateService: StateService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.socketService.watch('watch', 'home').subscribe((value) => {
      console.log(value);
    });

    this.stateService.show();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
