import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { setLogLevel, LogLevel } from '@angular/fire';
setLogLevel(LogLevel.VERBOSE);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
