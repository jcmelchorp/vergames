import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebServiceWorkerService } from '../service/webservice-worker.service';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'prmsc-shell',
    standalone: true,
    imports: [CommonModule,MessageModule,ButtonModule],
    template: `<p-message severity="info" styleClass="message-container" *ngIf="isNewAppVersionAvailable">
    <ng-template pTemplate>
      <div class="flex align-items-center">
        <div>
          <span class="pr-2">New App Version</span>
          <small class="pr-2"
            >A new version of the app is available. Please refresh your browser window or click on the refresh button.</small
          >
        </div>
        <div>
          <div class="d-inline-block" style="position: relative">
            <p-button (click)="refreshApp()" [style]="{ height: '25px' }" styleClass="p-button-rounded">
              <span class="text-nowrap">Refresh</span>
            </p-button>
          </div>
        </div>
      </div>
    </ng-template>
</p-message>`,
  })
  export class ShellComponent implements OnInit, OnDestroy {
   
    isNewAppVersionAvailable: boolean = false;
    newAppUpdateAvailableSubscription!: Subscription;
  
  
    constructor(
      private webServiceWorker: WebServiceWorkerService,
    ) { }
  
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
  
      this.checkIfAppUpdated();
    }
  
    checkIfAppUpdated() {
      this.newAppUpdateAvailableSubscription = this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe((versionAvailableFlag: boolean) => {
        this.isNewAppVersionAvailable = versionAvailableFlag;
      });
    }
  
    refreshApp() {
      window.location.reload();
    }
  
    ngOnDestroy() {
      this.newAppUpdateAvailableSubscription?.unsubscribe();
    }
  } 