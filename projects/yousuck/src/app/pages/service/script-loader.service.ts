import { Injectable } from '@angular/core';

// Declare ScriptLoader as a global variable so that it can be used in this TypeScript file
declare global {
  interface Window {
    ScriptLoader: {
      typesetPromise: () => void;
      startup: {
        promise: Promise<any>;
      };
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  
  // A variable to check if ScriptLoader was successfully loaded
  private scriptLoaderLoaded: Promise<void>;
  
  // Configure which ScriptLoader version we want
  private scriptLoader: any = {
    source: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js',
  }

  constructor() {
    // TODO isn't this a kind of duplicate for later code?
    this.scriptLoaderLoaded = this.loadScriptLoader()
      .then(() => {
        console.log('ScriptLoader loaded');
      })
      .catch((err) => {
        console.log('ScriptLoader failed to load', err);
        // Fallback strategy in case the load doesn't succeed, e.g. load from local file
      });
  }

  // This method is used by the ScriptLoaderDirective to check if ScriptLoader is loaded
  public getScriptLoaderLoadedPromise(): Promise<void> {
    return this.scriptLoaderLoaded;
  }

  private async loadScriptLoader(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('loading ScriptLoader');
      
      const script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.scriptLoader.source;
      script.async = true;

      // Once the script is loaded, resolve the promise
      script.onload = () => {
        resolve("ScriptLoader loaded")
      };

      // If there's an error, reject the promise
      script.onerror = () => {
        reject("Error loading ScriptLoader");
      }

      document.head.appendChild(script); // Append the script to start loading it
    });
  }

  render() {
    /*
    * This method is used to render the math inside an element
     */
    window.ScriptLoader.startup.promise.then(() => {

      console.log('Typesetting LaTex');

      window.ScriptLoader.typesetPromise();
    });
  }
}