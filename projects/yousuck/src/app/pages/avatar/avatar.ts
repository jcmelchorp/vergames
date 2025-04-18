import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NiceAvatarComponent } from './nice-avatar.component';
import { CommonModule } from '@angular/common';
import {
  Beard,
  Ear,
  Earring,
  Eyebrows,
  Eyes,
  Glasses,
  Hair,
  Mouth,
  Nose,
  Shirt,
} from './avatar.types';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ColorPicker } from 'primeng/colorpicker';
import { Slider } from 'primeng/slider';
import { RadioButton } from 'primeng/radiobutton';
@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule,
    NiceAvatarComponent,
    ButtonModule,
    FormsModule,
    ColorPicker,
    Slider,
    RadioButton,
  ],
  template: `
    <!-- <div class="screen"> -->
    <div class="flex flex-row flex-wrap gap-2">
      <div class="card">
        <h5>Tamaño <p-slider [(ngModel)]="size" [min]="50" [max]="250" /></h5>
        <div style="min-height: 250px;min-width: 250px">
          <nice-avatar
            class="avatar"
            #avatar
            [size]="size"
            [bgColor]="bgColor"
            [shirtColor]="shirtColor"
            [faceColor]="faceColor"
            [hairColor]="hairColor"
            [beardColor]="beardColor"
            [beardType]="beard"
            [ear]="ear"
            [earring]="earring"
            [eye]="eye"
            [eyeBrows]="eyeBrow"
            [shirt]="shirt"
            [glasses]="glasses"
            [nose]="nose"
            [hair]="hair"
            [hairColor]="hairColor"
            [mouth]="mouth"
          >
          </nice-avatar>
        </div>
        <div class="flex flex-row justify-evenly">
          <p-button
            icon="pi pi-sync"
            label="Nuevo"
            rounded
            outlined
            (click)="random()"
          ></p-button>
          <h5>Fondo <p-colorpicker name="bgColor" [(ngModel)]="bgColor" /></h5>
          <p-button
            icon="pi pi-download"
            label=" Descargar"
            rounded
            outlined
            (click)="getPng()"
          ></p-button>
        </div>
      </div>

      <div class="card">
        <h5>Cara <p-colorpicker name="face" [(ngModel)]="faceColor" /></h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of FaceColors" class="field-checkbox">
            <p-radiobutton
              [inputId]="value"
              name="face"
              [value]="value"
              [(ngModel)]="faceColor"
            />
            <label [for]="value" class="ml-2">{{ value }}</label>
          </div>
        </div>
        <h5>Cejas y pestañas</h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of eyeBrowsValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="eyeBrow"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
        <h5>Orejas</h5>
        <div class="flex flex-col gap-1">
          <div *ngFor="let value of earValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="ear"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
      </div>

      <div class="card">
        <h5>
          Cabello <p-colorpicker name="hairColor" [(ngModel)]="hairColor" />
        </h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of hairValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="hair"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
      </div>

      <div class="card">
        <h5>Boca</h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of mouthValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="mouth"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
        <h5>Ojos</h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of eyesValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="eye"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
      </div>

      <div class="card">
        <h5>Nariz</h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of noseValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="nose"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
        <h5>Aretes</h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of earringValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="earring"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>

        <h5>Lentes</h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of glassesValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="glasses"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
      </div>

      <div class="card">
        <h5>
          Camisa <p-colorpicker name="shirtColor" [(ngModel)]="shirtColor" />
        </h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of shirtValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="shirt"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
        <h5>
          Barba <p-colorpicker name="beardColor" [(ngModel)]="beardColor" />
        </h5>
        <div class="flex flex-col gap-2">
          <div *ngFor="let value of beardValues" class="field-checkbox">
            <p-radiobutton
              [inputId]="value.key"
              [name]="value.name"
              [value]="value"
              [(ngModel)]="beard"
            />
            <label [for]="value.key" class="ml-2">{{ value.name }}</label>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <canvas
      #canvas
      [height]="size"
      [width]="size"
      [ngStyle]="{ display: 'none' }"
    ></canvas>
    <!-- </div> -->
  `,
})
export class AvatarComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('avatar')
  avatar!: NiceAvatarComponent;

  size: number = 250;
  bgColor!: string;
  shirtColor!: string;
  faceColor!: string;
  FaceColors: string[] = ['#F9C9B6', '#AC6651'];
  beardValues: Beard[] = [
    { key: 'Hipster', name: 'Hipster' },
    { key: 'Scruff', name: 'Scruff' },
    { key: 'None', name: 'None' },
  ];
  beard!: Beard;
  beardColor!: string;
  eyesValues: Eyes[] = [
    { key: 'Circle', name: 'Circle' },
    { key: 'Oval', name: 'Oval' },
    { key: 'Shadow', name: 'Shadow' },
    { key: 'Smile', name: 'Smile' },
  ];
  eye!: Eyes;
  eyeBrow!: Eyebrows;
  eyeBrowsValues: Eyebrows[] = [
    { key: 'None', name: 'Ninguno' },
    { key: 'Eyebrows_Down', name: 'Cejas abajo' },
    { key: 'Eyebrows_Up', name: 'Cejas arriba' },
    { key: 'Eyelashes_Down', name: 'Pestañas abajo' },
    { key: 'Eyelashes_Up', name: 'Pestañas arriba' },
  ];
  earValues: Ear[] = [
    { key: 'Big', name: 'Grande' },
    { key: 'Small', name: 'Chico' },
  ];
  ear!: Ear;
  earringValues: Earring[] = [
    { key: 'Hoop', name: 'Hoop' },
    { key: 'Stud', name: 'Stud' },
    { key: 'None', name: 'None' },
  ];
  earring!: Earring;
  mouth!: Mouth;
  mouthValues: Mouth[] = [
    { key: 'Frown', name: 'Frown' },
    { key: 'Laughing', name: 'Laughing' },
    { key: 'Nervous', name: 'Nervous' },
    { key: 'Pucker', name: 'Pucker' },
    { key: 'Sad', name: 'Sad' },
    { key: 'Smile', name: 'Smile' },
    { key: 'Smirk', name: 'Smirk' },
    { key: 'Suprised', name: 'Suprised' },
  ];
  hair!: Hair;
  hairValues: Hair[] = [
    { key: 'Danny_Phantom', name: 'Danny_Phantom' },
    { key: 'Doug_Funny', name: 'Doug_Funny' },
    { key: 'Fonza', name: 'Fonza' },
    { key: 'Full', name: 'Full' },
    { key: 'Mr_Clean', name: 'Mr_Clean' },
    { key: 'Mr_T', name: 'Mr_T' },
    { key: 'None', name: 'None' },
    { key: 'Pixie', name: 'Pixie' },
    { key: 'Turban', name: 'Turban' },
  ];
  hairColor!: string;
  nose!: Nose;
  noseValues: Nose[] = [
    { key: 'Curve', name: 'Curve' },
    { key: 'Pointed', name: 'Pointed' },
    { key: 'Round', name: 'Round' },
  ];
  glasses!: Glasses;
  glassesValues: Glasses[] = [
    { key: 'None', name: 'None' },
    { key: 'Round', name: 'Round' },
    { key: 'Square', name: 'Square' },
  ];
  shirt!: Shirt;
  shirtValues: Shirt[] = [
    { key: 'Collared', name: 'Collared' },
    { key: 'Crew', name: 'Crew' },
    { key: 'Open', name: 'Open' },
  ];

  BEARD_COLORS = ['#BB9E95', '#65473E'];
  HAIR_COLORS = ['#77311D', '#FC909F', '#D2EFF3', '#506AF4', '#F48150'];
  BG_COLORS = [
    '#9287FF',
    '#6BD9E9',
    '#FC909F',
    '#F4D150',
    '#E0DDFF',
    '#D2EFF3',
    '#FFEDEF',
    '#FFEBA4',
    '#506AF4',
    '#F48150',
    '#74D153',
  ];
  SHIRT_COLORS = ['#9287FF', '#6BD9E9', '#FC909F', '#F4D150', '#77311D'];
  FACE_COLORS = ['#F9C9B6', '#AC6651'];

  random() {
    this.bgColor = this.getRandom(this.BG_COLORS);
    this.faceColor = this.getRandom(this.FACE_COLORS);
    this.beard = this.getRandom(this.beardValues);
    this.beardColor = this.getRandom(this.BEARD_COLORS);
    this.eye = this.getRandom(this.eyesValues);
    this.eyeBrow = this.getRandom(this.eyeBrowsValues);
    this.ear = this.getRandom(this.earValues);
    this.earring = this.getRandom(this.earringValues);
    this.mouth = this.getRandom(this.mouthValues);
    this.hair = this.getRandom(this.hairValues);
    this.hairColor = this.getRandom(this.HAIR_COLORS);
    this.nose = this.getRandom(this.noseValues);
    this.glasses = this.getRandom(this.glassesValues);
    this.shirt = this.getRandom(this.shirtValues);
    this.shirtColor = this.getRandom(this.SHIRT_COLORS);
  }

  getRandom(list: any[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  getPng() {
    let data = new XMLSerializer().serializeToString(this.avatar.element);
    let DOMURL = window.URL || window.webkitURL || window;

    let img = new Image();
    let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    let url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
      this.context.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      var imgURI = this.canvas.nativeElement
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      this.triggerDownload(imgURI);
    };
    img.src = url;
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height,
    );
  }

  ngOnInit(): void {
    this.random();
  }

  triggerDownload(imgURI: string) {
    var evt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true,
    });

    var a = document.createElement('a');
    a.setAttribute('download', 'avatar.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
  }

  context!: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext(
      '2d',
      CanvasRenderingContext2D,
    ) as CanvasRenderingContext2D;
  }
}
