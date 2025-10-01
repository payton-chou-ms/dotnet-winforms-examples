import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation-bar-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Navigation Bar Example</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="demo-window">
          <!-- Side navigation -->
          <div class="side-nav">
            <button class="nav-button" 
                    [class.active]="currentView === 'home'"
                    (click)="navigateTo('home')">
              Home
            </button>
            <button class="nav-button"
                    [class.active]="currentView === 'view1'"
                    (click)="navigateTo('view1')">
              View 1
            </button>
            <button class="nav-button"
                    [class.active]="currentView === 'view2'"
                    (click)="navigateTo('view2')">
              View 2
            </button>
            <button class="nav-button"
                    [class.active]="currentView === 'view3'"
                    (click)="navigateTo('view3')">
              View 3
            </button>
          </div>
          
          <!-- Main content area -->
          <div class="main-content">
            <h1>{{ getViewTitle() }}</h1>
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
    
    .demo-window {
      background: white;
      width: 800px;
      height: 600px;
      display: flex;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .side-nav {
      width: 200px;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #ddd;
    }
    
    .nav-button {
      padding: 20px;
      border: none;
      background: transparent;
      text-align: left;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s;
      border-left: 4px solid transparent;
    }
    
    .nav-button:hover {
      background: #e0e0e0;
    }
    
    .nav-button.active {
      background: #e0e0e0;
      border-left-color: #1976d2;
      font-weight: 500;
    }
    
    .main-content {
      flex: 1;
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .main-content h1 {
      font-size: 36px;
      color: #333;
      margin: 0;
    }
  `]
})
export class NavigationBarDemoComponent {
  currentView = 'home';
  
  navigateTo(view: string) {
    this.currentView = view;
  }
  
  getViewTitle(): string {
    switch (this.currentView) {
      case 'home': return 'Home Screen';
      case 'view1': return 'View 1';
      case 'view2': return 'View 2';
      case 'view3': return 'View 3';
      default: return 'Unknown View';
    }
  }
}
