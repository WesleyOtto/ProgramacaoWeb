/*Usaremos o Local Store para armazenar os Dados*/

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {

                return false
            }

        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id == null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        //Seto uma key despesa e passo o obj literal transformando ele Json
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        //aray de desepsas

        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar as despesas cadastradas em localstorage
        for (let i = 1; i <= id; i++) {

            //recuperar a despesa (FAZENDO UM PARSE DO JSON)

            let despesa = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver indices que foram removidos
            //nesse casos nós vamos pular os indices

            if (despesa == null) {
                continue
            }

            despesa.id = i
            despesas.push(despesa)

        }
        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        //ano
        if (despesa.ano != '')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)

        //mes
        if (despesa.mes != '')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)

        //dia
        if (despesa.dia != '')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)

        //tipo
        if (despesa.tipo != '')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)

        //descricao
        if (despesa.descricao != '')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)

        //valor
        if (despesa.valor != '')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)

        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

//Cadastrar Despesa
function cadastarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


    if (despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro Inserido com Sucesso!'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi Cadastrada com Sucesso ! '
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro !'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se os erros foram inseridos corretamente! '
        document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir !'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistraDespesa').modal('show')

    }
}

//****************************************** */

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false)
        despesas = bd.recuperarTodosRegistros()

    //Selecionando tbody da tabela
    let listaDespesas = document.getElementById('listaDepesas')
    listaDespesas.innerHTML = ''

    /*
    <tr >
        <td > 15/03/2018 </td>
        <td >Alimentação < /td> 
        <td >Compras do mês < /td>
        <td > 44.75< /td> 
   </tr>
    */

    //percorrer o array despesas, listando cada despesa de forma dinâmica

    despesas.forEach(function(d) {

        //criando as linhas o tr
        let linha = listaDespesas.insertRow()

        //criar as colunas td
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
            //ajustar o tipo
        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                break;
            case '2':
                d.tipo = 'Educação'
                break;
            case '3':
                d.tipo = 'Lazer'
                break;
            case '4':
                d.tipo = 'Saúde'
                break;
            case '5':
                d.tipo = 'Transporte'
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar o botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'

        //criando o id do botão atrelando com o id do armazenamento
        //concatenamos id_despesas para evitar conflitos na aplicação
        btn.id = `id_despesa_${d.id}`
        btn.innerHTML = '<i class="fas fa-times"> </i>'
        btn.onclick = function() {
            //remover a despesa
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)
                //atualizar a página
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        console.log(d)
    })
}

//****************************************** */

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    //Pesquisa
    carregaListaDespesas(despesas, true)


}