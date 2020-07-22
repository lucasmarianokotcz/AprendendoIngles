import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Coracao } from 'app/shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() tentativas: number

  public coracoes: Coracao[] = [
    new Coracao(true), new Coracao(true), new Coracao(true)
  ]

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.coracoes.length > this.tentativas) {
      let index = this.coracoes.length - this.tentativas
      this.coracoes[index - 1].cheio = false
    }
  }
}
