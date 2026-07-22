import { Component, OnInit } from '@angular/core';
import { ConfirmacaoService, MensagemConviteResponse } from '../../services/confirmacao.service';

@Component({
  selector: 'app-admin-mensagens',
  templateUrl: './admin-mensagens.component.html',
  styleUrls: ['./admin-mensagens.component.css']
})
export class AdminMensagensComponent implements OnInit {

  carregando = true;
  erro = '';
  mensagens: MensagemConviteResponse[] = [];
  copiadoIndex: number | null = null;

  constructor(private confirmacaoService: ConfirmacaoService) { }

  ngOnInit(): void {
    this.confirmacaoService.listarMensagensConvite().subscribe({
      next: (resposta) => {
        this.mensagens = resposta;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as mensagens agora. Tente novamente em instantes.';
        this.carregando = false;
      }
    });
  }

  copiar(mensagem: string, index: number): void {
    navigator.clipboard.writeText(mensagem).then(() => {
      this.copiadoIndex = index;
      setTimeout(() => {
        if (this.copiadoIndex === index) {
          this.copiadoIndex = null;
        }
      }, 2000);
    });
  }

}
