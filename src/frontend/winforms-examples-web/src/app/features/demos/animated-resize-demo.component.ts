import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-animated-resize-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule, FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Animated Control Resize</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="demo-box">
          <div class="controls">
            <mat-form-field>
              <mat-label>Width</mat-label>
              <input matInput type="number" [(ngModel)]="targetWidth" min="50" max="400">
            </mat-form-field>
            
            <mat-form-field>
              <mat-label>Height</mat-label>
              <input matInput type="number" [(ngModel)]="targetHeight" min="50" max="400">
            </mat-form-field>
            
            <mat-form-field>
              <mat-label>Duration (ms)</mat-label>
              <input matInput type="number" [(ngModel)]="duration" min="100" max="3000">
            </mat-form-field>
            
            <button mat-raised-button color="primary" (click)="animateResize()">
              Animate Resize
            </button>
          </div>
          
          <div class="animated-element"
               [style.width.px]="currentWidth"
               [style.height.px]="currentHeight">
            Resize Me!
          </div>
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
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e0e0e0;
      padding: 20px;
    }
    
    .demo-box {
      background: white;
      padding: 40px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .controls {
      display: flex;
      gap: 15px;
      align-items: flex-end;
      flex-wrap: wrap;
    }
    
    mat-form-field {
      width: 120px;
    }
    
    .animated-element {
      background: #1976d2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 500;
      border-radius: 4px;
      transition: all 0.3s ease-in-out;
      align-self: center;
    }
  `]
})
export class AnimatedResizeDemoComponent {
  currentWidth = 150;
  currentHeight = 100;
  targetWidth = 250;
  targetHeight = 150;
  duration = 1000;
  
  animateResize() {
    const startWidth = this.currentWidth;
    const startHeight = this.currentHeight;
    const widthDiff = this.targetWidth - startWidth;
    const heightDiff = this.targetHeight - startHeight;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Ease-in-out function
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      this.currentWidth = startWidth + widthDiff * eased;
      this.currentHeight = startHeight + heightDiff * eased;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
}
