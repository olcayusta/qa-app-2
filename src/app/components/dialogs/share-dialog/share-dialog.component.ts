import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-share-dialog',
  standalone: true,
  imports: [MatInputModule, MatDialogModule],
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareDialogComponent implements OnInit {
  url!: string;

  ngOnInit(): void {
    this.url = window.location.href;
  }
}
