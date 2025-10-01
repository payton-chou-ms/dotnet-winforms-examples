import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-animated-logo-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="demo-container">
      <div class="splash-screen" [class.fade-out]="isFadingOut">
        <div class="logo-container">
          <mat-spinner diameter="100" [color]="'primary'"></mat-spinner>
          <h1 class="app-name">WinForms Examples</h1>
          <p class="loading-text">Loading application...</p>
        </div>
      </div>
      
      <button mat-icon-button class="back-button" routerLink="/examples">
        <mat-icon>arrow_back</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .demo-container {
      height: 100vh;
      position: relative;
      background: #1976d2;
    }
    
    .splash-screen {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.5s ease-in;
    }
    
    .splash-screen.fade-out {
      animation: fadeOut 1s ease-out forwards;
    }
    
    .logo-container {
      text-align: center;
      color: white;
    }
    
    .app-name {
      margin: 30px 0 10px 0;
      font-size: 48px;
      font-weight: 300;
      animation: slideUp 0.8s ease-out;
    }
    
    .loading-text {
      margin: 0;
      font-size: 18px;
      opacity: 0.9;
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(255,255,255,0.2);
      color: white;
    }
    
    .back-button:hover {
      background: rgba(255,255,255,0.3);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }
  `]
})
export class AnimatedLogoDemoComponent implements OnInit {
  isFadingOut = false;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Auto-close after 5 seconds
    setTimeout(() => {
      this.isFadingOut = true;
      setTimeout(() => {
        this.router.navigate(['/examples']);
      }, 1000);
    }, 5000);
  }
}
