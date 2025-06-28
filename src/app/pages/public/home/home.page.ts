import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanosComponent } from '../../../components/planos/planos.component';
import { StepsPagamentoComponent } from '../../../components/steps-pagamento/steps-pagamento.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  imports: [CommonModule, PlanosComponent, StepsPagamentoComponent, RouterModule]
})
export class HomePage {
  public cupom: string | null = null;
  public plano: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.cupom = params['cupom'] || null;
      this.plano = params['plano'] || null;
    });
    console.log(">>", this.cupom, this.plano);
  }

  public get planoSelecionado(): boolean {
    return this.plano === '1234' || this.plano === '9876';
  }
} 