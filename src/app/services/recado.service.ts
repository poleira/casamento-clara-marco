import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CriarRecadoRequest {
  nome: string;
  mensagem: string;
}

export interface RecadoResponse {
  id: number;
  nome: string;
  mensagem: string;
  dataCriacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecadoService {

  private readonly apiUrl = `${environment.apiUrl}/casamento`;

  constructor(private http: HttpClient) { }

  salvarRecado(request: CriarRecadoRequest): Observable<RecadoResponse> {
    return this.http.post<RecadoResponse>(`${this.apiUrl}/recado`, request);
  }

}
