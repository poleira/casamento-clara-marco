import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecadoService } from '../../services/recado.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {

  countdown = { days: '00', hours: '00', minutes: '00' };
  enviandoRecado = false;
  private countdownInterval: any;

  constructor(private recadoService: RecadoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => this.scrollToSection(fragment), 0);
      }
    });
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

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  sendRecado(nome: string, mensagem: string, nomeInput?: HTMLInputElement, msgInput?: HTMLTextAreaElement): void {
    const nomeTrim = nome.trim();
    const mensagemTrim = mensagem.trim();

    if (!nomeTrim || !mensagemTrim) {
      alert('Por favor, preencha seu nome e mensagem.');
      return;
    }

    if (this.enviandoRecado) {
      return;
    }

    this.enviandoRecado = true;

    this.recadoService.salvarRecado({ nome: nomeTrim, mensagem: mensagemTrim }).subscribe({
      next: () => {
        alert(`Obrigado, ${nomeTrim}! Seu recado foi enviado com sucesso.`);
        if (nomeInput) nomeInput.value = '';
        if (msgInput) msgInput.value = '';
        this.enviandoRecado = false;
      },
      error: () => {
        alert('Não foi possível enviar seu recado agora. Tente novamente em instantes.');
        this.enviandoRecado = false;
      }
    });
  }

}
