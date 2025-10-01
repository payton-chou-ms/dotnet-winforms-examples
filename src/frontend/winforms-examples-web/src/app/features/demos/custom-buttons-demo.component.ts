import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-buttons-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule, MatSnackBarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Custom Button Examples</span>
      </mat-toolbar>
      
      <div class="content">
        <div class="demo-box">
          <h3>Circle Buttons</h3>
          <div class="button-group">
            <button class="circle-button red" (click)="showMessage('Red circle button')"></button>
            <button class="circle-button blue" (click)="showMessage('Blue circle button')">
              <mat-icon>favorite</mat-icon>
            </button>
            <button class="circle-button magenta" (click)="showMessage('Magenta circle button')">
              HI_M
            </button>
          </div>
          
          <h3>Custom Borders</h3>
          <div class="button-group">
            <button class="bordered-button cyan" (click)="showMessage('borderedButton1')">
              borderedButton1
            </button>
            <button class="bordered-button red-border" (click)="showMessage('borderedButton2')">
              borderedButton2
            </button>
            <button class="bordered-button blue-border" (click)="showMessage('borderedButton3')">
              borderedButton3
            </button>
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
      min-width: 500px;
    }
    
    h3 {
      margin: 20px 0 15px 0;
      font-size: 18px;
    }
    
    h3:first-child {
      margin-top: 0;
    }
    
    .button-group {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .circle-button {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }
    
    .circle-button:hover {
      transform: scale(1.05);
    }
    
    .circle-button:active {
      transform: scale(0.95);
    }
    
    .circle-button.red {
      background: #DC143C;
    }
    
    .circle-button.blue {
      background: #0000FF;
    }
    
    .circle-button.magenta {
      background: #FF00FF;
    }
    
    .bordered-button {
      padding: 15px 30px;
      font-size: 14px;
      cursor: pointer;
      background: #C0C0C0;
      transition: all 0.2s;
    }
    
    .bordered-button:hover {
      filter: brightness(0.95);
    }
    
    .bordered-button:active {
      transform: translateY(1px);
    }
    
    .bordered-button.cyan {
      border: 4px solid #00CED1;
    }
    
    .bordered-button.red-border {
      border: 4px solid #DC143C;
    }
    
    .bordered-button.blue-border {
      border: 4px solid #000080;
    }
  `]
})
export class CustomButtonsDemoComponent {
  constructor(private snackBar: MatSnackBar) {}
  
  showMessage(buttonName: string) {
    this.snackBar.open(`You clicked button ${buttonName}`, 'Close', {
      duration: 2000
    });
  }
}
