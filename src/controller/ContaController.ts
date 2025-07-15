import { ContaRepository } from "../repository/ContaRepository";
import { Conta } from "../model/Conta";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>;
    numero: number = 0

    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar()
        }
    }

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar()
        } else {
            console.log(colors.fg.red, "\nA copnta numero: "+ numero + " nao foi encontrado!", colors.reset)
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta numero: " + conta.numero + " foi criada com socesso!", colors.reset)
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if(buscaConta != null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\n Conta numero: "+ conta.numero + " foi atualizada com sucesso", colors.reset)
        } else {
            console.log(colors.fg.red, "\nA conta numero: " + conta.numero + " nao foi encontrada!", colors.reset)
        }
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

    }
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    public buscarNoArray(numero: number) : Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero) return conta
        }

        return null
    }

    /*metodos auxiliares*/

    //gerar numero da conta
    public gerarNumero(): number {
        return ++ this.numero;
    }
}