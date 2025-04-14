import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  document: Document = inject(DOCUMENT);
  private _themeDark: BehaviorSubject<boolean>;
  public isThemeDark: Observable<boolean>;

  constructor() {
    this._themeDark = new BehaviorSubject(
      localStorage.getItem('dark') == 'true'
    );
    this.isThemeDark = this._themeDark.asObservable();
    this.setDarkTheme(this._themeDark.value);
  }

  public toggleDarkTheme(): void {
    this.setDarkTheme(!this._themeDark.value);
  }

  setDarkTheme(isThemeDark: boolean) {
    this._themeDark.next(isThemeDark);

    this.document.body.classList.toggle('dark');

    if (isThemeDark == true) {
      console.log('Dark Used');
      document.body.className = 'dark';
      localStorage.setItem('dark', 'true');
    } else {
      console.log('Light Used');
      document.body.className = 'light';
      localStorage.setItem('dark', 'false');
    }
  }
}
