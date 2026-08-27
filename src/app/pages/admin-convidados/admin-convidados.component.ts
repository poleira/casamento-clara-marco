import { Component, OnInit } from '@angular/core';
import { ConfirmacaoService, ConvidadoListagemResponse } from '../../services/confirmacao.service';

@Component({
  selector: 'app-admin-convidados',
  templateUrl: './admin-convidados.component.html',
  styleUrls: ['./admin-convidados.component.css']
})
export class AdminConvidadosComponent implements OnInit {

  carregando = true;
  erro = '';
  convidados: ConvidadoListagemResponse[] = [];
  ordenacao: 'id' | 'nome' = 'id';

  // Adicionar
  mostrarFormAdicionar = false;
  novoNome = '';
  adicionando = false;
  erroAdicionar = '';

  // Editar
  editandoId: number | null = null;
  editNome = '';
  editConfirmado = false;
  salvando = false;
  erroEditar = '';

  // Deletar
  convidadoParaDeletar: ConvidadoListagemResponse | null = null;
  deletando = false;
  erroDeletar = '';

  constructor(private confirmacaoService: ConfirmacaoService) { }

  ngOnInit(): void {
    this.carregarConvidados();
  }

  carregarConvidados(): void {
    this.carregando = true;
    this.erro = '';
    this.confirmacaoService.listarConvidados().subscribe({
      next: (resposta) => {
        this.convidados = resposta;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os convidados. Tente novamente em instantes.';
        this.carregando = false;
      }
    });
  }

  // --- Adicionar ---

  abrirFormAdicionar(): void {
    this.mostrarFormAdicionar = true;
    this.novoNome = '';
    this.erroAdicionar = '';
  }

  cancelarAdicionar(): void {
    this.mostrarFormAdicionar = false;
    this.novoNome = '';
    this.erroAdicionar = '';
  }

  confirmarAdicionar(): void {
    if (!this.novoNome.trim()) {
      this.erroAdicionar = 'Nome é obrigatório.';
      return;
    }
    this.adicionando = true;
    this.erroAdicionar = '';
    this.confirmacaoService.criarConvidado(this.novoNome.trim()).subscribe({
      next: (novo) => {
        this.convidados = [...this.convidados, novo];
        this.mostrarFormAdicionar = false;
        this.novoNome = '';
        this.adicionando = false;
      },
      error: () => {
        this.erroAdicionar = 'Erro ao adicionar convidado. Verifique se o nome já existe.';
        this.adicionando = false;
      }
    });
  }

  // --- Editar ---

  iniciarEdicao(convidado: ConvidadoListagemResponse): void {
    this.editandoId = convidado.id;
    this.editNome = convidado.nome;
    this.editConfirmado = convidado.confirmado;
    this.erroEditar = '';
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.erroEditar = '';
  }

  salvarEdicao(): void {
    if (!this.editNome.trim()) {
      this.erroEditar = 'Nome é obrigatório.';
      return;
    }
    this.salvando = true;
    this.erroEditar = '';
    this.confirmacaoService.atualizarConvidado(this.editandoId!, this.editNome.trim(), this.editConfirmado).subscribe({
      next: (atualizado) => {
        this.convidados = this.convidados.map(c => c.id === atualizado.id ? atualizado : c);
        this.editandoId = null;
        this.salvando = false;
      },
      error: () => {
        this.erroEditar = 'Erro ao salvar alterações.';
        this.salvando = false;
      }
    });
  }

  // --- Deletar ---

  abrirModalDeletar(convidado: ConvidadoListagemResponse): void {
    this.convidadoParaDeletar = convidado;
    this.erroDeletar = '';
  }

  cancelarDeletar(): void {
    this.convidadoParaDeletar = null;
    this.erroDeletar = '';
  }

  confirmarDeletar(): void {
    if (!this.convidadoParaDeletar) return;
    this.deletando = true;
    this.erroDeletar = '';
    this.confirmacaoService.deletarConvidado(this.convidadoParaDeletar.id).subscribe({
      next: () => {
        this.convidados = this.convidados.filter(c => c.id !== this.convidadoParaDeletar!.id);
        this.convidadoParaDeletar = null;
        this.deletando = false;
      },
      error: () => {
        this.erroDeletar = 'Erro ao remover convidado.';
        this.deletando = false;
      }
    });
  }

  get convidadosOrdenados(): ConvidadoListagemResponse[] {
    return [...this.convidados].sort((a, b) =>
      this.ordenacao === 'nome' ? a.nome.localeCompare(b.nome) : a.id - b.id
    );
  }

  alternarOrdenacao(): void {
    this.ordenacao = this.ordenacao === 'id' ? 'nome' : 'id';
  }

  get totalConfirmados(): number {
    return this.convidados.filter(c => c.confirmado).length;
  }
}
