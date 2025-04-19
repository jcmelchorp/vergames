import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './app/pages/shell/shell';
import { WebServiceWorkerService } from './app/pages/service/webservice-worker.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ShellComponent],
  template: `<prmsc-shell></prmsc-shell> <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Yousuck - Aplicación de nada';
  constructor(private webServiceWorker: WebServiceWorkerService) {}
  ngOnInit(): void {
    this.webServiceWorker.titleInit();
    this.webServiceWorker.generateTags({
      title: this.title,
      description:
        'Aplicación de nada, pero con un propósito. Yousuck es una aplicación que te ayuda a encontrar tu propósito en la vida.',
      image: 'screenshot01.png',
    });
  }
}
