/*Usaremos o Local Store para armazenar os Dados*/

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes 
        this.dia = dia 
        this.tipo = tipo 
        this.descricao = descricao 
        this.valor = valor
    }
}
//Cadastrar Despesa
function cadastarDespesa(){
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    gravar(despesa)
        
}

function gravar(d) {
    //Seto uma key despesa e passo o obj literal transformando ele Json
    localStorage.setItem('despesa', JSON.stringify(d))
}