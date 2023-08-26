import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Question } from '@models/question.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnswerService } from '@shared/services/answer.service';
import { StateService } from '@shared/services/state.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShareDialogComponent } from '@dialogs/share-dialog/share-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions
} from '@angular/cdk/overlay';
import { AuthService } from '@auth/auth.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT, NgIf, NgOptimizedImage } from '@angular/common';
import { SocketService } from '@shared/services/socket.service';
import { VoteService } from '@shared/services/vote.service';
import { FavoriteService } from 'src/app/favorites/favorite.service';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { AnswerFormComponent } from './components/answer-form/answer-form.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { QuestionTextComponent } from './components/question-text/question-text.component';
import { EditorButtonsComponent } from './components/answer-form/editor-buttons/editor-buttons.component';
import { MatCardModule } from '@angular/material/card';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ImgShadowComponent } from '@shared/components/img-shadow/img-shadow.component';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '@components/icon/icon.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AnswerListComponent,
    AnswerFormComponent,
    CommentListComponent,
    QuestionTextComponent,
    EditorButtonsComponent,
    ImgShadowComponent,
    RelativeTimeFormatPipe,
    MatCardModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,

    NgOptimizedImage,
    MatIconModule,
    IconComponent,
    RouterLink,
    MatTooltipModule
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() question!: Question;

  popupOpened = false;

  overlayRef!: OverlayRef;

  @ViewChild('trigger', { read: ElementRef }) trigger!: ElementRef;
  @ViewChild('loginPopup') loginPopup!: TemplateRef<any>;

  subA!: Subscription;

  private document = inject(DOCUMENT);
  private answerService = inject(AnswerService);
  private dialog = inject(MatDialog);
  private sso = inject(ScrollStrategyOptions);
  private overlay = inject(Overlay);
  private vcr = inject(ViewContainerRef);

  private stateService = inject(StateService);
  private favoriteService = inject(FavoriteService);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private socketService = inject(SocketService);
  private voteService = inject(VoteService);

  initializeSchema() {
    this.document.body.setAttribute('itemscope', '');
    this.document.body.setAttribute('itemtype', 'https://schema.org/QAPage');
  }

  destroySchema() {
    this.document.body.removeAttribute('itemscope');
    this.document.body.removeAttribute('itemtype');
  }

  ngOnInit(): void {
    this.initializeSchema();

    this.subA = this.socketService
      .watch('watch', `q:${this.question.id}`)
      .subscribe((messageForA) => {
        console.log(messageForA);
        this.snackBar.open('1 yeni cevap gönderildi', 'TAMAM');
      });

    // this.stateService.hide();
  }

  ngOnDestroy() {
    this.destroySchema();
    if (this.subA) {
      this.subA.unsubscribe();
    }
  }

  /**
   * Soruyu kullanicinin favorilerine ekler.
   * @param questionId
   */
  addToFavoriteToQuestion(questionId: number): void {
    this.snackBar.open(
      'Bu soruyu bir favori listesine eklemek için oturum açın',
      'TAMAM'
    );
    /*   this.favoriteService.addToFavorite(questionId).subscribe((value) => {
      console.log(value);
    });*/
  }

  async openShareDialog() {
    const { ShareDialogComponent } = await import(
      '@dialogs/share-dialog/share-dialog.component'
    );
    this.dialog
      .open(ShareDialogComponent, {
        minWidth: 360,
        maxWidth: 560,
        scrollStrategy: this.sso.close(),
        autoFocus: false
      })
      .afterClosed()
      .subscribe((result) => {
        result && this.snackBar.open('Bağlantı panoya kopyalandı');
      });
  }

  createPopup() {
    if (!this.overlayRef?.hasAttached()) {
      this.overlayRef = this.overlay.create({
        scrollStrategy: this.sso.block(),
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.trigger)
          .withPositions([
            {
              originX: 'start',
              originY: 'bottom',
              overlayX: 'start',
              overlayY: 'top'
            }
          ])
      });
      const userProfilePortal = new TemplatePortal(this.loginPopup, this.vcr);
      this.overlayRef.attach(userProfilePortal);
      this.overlayRef.outsidePointerEvents().subscribe((value) => {
        this.overlayRef.dispose();
      });
    }
  }

  /**
   * Like question event
   */
  likeQuestion() {}

  /**
   * Open login dialog
   */
  openLogInPopup() {
    // this.createPopup();
  }

  async openFlagDialog() {
    const { FlagDialogComponent } = await import(
      '@dialogs/flag-dialog/flag-dialog.component'
    );
    this.dialog.open(FlagDialogComponent, {
      autoFocus: false,
      minWidth: 560
    });
  }

  voteQuestion() {
    this.voteService.upvoteQuestion(this.question.id).subscribe((value) => {
      console.log(value);
    });
  }
}
