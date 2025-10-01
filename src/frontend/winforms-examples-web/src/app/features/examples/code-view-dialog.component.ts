import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Example } from '../../core/models/example.model';

@Component({
  selector: 'app-code-view-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      {{ data.title }}
      <button mat-icon-button 
              class="close-button" 
              (click)="close()">
        <mat-icon>close</mat-icon>
      </button>
    </h2>
    
    <mat-dialog-content>
      <div class="code-info">
        <p class="description">{{ data.description }}</p>
        
        <div class="meta">
          <span class="category">{{ data.category }}</span>
          <span class="difficulty">{{ data.difficultyLevel }}</span>
        </div>
        
        <div class="technologies">
          <span class="tech-label">Technologies:</span>
          <span class="tech" *ngFor="let tech of data.technologies">{{ tech }}</span>
        </div>
      </div>
      
      <div class="code-section">
        <h3>Source Code</h3>
        <pre><code>{{ data.codeSnippet }}</code></pre>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="copyCode()">
        <mat-icon>content_copy</mat-icon>
        Copy Code
      </button>
      <button mat-raised-button color="primary" (click)="close()">
        Close
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 20px 24px;
    }
    
    .close-button {
      margin-left: auto;
    }
    
    mat-dialog-content {
      padding: 0 24px 20px;
      max-height: 60vh;
      overflow: auto;
    }
    
    .code-info {
      margin-bottom: 20px;
    }
    
    .description {
      margin: 0 0 15px 0;
      line-height: 1.6;
    }
    
    .meta {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .category {
      padding: 4px 12px;
      background: #e3f2fd;
      color: #1976d2;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .difficulty {
      padding: 4px 12px;
      background: #f3e5f5;
      color: #7b1fa2;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .technologies {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    
    .tech-label {
      font-weight: 500;
      font-size: 14px;
    }
    
    .tech {
      padding: 3px 10px;
      background: #f5f5f5;
      border-radius: 8px;
      font-size: 12px;
      color: #666;
    }
    
    .code-section {
      background: #f5f5f5;
      border-radius: 4px;
      padding: 15px;
    }
    
    .code-section h3 {
      margin: 0 0 10px 0;
      font-size: 16px;
    }
    
    pre {
      margin: 0;
      padding: 15px;
      background: #263238;
      border-radius: 4px;
      overflow-x: auto;
    }
    
    code {
      color: #aed581;
      font-family: 'Courier New', Courier, monospace;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre;
    }
    
    mat-dialog-actions {
      padding: 8px 24px 20px;
    }
  `]
})
export class CodeViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CodeViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Example
  ) {}
  
  close(): void {
    this.dialogRef.close();
  }
  
  copyCode(): void {
    navigator.clipboard.writeText(this.data.codeSnippet).then(() => {
      alert('Code copied to clipboard!');
    });
  }
}
