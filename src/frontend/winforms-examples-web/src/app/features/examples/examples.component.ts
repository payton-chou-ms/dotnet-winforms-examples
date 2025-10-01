import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../core/services/api.service';
import { Example } from '../../core/models/example.model';
import { CodeViewDialogComponent } from './code-view-dialog.component';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  
  examples: Example[] = [];
  categories: string[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadExamples();
    this.loadCategories();
  }

  loadExamples(): void {
    this.loading = true;
    this.error = null;
    console.log('Attempting to load examples from API...');
    this.apiService.getExamples(1, 20).subscribe({
      next: (result) => {
        console.log('Successfully loaded examples:', result);
        this.examples = result.items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading examples - Full error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error URL:', err.url);
        this.error = `Failed to load examples: ${err.status || 'Unknown error'} - ${err.message || 'Please check console'}`;
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  viewDemo(example: Example): void {
    const demoRoutes: { [key: string]: string } = {
      'Resizeable Borderless Form Example': '/demo/borderless-form',
      'Fade In Fade Out Example': '/demo/fade',
      '2D Collision Example': '/demo/collision',
      'Custom Button Examples': '/demo/custom-buttons',
      'Navigation Bar Example': '/demo/navigation-bar',
      'Transparent Screen Selector Form Example': '/demo/transparent-selector',
      'Animated Control Resize': '/demo/animated-resize',
      'Panels With Rounded Corners': '/demo/rounded-corners',
      'Animated Logo On Launch': '/demo/animated-logo'
    };
    
    const route = demoRoutes[example.title];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.log('No demo available for:', example.title);
    }
  }

  viewCode(example: Example): void {
    this.dialog.open(CodeViewDialogComponent, {
      data: example,
      width: '800px',
      maxHeight: '80vh'
    });
  }
}
