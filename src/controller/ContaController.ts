import { ContaRepository } from "../repository/ContaRepository";
import { Conta } from "../model/Conta";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>;
    numero: number = 0

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar()
        }
    }

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar()
        } else {
            console.log(colors.fg.red, "\nA copnta numero: " + numero + " nao foi encontrado!", colors.reset)
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta numero: " + conta.numero + " foi criada com socesso!", colors.reset)
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\n Conta numero: " + conta.numero + " foi atualizada com sucesso", colors.reset)
        } else {
            console.log(colors.fg.red, "\nA conta numero: " + conta.numero + " nao foi encontrada!", colors.reset)
        }
    }
    public deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "\nA Conta numero: " + numero +
                " foi apagada com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA Conta numero: " + numero +
                " não foi encontrada!", colors.reset);
        }


    }
    public sacar(numero: number, valor: number): void {
        const conta = this.buscarNoArray(numero);

        if (conta !== null) {

            if (conta.sacar(valor) == true) {
                console.log(colors.fg.green, "\nSaque na conta numero: " + numero + " foi efetuado com sucesso!", colors.reset);
            }
        } else {
            console.log(colors.fg.red, `\nConta ${numero} não encontrada!`, colors.reset
            );
        }
    }
    depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, "\O Deposito na Conta numero: " + numero + " foi efetuado com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta numero: " + numero + " nao foi encontrada!", colors.reset)
        }
    }
    public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if (contaOrigem.sacar(valor) == true) {
                contaDestino.depositar(valor);
                console.log(colors.fg.green, "\nA Transferência da Conta numero: " + numeroOrigem +
                    " para a Conta numero: " + numeroDestino + " foi efetuada com sucesso!",
                    colors.reset);
            }
        } else {
            console.log(colors.fg.red, "\nA Conta numero: " + numeroOrigem +
                " e/ou a Conta numero: " + numeroDestino + " não foram encontradas!",
                colors.reset);
        }

    }
    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero) return conta
        }

        return null
    }

    /*metodos auxiliares*/

    //gerar numero da conta
    public gerarNumero(): number {
        return ++this.numero;
    }
}