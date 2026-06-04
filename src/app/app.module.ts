import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { InviteComponent } from './pages/invite/invite.component';
import { MaquiagemComponent } from './pages/dicas/maquiagem/maquiagem.component';
import { CulinariaComponent } from './pages/dicas/culinaria/culinaria.component';
import { OQueFazerComponent } from './pages/dicas/o-que-fazer/o-que-fazer.component';
import { HoteisComponent } from './pages/dicas/hoteis/hoteis.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InviteComponent,
    MaquiagemComponent,
    CulinariaComponent,
    OQueFazerComponent,
    HoteisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
