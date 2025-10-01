import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { timer, Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private apiService = inject(ApiService);
  
  progress = 0;
  logoUrl = '/assets/images/animated-logo.gif';
  appTitle = 'WinForms Examples Web';
  appVersion = '1.0.0';
  private subscription?: Subscription;

  ngOnInit(): void {
    // Load configuration
    this.apiService.getSplashScreenConfiguration().subscribe({
      next: (config) => {
        this.logoUrl = config.logoUrl;
        this.appTitle = config.appTitle;
        this.appVersion = config.appVersion;
        this.startTimer(config.displayDurationMs);
      },
      error: () => {
        // If API fails, use defaults and start timer
        this.startTimer(10000);
      }
    });
  }

  private startTimer(duration: number): void {
    const interval = 100; // Update every 100ms
    const totalTicks = duration / interval;
    
    this.subscription = timer(0, interval).subscribe(tick => {
      this.progress = Math.min((tick / totalTicks) * 100, 100);
      
      if (tick >= totalTicks) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
