
//Definindo tamanho da tela Visivel 
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var criaMosquitoTempo = 1500

 var nivel = window.location.search
 nivel = nivel.replace('?', '')

if (nivel === 'normal') {
    criaMosquitoTempo = 1500
 }else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000
 }else if(nivel === 'chuck'){
    criaMosquitoTempo = 750
 }

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
   // console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

var cronometros = setInterval(() => {
    tempo -= 1;

    if (tempo<0) {
        clearInterval(cronometros)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }
        
} , 1000);

//Função randomica de posição
function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas >3) {
            window.location.href = 'fim-jogo.html'
        }
        document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'

        vidas++
    }
    
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura)  - 90

    //Ajusto a posição do mosquito para o marco 0,0
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

   // console.log(posicaoX, posicaoY)

    //criar o elemento html

    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.position = 'absolute'
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.id = 'mosquito'
    //remove o mosquito se clicado
    mosquito.onclick = function () {
        this.remove()
    }
    //Adiciono mosquito para ser filho do meu body
    document.body.appendChild(mosquito)

    tamanhoAleatorio()
}

//Função de escolha de classe css aleátoria para o tamanho
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0: return 'mosquito1'
            
        case 1: return 'mosquito2'
            
        case 2: return 'mosquito3'            
           
    }
        
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0: return 'ladoa'

        case 1: return 'ladob'

    }
}