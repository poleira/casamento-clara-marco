import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  isOpening = false;

  constructor(private router: Router) {}

  openInvite(): void {
    if (this.isOpening) return;
    this.isOpening = true;
    setTimeout(() => this.router.navigate(['/convite']), 800);
  }
}

