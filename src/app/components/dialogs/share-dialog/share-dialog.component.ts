import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

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
