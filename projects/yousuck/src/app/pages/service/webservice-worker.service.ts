import { Injectable, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subscription, filter, interval, map } from 'rxjs';
import { SnackService } from './snack.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebServiceWorkerService implements OnDestroy {
  $isAnyNewUpdateAvailable: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  serviceSubscriptions: Subscription[] = [];

  constructor(
    private swUpdate: SwUpdate,
    private snack: SnackService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initialize();
  }

  initialize() {
    if (this.swUpdate.isEnabled) {
      // If service worker is enabled
      console.log('Service worker running.');
      this.serviceSubscriptions.push(
        interval(15 * 1000).subscribe(() => this.swUpdate.checkForUpdate()),
      );
      this.serviceSubscriptions.push(
        this.swUpdate.versionUpdates.subscribe((evt) => {
          console.log(evt);
          if (evt.type === 'VERSION_READY') {
            this.$isAnyNewUpdateAvailable.next(true);
            this.snack
              .messageWithReload(
                'Se han hecho cambios desde la última visita. Actualiza la página para continuar',
                'Ok',
              )
              ?.afterDismissed()
              .subscribe(() => window.location.reload());
          }
        }),
      );
      this.serviceSubscriptions.push(
        this.swUpdate.unrecoverable.subscribe((evt) => {
          console.log(
            'App is in unrecoverable state. Reloading to avoid chunk load issue.',
          );
          //To do, may be prompt the user first. before loading the page

          //window.location.reload();
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.serviceSubscriptions?.forEach((x) => x?.unsubscribe());
  }

  titleInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        }),
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data);
        }
      });
  }

  generateTags({ title = '', description = '', image = '' }): void {
    this.titleService.setTitle(title);
    this.metaService.addTags([
      {
        name: 'keywords',
        content: 'Yousuck games, Yousuck, games, you suck, you suck games',
      },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'author', content: 'Pete Sahatt' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
      },
      { name: 'date', content: '2025-04-18', scheme: 'YYYY-MM-DD' },
      { name: 'application-name', content: title },
      { name: 'apple-mobile-web-app-status-bar', content: 'black-translucent' },
      { name: 'theme-color', content: '#1976d2' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      {
        name: 'msapplication-square70x70logo',
        content: 'assets/icons/mstile-icon-128.png',
      },
      {
        name: 'msapplication-square150x150logo',
        content: 'assets/icons/mstile-icon-270.png',
      },
      {
        name: 'msapplication-square310x310logo',
        content: 'assets/icons/mstile-icon-558.png',
      },
      {
        name: 'msapplication-wide310x150logo',
        content: 'assets/icons/mstile-icon-558-270.png',
      },
      // OpenGraph metatags
      { property: 'og:title', content: title },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: title },
      {
        property: 'og:url',
        content: 'https://yousuck.web.app',
      },
      { property: 'og:image:url', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:alt', content: 'Website view example' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:description', content: description },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:text:title', content: title },
      { property: 'twitter:image', content: image },
    ]);
  }
}
