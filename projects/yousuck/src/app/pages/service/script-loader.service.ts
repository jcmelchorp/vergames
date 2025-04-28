import { Inject, Injectable } from '@angular/core';

// Declare ScriptLoader as a global variable so that it can be used in this TypeScript file
declare global {
  interface Window {
    ScriptLoader: {scriptLoaderLoaded: Promise<void>};
  }
}


export class ScriptLoaderService {
  
  // A variable to check if ScriptLoader was successfully loaded
   scriptLoaderLoaded: Promise<void>;
  


  constructor(@Inject('CDN_JAVASCRIPT_URL') scriptUrl: string) {
    // TODO isn't this a kind of duplicate for later code?
    this.scriptLoaderLoaded = this.loadScriptLoader(scriptUrl)
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

  private async loadScriptLoader(source:string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('loading ScriptLoader');
      
      const script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.src = source;
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
    window.ScriptLoader.scriptLoaderLoaded.then(() => {

      console.log('Typesetting success');

    });
  }
}