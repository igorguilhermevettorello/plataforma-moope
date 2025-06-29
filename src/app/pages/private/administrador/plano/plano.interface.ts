import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Plano {

  constructor() { }
}

export interface Plano {
  codigo: string;
  descricao: string;
  status: boolean;
}
