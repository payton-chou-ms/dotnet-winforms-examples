import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-rounded-corners-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Panels With Rounded Corners</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="demo-grid">
          <div class="rounded-panel panel1">
            <h3>Panel 1</h3>
            <p>This panel has rounded corners with a gradient background.</p>
          </div>
          
          <div class="rounded-panel panel2">
            <h3>Panel 2</h3>
            <p>Custom border radius and shadow effects.</p>
          </div>
          
          <div class="rounded-panel panel3">
            <h3>Panel 3</h3>
            <p>Hover over panels to see effects.</p>
          </div>
          
          <div class="rounded-panel panel4">
            <h3>Panel 4</h3>
            <p>Different corner radius values can be applied.</p>
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
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      max-width: 800px;
    }
    
    .rounded-panel {
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .rounded-panel:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0,0,0,0.2);
    }
    
    .rounded-panel h3 {
      margin: 0 0 10px 0;
      font-size: 20px;
    }
    
    .rounded-panel p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .panel1 {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .panel2 {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    
    .panel3 {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }
    
    .panel4 {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }
  `]
})
export class RoundedCornersDemoComponent {}
