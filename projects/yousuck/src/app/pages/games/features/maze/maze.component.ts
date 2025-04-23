import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Cell, Maze, keyboardMap } from './models';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-maze',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Toolbar,
    ButtonModule,
    SliderModule,
    InputTextModule,
  ],
  styleUrls: ['./maze.component.scss'],
  template: ` <p-toolbar>
      <div
        class="flex flex-col md:flex-row w-full md:w-full justify-between gap-10"
      >
        <div class="w-full flex flex-col items-stretch  justify-between gap-2">
          <div class="maze-form">
            <label for="nRow">Filas</label>
            <input
              pInputText
              id="nRow"
              type="number"
              [(ngModel)]="row"
              min="1"
              max="50"
            />
          </div>
          <p-slider [(ngModel)]="row" [min]="1" [max]="50" />
        </div>

        <div class="w-full flex flex-col items-stretch justify-between gap-2">
          <div class="maze-form">
            <label for="nCol">Columnas</label>
            <input
              pInputText
              id="nCol"
              type="number"
              [(ngModel)]="col"
              min="1"
              max="50"
            />
          </div>
          <p-slider [(ngModel)]="col" [min]="1" [max]="50" />
        </div>

        <div class="flex flex-row justify-evenly gap-10">
          <p-button
            raised
            severity="success"
            (click)="drawMaze()"
            [disabled]="busy"
          >
            Nuevo
          </p-button>
          <p-button outlined severity="warn" (click)="drawSolution()"
            >Solución</p-button
          >
          <p-button
            severity="info"
            (click)="test()"
            *ngIf="showTestButton"
            [disabled]="busy"
          >
            Test
          </p-button>
        </div>
      </div>
    </p-toolbar>

    <div class="flex flex-col md:flex-row items-center justify-center">
      <section class="card">
        <canvas id="maze"></canvas>
      </section>
      <section class="p-4">
        <div class="arrows flex flex-col items-center gap-1">
          <div>
            <p-button
              severity="info"
              rounded
              icon="pi pi-arrow-up"
              (click)="move('Up')"
              title="move up"
            ></p-button>
          </div>
          <div>
            <p-button
              severity="info"
              rounded
              icon="pi pi-arrow-left"
              (click)="move('Left')"
              title="move left"
            ></p-button>
            <p-button
              severity="info"
              rounded
              icon="pi pi-backward"
              (click)="undo()"
              title="undo 5 steps"
            ></p-button>
            <p-button
              severity="info"
              rounded
              icon="pi pi-arrow-right"
              (click)="move('Right')"
              title="move right"
            ></p-button>
          </div>
          <div>
            <p-button
              severity="info"
              rounded
              class="text-5xl"
              icon="pi pi-arrow-down"
              (click)="move('Down')"
              title="move down"
            ></p-button>
          </div>
        </div>
      </section>
    </div>`,
})
export class MazeComponent implements AfterViewInit {
  row = 15;
  col = 25;
  private maze!: Maze;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private readonly cellSize = 16; // length of cell edge
  private readonly cellEdgeThickness = 2; // thickness of cell edge
  private readonly cellBackground = 'transparent'; //'var(--surface-card)'; // background color of cell
  private readonly solutionPathColor = 'pink';
  private readonly myPathColor = '#4080FF';
  private readonly myStrokeColor = 'green';
  private readonly myPathThickness = 8;
  private readonly solutionPathThickness = 5;
  private gameOver = false;
  private myPath: Cell[] = [];
  private currentCell!: Cell;
  showTestButton = false;
  busy = false;

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d')!;
    this.drawMaze();
  }

  drawMaze() {
    this.busy = true;
    this.validateInputs();

    this.maze = new Maze(this.row, this.col);
    this.canvas.width = this.col * this.cellSize;
    this.canvas.height = this.row * this.cellSize;

    // open the first and last cells to show the entrance and exit
    this.maze.firstCell.westEdge = false;
    this.maze.lastCell.eastEdge = false;

    // draw the cells
    this.ctx.lineWidth = this.cellEdgeThickness;
    this.ctx.fillStyle = this.cellBackground;
    this.maze.cells.forEach((x) => x.forEach((c) => this.draw(c)));

    this.initPlay();
    this.busy = false;
  }

  initPlay() {
    this.gameOver = false;
    this.myPath.length = 0;
    this.currentCell = this.maze.firstCell; // reset myPath position
    this.myPath.push(this.currentCell);

    // draw the initial step of myPath in the first Cell as entrance
    this.ctx.lineWidth = this.myPathThickness;
    this.ctx.strokeStyle = this.myPathColor;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.cellSize / 2);
    this.ctx.lineTo(this.cellSize / 2, this.cellSize / 2);
    this.ctx.stroke();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.gameOver) return;
    const direction = keyboardMap(event.key);
    if (direction) {
      this.move(direction);
      event.preventDefault();
    }
  }

  move(direction: 'Left' | 'Right' | 'Up' | 'Down') {
    let nextCell = this.currentCell;
    if (direction === 'Left') {
      if (this.currentCell.col < 1) return;
      nextCell =
        this.maze.cells[this.currentCell.row][this.currentCell.col - 1];
    }
    if (direction === 'Right') {
      if (this.currentCell.col + 1 >= this.col) return;
      nextCell =
        this.maze.cells[this.currentCell.row][this.currentCell.col + 1];
    }
    if (direction === 'Up') {
      if (this.currentCell.row < 1) return;
      nextCell =
        this.maze.cells[this.currentCell.row - 1][this.currentCell.col];
    }
    if (direction === 'Down') {
      if (this.currentCell.row + 1 >= this.row) return;
      nextCell =
        this.maze.cells[this.currentCell.row + 1][this.currentCell.col];
    }
    if (this.currentCell.isConnectedTo(nextCell)) {
      if (
        this.myPath.length > 1 &&
        this.myPath[this.myPath.length - 2].equals(nextCell)
      ) {
        // this is a step back; reverse the step by erasing the original path
        this.drawPath(this.myPath, this.cellBackground);
        this.myPath.pop();
      } else {
        this.myPath.push(nextCell);
        if (nextCell.equals(this.maze.lastCell)) {
          this.hooray();
          this.drawSolution(this.myPathColor, this.myPathThickness);
          return;
        }
      }

      this.drawPath(this.myPath);
      this.currentCell = nextCell;
    }
  }

  undo(nSteps = 5) {
    if (!this.gameOver && this.myPath.length > nSteps) {
      this.drawPath(this.myPath, this.cellBackground);
      this.myPath.splice(-nSteps);
      this.drawPath(this.myPath);
      this.currentCell = this.myPath[this.myPath.length - 1];
    }
  }

  drawSolution(
    color = this.solutionPathColor,
    lineThickness = this.solutionPathThickness,
  ) {
    this.gameOver = true;
    this.drawPath(this.maze.findPath(), color, lineThickness, true);
  }

  private drawPath(
    path: Cell[],
    color = this.myPathColor,
    lineThickness = this.myPathThickness,
    drawSolution = false,
  ) {
    this.ctx.lineWidth = lineThickness;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.cellSize / 2);

    path.forEach((x) =>
      this.ctx.lineTo(
        (x.col + 0.5) * this.cellSize,
        (x.row + 0.5) * this.cellSize,
      ),
    );
    if (drawSolution) {
      this.ctx.lineTo(
        this.col * this.cellSize,
        (this.row - 0.5) * this.cellSize,
      );
    }
    this.ctx.stroke();
  }

  private draw(cell: Cell) {
    this.ctx.strokeStyle = this.myStrokeColor;
    this.ctx.fillRect(
      cell.col * this.cellSize,
      cell.row * this.cellSize,
      (cell.col + 1) * this.cellSize,
      (cell.row + 1) * this.cellSize,
    );
    if (cell.northEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo(cell.col * this.cellSize, cell.row * this.cellSize);
      this.ctx.lineTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
      this.ctx.stroke();
    }
    if (cell.eastEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
      this.ctx.lineTo(
        (cell.col + 1) * this.cellSize,
        (cell.row + 1) * this.cellSize,
      );
      this.ctx.stroke();
    }
    if (cell.southEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        (cell.col + 1) * this.cellSize,
        (cell.row + 1) * this.cellSize,
      );
      this.ctx.lineTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
      this.ctx.stroke();
    }
    if (cell.westEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
      this.ctx.lineTo(cell.col * this.cellSize, cell.row * this.cellSize);
      this.ctx.stroke();
    }
  }

  private hooray() {
    var audio = new Audio('assets/KidsCheering.mp3');
    audio.play();
  }

  private validateInputs() {
    if (isNaN(this.row) || this.row < 1) {
      alert('Please enter a positive number for #Rows.');
      this.row = 15;
    }
    if (isNaN(this.col) || this.col < 1) {
      alert('Please enter a positive number for #Columns.');
      this.col = 15;
    }
    if (this.row > 500 || this.col > 500) {
      alert('Size too large. You may crash the browser...');
      this.row = 15;
      this.col = 15;
    }
    this.row = ~~this.row;
    this.col = ~~this.col;
  }

  test() {
    this.busy = true;
    const cellsHaveFourEdges: Cell[] = [];
    let hasLoop = false;
    const size = 50;
    for (let i = 0; i < 100; i++) {
      const maze = new Maze(size, size);
      maze.cells.forEach((row) =>
        row.forEach((c) => {
          if (c.nEdges === 4) {
            cellsHaveFourEdges.push(c);
          }
          if (c.col < size - 1 && c.row < size - 1) {
            if (!c.eastEdge && !c.southEdge) {
              const cellOnTheRight = maze.cells[c.row][c.col + 1];
              if (!cellOnTheRight.southEdge) {
                const cellBelow = maze.cells[c.row + 1][c.col];
                if (!cellBelow.eastEdge) {
                  hasLoop = true;
                }
              }
            }
          }
        }),
      );
      if (cellsHaveFourEdges.length) {
        alert('dead loop');
        break;
      }
      if (hasLoop) {
        alert('open loop');
        break;
      }
    }

    console.log(`testing has finished`);
    this.busy = false;
  }
}
