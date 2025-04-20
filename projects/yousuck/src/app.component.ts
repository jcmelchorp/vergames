import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './app/pages/shell/shell';
import { WebServiceWorkerService } from './app/pages/service/webservice-worker.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastModule],
  template: `<p-toast /> <router-outlet></router-outlet>`,
  providers: [WebServiceWorkerService, MessageService],
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
