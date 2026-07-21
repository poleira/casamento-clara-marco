import { Component } from '@angular/core';
import { ConfirmacaoService } from '../../services/confirmacao.service';

type Etapa = 'busca' | 'confirmado';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent {

  buscando = false;
  confirmando = false;
  erroBusca = '';

  modalAberto = false;
  etapa: Etapa = 'busca';
  nomeConvidado = '';
  jaConfirmado = false;

  private nomeAtual = '';

  constructor(private confirmacaoService: ConfirmacaoService) { }

  buscarConvidado(nomeInput: HTMLInputElement): void {
    const nome = nomeInput.value.trim().toLowerCase();
    this.erroBusca = '';

    if (!nome) {
      this.erroBusca = 'Informe seu nome.';
      return;
    }

    if (this.buscando) {
      return;
    }

    this.buscando = true;

    this.confirmacaoService.buscarConvidadoPorNome(nome).subscribe({
      next: (resposta) => {
        this.nomeAtual = nome;
        this.nomeConvidado = resposta.nome;
        this.jaConfirmado = resposta.confirmado;
        this.etapa = 'busca';
        this.modalAberto = true;
        this.buscando = false;
      },
      error: (err) => {
        this.erroBusca = err?.error?.erro || 'Nome não encontrado. Verifique se digitou da mesma forma que está no convite.';
        this.buscando = false;
      }
    });
  }

  confirmarPresenca(): void {
    if (this.confirmando || this.jaConfirmado) {
      return;
    }

    this.confirmando = true;

    this.confirmacaoService.confirmarPresenca(this.nomeAtual).subscribe({
      next: () => {
        this.jaConfirmado = true;
        this.etapa = 'confirmado';
        this.confirmando = false;
      },
      error: () => {
        this.confirmando = false;
        alert('Não foi possível confirmar sua presença agora. Tente novamente em instantes.');
      }
    });
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.etapa = 'busca';
  }

}
