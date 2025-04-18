import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
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
import { AuthService } from '../../auth/services/auth.service';
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
      <div class="card flex flex-col justify-between gap-2">
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
        <div class="flex flex-row justify-evenly gap-x-2 gap-y-2">
          <p-button
            icon="pi pi-sync"
            label="Nuevo"
            severity="warn"
            (click)="random()"
          ></p-button>
          <p-button
            icon="pi pi-user-edit"
            label="Foto de perfil"
            severity="info"
            (click)="updatePhotoURL()"
          ></p-button>
          <p-button
            icon="pi pi-download"
            label=" Descargar"
            severity="success"
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
        <h5>Fondo <p-colorpicker name="bgColor" [(ngModel)]="bgColor" /></h5>
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

  _authService: AuthService = inject(AuthService);

  size: number = 250;
  bgColor!: string;
  shirtColor!: string;
  faceColor!: string;
  FaceColors: string[] = ['#F9C9B6', '#AC6651'];
  beardValues: Beard[] = [
    { key: 'Hipster', name: 'Hipster' },
    { key: 'Scruff', name: 'Dr. House' },
    { key: 'None', name: 'Ninguna' },
  ];
  beard!: Beard;
  beardColor!: string;
  eyesValues: Eyes[] = [
    { key: 'Circle', name: 'Círculo' },
    { key: 'Oval', name: 'Ovalo' },
    { key: 'Shadow', name: 'Sombra' },
    { key: 'Smile', name: 'Sonriza' },
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
    { key: 'Hoop', name: 'Aro' },
    { key: 'Stud', name: 'Pieza' },
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
    { key: 'Danny_Phantom', name: 'Danny Phantom' },
    { key: 'Doug_Funny', name: 'Dug Narinaz' },
    { key: 'Fonza', name: 'Peña Nieto' },
    { key: 'Full', name: 'Melena' },
    { key: 'Mr_Clean', name: 'Maestro limpio' },
    { key: 'Mr_T', name: 'Mr. T' },
    { key: 'None', name: 'Ninguno' },
    { key: 'Pixie', name: 'Pixie' },
    { key: 'Turban', name: 'Talibán' },
  ];
  hairColor!: string;
  nose!: Nose;
  noseValues: Nose[] = [
    { key: 'Curve', name: 'Curva' },
    { key: 'Pointed', name: 'Punta' },
    { key: 'Round', name: 'Redonda' },
  ];
  glasses!: Glasses;
  glassesValues: Glasses[] = [
    { key: 'None', name: 'Ninguno' },
    { key: 'Round', name: 'Redondo' },
    { key: 'Square', name: 'Cuadrado' },
  ];
  shirt!: Shirt;
  shirtValues: Shirt[] = [
    { key: 'Collared', name: 'Abierto' },
    { key: 'Crew', name: 'Cerrado' },
    { key: 'Open', name: 'Sin cuello' },
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

  updatePhotoURL() {
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
      // aquí va lo bueno
      // this.triggerDownload(imgURI);
      // console.log(imgURI);
      this._authService.updatePhotoURL(imgURI);
    };
    img.src = url;
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height,
    );
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
