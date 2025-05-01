import { NgStyle } from "@angular/common";
import { Component, input, Input, output } from "@angular/core";
import { MatGridListModule, MatGridTile } from "@angular/material/grid-list";



@Component({
  selector: 'n-tile',
  imports: [MatGridListModule],
template: `
`,
host: {
 'class': 'mat-grid-tile',
'style':`background:url('+image+)`,
 '[attr.mat-grid-tile]': "''",
},
})
export class NTileComponent extends MatGridTile  {
  image= input("__IMAGE__");
  closed=output<void>();
}