import { Component, ElementRef, ViewChild } from '@angular/core';
import p5 from 'p5';

interface P5Sketch extends p5 {
  setup: () => void;
  draw: () => void;
  setPixelSize?: (newValue: number) => void;
}

@Component({
  selector: 'app-falling-sand-1',
  standalone: true,
  imports: [],
  templateUrl: './falling-sand-1.component.html',
  styleUrl: './falling-sand-1.component.css'
})
export class FallingSand1Component {
  @ViewChild('sketchContainer', { static: true }) sketchContainer!: ElementRef;
  private p5!: P5Sketch; 
  private canvas: HTMLElement | null | undefined;

  pixelSize:number = 5;

  ngOnInit() {
    this.canvas = document.getElementById("canvas");
    if(this.canvas != null) {
      this.p5 = new p5(this.sketch, this.canvas);      
    }
  }

  updatePixelSize(p:number) {
    this.pixelSize = p;
    if(this.p5.setPixelSize) {
      console.log(this.pixelSize)
      this.p5.setPixelSize(this.pixelSize);
    }   
  }

  ngOnDestroy() {
    this.p5?.remove();
  }

  reload() {
    this.p5?.remove();
    if(this.canvas != null) {
      this.p5 = new p5(this.sketch, this.canvas);
    }
  }

  sketch(s:p5) { 
    const width = 600;
    const height = 600;
    let pixelSize = 5;
    const rainSize = 15;
    let grid: any[] = [];
    let rows: number;
    let cols: number;
    let color = 0;

    (s as any).setPixelSize = (nb:number) => {
      pixelSize = nb;
    };

    function stillInCols(i:number) {
      return i >= 0 && i < cols;
    }

    function stillInRows(j:number) {
      return j >= 0 && j < rows;
    }

    function isMouseIsInGrid() {
      return (s.mouseX < width && s.mouseX >= 0 && s.mouseY >= 0 && s.mouseY < height);
    }

    function make2DArray(rows:number, cols:number) {
      let arr = new Array(cols);
      for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
          arr[i][j] = 0;
        }
      }
      return arr;
    }

    s.setup = () => {
      s.createCanvas(height, width);
      cols = Math.floor(width / pixelSize);
      rows = Math.floor(height / pixelSize);
      grid = make2DArray(rows, cols);
      s.background(0);
      s.colorMode(s.HSB, 360, 255, 255);
    };
  
    s.draw = () => {
      s.noStroke();
      for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
          if(grid[i][j] > 0) {
            s.fill(grid[i][j], 255, 255);
            let x = i * pixelSize;
            let y = j * pixelSize;
            s.square(x, y, pixelSize);
          } else {
            s.fill('black');
            let x = i * pixelSize;
            let y = j * pixelSize;
            s.square(x, y, pixelSize);
          }      
        }
      }

      let nextGrid = make2DArray(rows, cols);
      for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
          if(grid[i][j] > 0) {
            let r = Math.random();
            let dir = (r > 0.5 ? 1 : -1);
            if(j < rows-1 && grid[i][j+1] === 0) {
              nextGrid[i][j] = 0;
              nextGrid[i][j+1] = grid[i][j];
            } else if(stillInCols(i + dir) && grid[i + dir][j + 1] === 0) {
              nextGrid[i][j] = 0;
              nextGrid[i + dir][j+1] = grid[i][j];
            } else if(stillInCols(i - dir) && grid[i - dir][j + 1] === 0) {
              nextGrid[i][j] = 0;
              nextGrid[i - dir][j+1] = grid[i][j];
            } else {
              nextGrid[i][j] = grid[i][j];
            }
          }
        }
      }
      grid = nextGrid;
    };

    s.mouseDragged = () => {
      let x = Math.floor(s.mouseX/pixelSize);
      let y = Math.floor(s.mouseY/pixelSize)
      if (isMouseIsInGrid()) {
        for(let i = x - Math.floor(rainSize/2); i < x + rainSize%2; i++) {
          for(let j = y - Math.floor(rainSize/2); j < y + rainSize%2; j++) {
            if(Math.random() > 0.25 && stillInCols(i) && stillInRows(j) && grid[i][j] === 0) {
              grid[i][j] = color;
            }
          }
        }
        color += 0.2;
        if(color > 360) {
          color = 0;
        }   
      }
    };
  }
}
