import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `<div class="layout-footer">
    U&nbsp;suck by
    <a
      href="https://github.com/jcmelchorp"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >Pete Sahatt</a
    >
  </div>`,
})
export class AppFooter {}
