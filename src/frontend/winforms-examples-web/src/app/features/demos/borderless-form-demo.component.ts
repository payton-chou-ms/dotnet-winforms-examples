import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-borderless-form-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Resizeable Borderless Form Demo</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="demo-window" 
             [style.left.px]="windowLeft" 
             [style.top.px]="windowTop"
             [style.width.px]="windowWidth"
             [style.height.px]="windowHeight">
          
          <!-- Custom title bar -->
          <div class="title-bar" 
               (mousedown)="startDrag($event)">
            <span class="title">Borderless Window</span>
            <div class="window-controls">
              <button class="control-btn minimize" (click)="minimize()">
                <mat-icon>remove</mat-icon>
              </button>
              <button class="control-btn maximize" (click)="toggleMaximize()">
                <mat-icon>{{ isMaximized ? 'filter_none' : 'crop_square' }}</mat-icon>
              </button>
              <button class="control-btn close" (click)="closeWindow()">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>
          
          <!-- Window content -->
          <div class="window-content">
            <p>This form has no border and is still moveable,</p>
            <p>resizeable, min/max-imizable, and has a close button.</p>
          </div>
          
          <!-- Resize handles -->
          <div class="resize-handle top-left" (mousedown)="startResize($event, 'nw')"></div>
          <div class="resize-handle top-right" (mousedown)="startResize($event, 'ne')"></div>
          <div class="resize-handle bottom-left" (mousedown)="startResize($event, 'sw')"></div>
          <div class="resize-handle bottom-right" (mousedown)="startResize($event, 'se')"></div>
          <div class="resize-handle top" (mousedown)="startResize($event, 'n')"></div>
          <div class="resize-handle bottom" (mousedown)="startResize($event, 's')"></div>
          <div class="resize-handle left" (mousedown)="startResize($event, 'w')"></div>
          <div class="resize-handle right" (mousedown)="startResize($event, 'e')"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f5f5f5;
    }
    
    .content {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    
    .demo-window {
      position: absolute;
      background: #e0e0e0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      min-width: 200px;
      min-height: 150px;
    }
    
    .title-bar {
      background: #f0f0f0;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      cursor: move;
      user-select: none;
      border-bottom: 1px solid #ccc;
    }
    
    .title {
      flex: 1;
      font-size: 14px;
    }
    
    .window-controls {
      display: flex;
      gap: 2px;
    }
    
    .control-btn {
      width: 36px;
      height: 36px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      transition: background 0.2s;
    }
    
    .control-btn:hover {
      background: rgba(0,0,0,0.1);
    }
    
    .control-btn.minimize {
      color: #5c2d91;
    }
    
    .control-btn.maximize {
      color: #007acc;
    }
    
    .control-btn.close {
      color: #c42b1c;
    }
    
    .control-btn.close:hover {
      background: #c42b1c;
      color: white;
    }
    
    .window-content {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
    
    .resize-handle {
      position: absolute;
      background: transparent;
    }
    
    .resize-handle.top-left,
    .resize-handle.top-right,
    .resize-handle.bottom-left,
    .resize-handle.bottom-right {
      width: 10px;
      height: 10px;
    }
    
    .resize-handle.top,
    .resize-handle.bottom {
      left: 10px;
      right: 10px;
      height: 5px;
    }
    
    .resize-handle.left,
    .resize-handle.right {
      top: 10px;
      bottom: 10px;
      width: 5px;
    }
    
    .resize-handle.top-left {
      top: 0;
      left: 0;
      cursor: nw-resize;
    }
    
    .resize-handle.top-right {
      top: 0;
      right: 0;
      cursor: ne-resize;
    }
    
    .resize-handle.bottom-left {
      bottom: 0;
      left: 0;
      cursor: sw-resize;
    }
    
    .resize-handle.bottom-right {
      bottom: 0;
      right: 0;
      cursor: se-resize;
    }
    
    .resize-handle.top {
      top: 0;
      cursor: n-resize;
    }
    
    .resize-handle.bottom {
      bottom: 0;
      cursor: s-resize;
    }
    
    .resize-handle.left {
      left: 0;
      cursor: w-resize;
    }
    
    .resize-handle.right {
      right: 0;
      cursor: e-resize;
    }
  `]
})
export class BorderlessFormDemoComponent {
  windowLeft = 100;
  windowTop = 100;
  windowWidth = 600;
  windowHeight = 400;
  isMaximized = false;
  
  private isDragging = false;
  private isResizing = false;
  private resizeDirection = '';
  private startX = 0;
  private startY = 0;
  private startLeft = 0;
  private startTop = 0;
  private startWidth = 0;
  private startHeight = 0;
  
  constructor() {
    // Set up global mouse event listeners
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', () => this.onMouseUp());
  }
  
  startDrag(event: MouseEvent) {
    if (this.isMaximized) return;
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startLeft = this.windowLeft;
    this.startTop = this.windowTop;
    event.preventDefault();
  }
  
  startResize(event: MouseEvent, direction: string) {
    if (this.isMaximized) return;
    this.isResizing = true;
    this.resizeDirection = direction;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startLeft = this.windowLeft;
    this.startTop = this.windowTop;
    this.startWidth = this.windowWidth;
    this.startHeight = this.windowHeight;
    event.preventDefault();
    event.stopPropagation();
  }
  
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      this.windowLeft = this.startLeft + deltaX;
      this.windowTop = this.startTop + deltaY;
    } else if (this.isResizing) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      
      if (this.resizeDirection.includes('e')) {
        this.windowWidth = Math.max(200, this.startWidth + deltaX);
      }
      if (this.resizeDirection.includes('w')) {
        const newWidth = Math.max(200, this.startWidth - deltaX);
        if (newWidth > 200) {
          this.windowLeft = this.startLeft + deltaX;
          this.windowWidth = newWidth;
        }
      }
      if (this.resizeDirection.includes('s')) {
        this.windowHeight = Math.max(150, this.startHeight + deltaY);
      }
      if (this.resizeDirection.includes('n')) {
        const newHeight = Math.max(150, this.startHeight - deltaY);
        if (newHeight > 150) {
          this.windowTop = this.startTop + deltaY;
          this.windowHeight = newHeight;
        }
      }
    }
  }
  
  onMouseUp() {
    this.isDragging = false;
    this.isResizing = false;
  }
  
  minimize() {
    alert('Minimize functionality - window would be minimized');
  }
  
  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    if (this.isMaximized) {
      this.windowLeft = 0;
      this.windowTop = 0;
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight - 64; // Subtract toolbar height
    } else {
      this.windowLeft = 100;
      this.windowTop = 100;
      this.windowWidth = 600;
      this.windowHeight = 400;
    }
  }
  
  closeWindow() {
    alert('Close button clicked - window would close');
  }
}
