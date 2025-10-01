import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../core/services/api.service';
import { Example } from '../../core/models/example.model';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent implements OnInit {
  private apiService = inject(ApiService);
  
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
    this.apiService.getExamples(1, 20).subscribe({
      next: (result) => {
        this.examples = result.items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load examples';
        this.loading = false;
        console.error('Error loading examples:', err);
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
}
