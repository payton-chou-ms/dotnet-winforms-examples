import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

@Component({
  selector: 'app-collision-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <div class="demo-container">
      <mat-toolbar color="primary">
        <button mat-icon-button routerLink="/examples">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>2D Collision Example</span>
      </mat-toolbar>
      
      <div class="content">
        <canvas #canvas 
                [width]="canvasWidth" 
                [height]="canvasHeight"
                class="collision-canvas"></canvas>
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
    
    .collision-canvas {
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class CollisionDemoComponent implements OnInit, OnDestroy {
  canvasWidth = 600;
  canvasHeight = 400;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private balls: Ball[] = [];
  private animationId: number | null = null;
  
  ngOnInit() {
    setTimeout(() => {
      this.canvas = document.querySelector('canvas')!;
      this.ctx = this.canvas.getContext('2d')!;
      this.initBalls();
      this.animate();
    });
  }
  
  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
  
  private initBalls() {
    const colors = ['#0E7C7B', '#556B2F', '#D2691E', '#32CD32'];
    const positions = [
      { x: 100, y: 100 },
      { x: 500, y: 100 },
      { x: 100, y: 300 },
      { x: 500, y: 300 }
    ];
    
    this.balls = positions.map((pos, i) => ({
      x: pos.x,
      y: pos.y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 40,
      color: colors[i]
    }));
  }
  
  private animate() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Update and draw balls
    this.balls.forEach(ball => {
      // Move ball
      ball.x += ball.vx;
      ball.y += ball.vy;
      
      // Wall collision
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > this.canvasWidth) {
        ball.vx *= -1;
        ball.x = Math.max(ball.radius, Math.min(this.canvasWidth - ball.radius, ball.x));
      }
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.canvasHeight) {
        ball.vy *= -1;
        ball.y = Math.max(ball.radius, Math.min(this.canvasHeight - ball.radius, ball.y));
      }
      
      // Draw ball
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    });
    
    // Ball to ball collision
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const ball1 = this.balls[i];
        const ball2 = this.balls[j];
        
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ball1.radius + ball2.radius) {
          // Collision detected
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);
          
          // Rotate velocities
          const vx1 = ball1.vx * cos + ball1.vy * sin;
          const vy1 = ball1.vy * cos - ball1.vx * sin;
          const vx2 = ball2.vx * cos + ball2.vy * sin;
          const vy2 = ball2.vy * cos - ball2.vx * sin;
          
          // Swap velocities
          const temp = vx1;
          ball1.vx = (vx2 * cos - vy1 * sin);
          ball1.vy = (vy1 * cos + vx2 * sin);
          ball2.vx = (temp * cos - vy2 * sin);
          ball2.vy = (vy2 * cos + temp * sin);
          
          // Separate balls
          const overlap = ball1.radius + ball2.radius - distance;
          ball1.x -= overlap * cos / 2;
          ball1.y -= overlap * sin / 2;
          ball2.x += overlap * cos / 2;
          ball2.y += overlap * sin / 2;
        }
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
