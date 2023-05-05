import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private sidenav!: MatSidenav;

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  toggle() {
    return this.sidenav.toggle();
  }
}
