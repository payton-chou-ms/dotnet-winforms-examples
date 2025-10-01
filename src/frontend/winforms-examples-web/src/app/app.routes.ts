import { Routes } from '@angular/router';
import { SplashScreenComponent } from './features/splash-screen/splash-screen.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExamplesComponent } from './features/examples/examples.component';

export const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: '**', redirectTo: '' }
];
