import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-fade-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Fade In/Out Example</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="demo-box">
          <h2 [style.opacity]="textOpacity" 
              class="fade-text"
              (click)="toggleFade()">
            Click Me! I will fade in and out!
          </h2>
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
    }
    
    .demo-box {
      background: white;
      padding: 60px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .fade-text {
      cursor: pointer;
      user-select: none;
      margin: 0;
      font-size: 24px;
      text-align: center;
      transition: opacity 1s ease-in-out;
    }
    
    .fade-text:hover {
      color: #1976d2;
    }
  `]
})
export class FadeDemoComponent {
  textOpacity = 1;
  private isAnimating = false;
  
  toggleFade() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const duration = 1000; // 1 second
    const steps = 50;
    const stepTime = duration / steps;
    const targetOpacity = this.textOpacity === 1 ? 0 : 1;
    const opacityStep = (targetOpacity - this.textOpacity) / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      this.textOpacity += opacityStep;
      
      if (currentStep >= steps) {
        this.textOpacity = targetOpacity;
        this.isAnimating = false;
        clearInterval(interval);
      }
    }, stepTime);
  }
}
