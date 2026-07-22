import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { InviteComponent } from './pages/invite/invite.component';
import { MaquiagemComponent } from './pages/dicas/maquiagem/maquiagem.component';
import { CulinariaComponent } from './pages/dicas/culinaria/culinaria.component';
import { OQueFazerComponent } from './pages/dicas/o-que-fazer/o-que-fazer.component';
import { HoteisComponent } from './pages/dicas/hoteis/hoteis.component';
import { ConfirmacaoComponent } from './pages/confirmacao/confirmacao.component';
import { AdminMensagensComponent } from './pages/admin-mensagens/admin-mensagens.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InviteComponent,
    MaquiagemComponent,
    CulinariaComponent,
    OQueFazerComponent,
    HoteisComponent,
    ConfirmacaoComponent,
    AdminMensagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
