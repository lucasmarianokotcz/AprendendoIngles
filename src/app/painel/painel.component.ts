import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";

import { Frase } from "../shared/frase.model";
import { FRASES } from "./frases-mock";

@Component({
  selector: "app-painel",
  templateUrl: "./painel.component.html",
  styleUrls: ["./painel.component.css"],
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Array<Frase> = FRASES;
  public instrucao: string = "Traduza a frase:";
  public resposta: string = "";
  public resultado: string;
  public acertou: boolean;
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  public get podeTentar(): boolean {
    return this.tentativas <= 0;
  }

  public get isUltimaRodada(): boolean {
    return this.rodada == 4;
  }

  private _tentativas: number = 3;
  public get tentativas(): number {
    return this._tentativas;
  }
  public set tentativas(v: number) {
    if (v < 0) {
      this._tentativas = 0;
    } else {
      this._tentativas = v;
    }
  }

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    document.getElementById("txtResposta").focus();
    if (
      this.rodadaFrase.frasePtBr.toLowerCase() == this.resposta.toLowerCase()
    ) {
      this.rodada++;
      this.progresso += 100 / this.frases.length;
      this.resultado = "acertou!";
      this.acertou = true;

      if (this.isUltimaRodada) {
        this.encerrarJogo.emit("vitoria");
      }

      this.atualizaRodada();
    } else {
      this.tentativas--;
      this.resultado = "errou.";
      this.acertou = false;

      if (this._tentativas === 0) {
        this.encerrarJogo.emit("derrota");
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = "";
  }
}
