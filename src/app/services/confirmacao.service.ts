import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ConvidadoResponse {
  nome: string;
  confirmado: boolean;
}

export interface ConfirmarPresencaResponse {
  nome: string;
  confirmado: boolean;
  dataConfirmacao: string | null;
}

export interface MensagemConviteResponse {
  nome: string;
  mensagem: string;
}

export interface ConvidadoListagemResponse {
  id: number;
  nome: string;
  confirmado: boolean;
  dataConfirmacao: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoService {

  private readonly apiUrl = `${environment.apiUrl}/casamento`;

  constructor(private http: HttpClient) { }

  buscarConvidadoPorNome(nome: string): Observable<ConvidadoResponse> {
    return this.http.post<ConvidadoResponse>(`${this.apiUrl}/confirmacao/buscar`, { nome });
  }

  confirmarPresenca(nome: string): Observable<ConfirmarPresencaResponse> {
    return this.http.post<ConfirmarPresencaResponse>(`${this.apiUrl}/confirmacao/confirmar`, { nome });
  }

  listarMensagensConvite(): Observable<MensagemConviteResponse[]> {
    return this.http.get<MensagemConviteResponse[]>(`${this.apiUrl}/convidados/mensagens-convite`);
  }

  listarConvidados(): Observable<ConvidadoListagemResponse[]> {
    return this.http.get<ConvidadoListagemResponse[]>(`${this.apiUrl}/convidados`);
  }

  criarConvidado(nome: string): Observable<ConvidadoListagemResponse> {
    return this.http.post<ConvidadoListagemResponse>(`${this.apiUrl}/convidados`, { nome });
  }

  atualizarConvidado(id: number, nome: string, confirmado: boolean): Observable<ConvidadoListagemResponse> {
    return this.http.put<ConvidadoListagemResponse>(`${this.apiUrl}/convidados/${id}`, { nome, confirmado });
  }

  deletarConvidado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/convidados/${id}`);
  }

}
