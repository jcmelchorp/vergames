import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-el-camino',
  imports: [],
  template: `
  <div class="grid  grid-cols-5  content-stretch border-2 ">
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">01</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">02</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">03</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">04</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">05</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">06</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">07</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">08</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">09</div>
  <div style="width: 100px;height:100px" class=" border-2 border-orange-700">10</div>
  <div></div>
</div>
  `,
  styleUrl: './el-camino.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElCaminoComponent { }
