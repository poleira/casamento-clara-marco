import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { InviteComponent } from './pages/invite/invite.component';
import { MaquiagemComponent } from './pages/dicas/maquiagem/maquiagem.component';
import { CulinariaComponent } from './pages/dicas/culinaria/culinaria.component';
import { OQueFazerComponent } from './pages/dicas/o-que-fazer/o-que-fazer.component';
import { HoteisComponent } from './pages/dicas/hoteis/hoteis.component';
import { ConfirmacaoComponent } from './pages/confirmacao/confirmacao.component';

const routes: Routes = [
  { path: '',                    component: LandingComponent     },
  { path: 'convite',             component: InviteComponent      },
  { path: 'confirmacao',         component: ConfirmacaoComponent },
  { path: 'dicas/maquiagem',     component: MaquiagemComponent   },
  { path: 'dicas/culinaria',     component: CulinariaComponent   },
  { path: 'dicas/o-que-fazer',   component: OQueFazerComponent   },
  { path: 'dicas/hoteis',        component: HoteisComponent      },
  { path: '**',                  redirectTo: ''                  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

