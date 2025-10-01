import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-transparent-selector-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Transparent Screen Selector Form</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="selector-overlay"
             [style.left.px]="selectorLeft"
             [style.top.px]="selectorTop"
             [style.width.px]="selectorWidth"
             [style.height.px]="selectorHeight">
          <div class="selector-border"></div>
          <button class="close-button" (click)="closeSelector()">
            <mat-icon>close</mat-icon>
          </button>
          
          <!-- Resize handles -->
          <div class="resize-handle nw" (mousedown)="startResize($event, 'nw')"></div>
          <div class="resize-handle ne" (mousedown)="startResize($event, 'ne')"></div>
          <div class="resize-handle sw" (mousedown)="startResize($event, 'sw')"></div>
          <div class="resize-handle se" (mousedown)="startResize($event, 'se')"></div>
        </div>
        
        <div class="instructions">
          <p>Drag the edges to resize the selection area</p>
          <p>Click the X button to close</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .content {
      flex: 1;
      position: relative;
      background: #f0f0f0;
      overflow: hidden;
    }
    
    .selector-overlay {
      position: absolute;
      background: rgba(0, 0, 255, 0.1);
      border: 4px solid #0000FF;
      cursor: move;
    }
    
    .selector-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
    
    .close-button {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      border: none;
      background: #0000FF;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
    }
    
    .close-button:hover {
      background: #0000CC;
    }
    
    .resize-handle {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #0000FF;
    }
    
    .resize-handle.nw {
      top: -5px;
      left: -5px;
      cursor: nw-resize;
    }
    
    .resize-handle.ne {
      top: -5px;
      right: -5px;
      cursor: ne-resize;
    }
    
    .resize-handle.sw {
      bottom: -5px;
      left: -5px;
      cursor: sw-resize;
    }
    
    .resize-handle.se {
      bottom: -5px;
      right: -5px;
      cursor: se-resize;
    }
    
    .instructions {
      position: absolute;
      top: 20px;
      left: 20px;
      background: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .instructions p {
      margin: 5px 0;
      font-size: 14px;
    }
  `]
})
export class TransparentSelectorDemoComponent {
  selectorLeft = 200;
  selectorTop = 150;
  selectorWidth = 400;
  selectorHeight = 100;
  
  private isResizing = false;
  private resizeDirection = '';
  private startX = 0;
  private startY = 0;
  private startLeft = 0;
  private startTop = 0;
  private startWidth = 0;
  private startHeight = 0;
  
  constructor() {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', () => this.onMouseUp());
  }
  
  startResize(event: MouseEvent, direction: string) {
    this.isResizing = true;
    this.resizeDirection = direction;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startLeft = this.selectorLeft;
    this.startTop = this.selectorTop;
    this.startWidth = this.selectorWidth;
    this.startHeight = this.selectorHeight;
    event.preventDefault();
    event.stopPropagation();
  }
  
  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      
      if (this.resizeDirection.includes('e')) {
        this.selectorWidth = Math.max(100, this.startWidth + deltaX);
      }
      if (this.resizeDirection.includes('w')) {
        const newWidth = Math.max(100, this.startWidth - deltaX);
        if (newWidth > 100) {
          this.selectorLeft = this.startLeft + deltaX;
          this.selectorWidth = newWidth;
        }
      }
      if (this.resizeDirection.includes('s')) {
        this.selectorHeight = Math.max(50, this.startHeight + deltaY);
      }
      if (this.resizeDirection.includes('n')) {
        const newHeight = Math.max(50, this.startHeight - deltaY);
        if (newHeight > 50) {
          this.selectorTop = this.startTop + deltaY;
          this.selectorHeight = newHeight;
        }
      }
    }
  }
  
  onMouseUp() {
    this.isResizing = false;
  }
  
  closeSelector() {
    alert('Close button clicked - selector would close');
  }
}
