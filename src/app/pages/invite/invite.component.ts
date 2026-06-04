import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {

  countdown = { days: '00', hours: '00', minutes: '00' };
  private countdownInterval: any;

  ngOnInit(): void {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  private updateCountdown(): void {
    const target = new Date('2026-11-21T17:00:00');
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      this.countdown = { days: '00', hours: '00', minutes: '00' };
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    this.countdown = {
      days:    String(days).padStart(2, '0'),
      hours:   String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0')
    };
  }

  openAlert(message: string): void {
    alert(message);
  }

  sendRecado(nome: string, mensagem: string): void {
    if (!nome.trim() || !mensagem.trim()) {
      alert('Por favor, preencha seu nome e mensagem.');
      return;
    }
    alert(`Recado recebido, ${nome.trim()}! Em breve esse recurso estará ativo.`);
  }

}
