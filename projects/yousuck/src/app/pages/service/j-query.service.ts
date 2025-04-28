import { Injectable } from "@angular/core";
import { ScriptLoaderService } from "./script-loader.service";

@Injectable({ providedIn: 'root' })
export class JQueryService extends ScriptLoaderService{
  constructor() {
    super('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js');
  }
}