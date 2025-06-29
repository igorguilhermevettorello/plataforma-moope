import { Component } from '@angular/core';
import { Plano } from '../plano.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista {
  planos: Plano[] = [
    { codigo: '001', descricao: 'Plano Básico', status: true },
    { codigo: '002', descricao: 'Plano Premium', status: false },
    { codigo: '003', descricao: 'Plano Empresarial', status: true }
  ];
  planosFiltrados: Plano[] = [...this.planos];
  termoBusca: string = '';

  buscar() {
    const termo = this.termoBusca.trim().toLowerCase();
    this.planosFiltrados = this.planos.filter(plano =>
      plano.codigo.toLowerCase().includes(termo) ||
      plano.descricao.toLowerCase().includes(termo)
    );
  }

  limparBusca() {
    this.termoBusca = '';
    this.planosFiltrados = [...this.planos];
  }

  adicionar() {
    // Navegação para tela de cadastro pode ser implementada aqui
    alert('Funcionalidade de adicionar plano!');
  }

  alternarStatus(plano: Plano) {
    plano.status = !plano.status;
  }
}
