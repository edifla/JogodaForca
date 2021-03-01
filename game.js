const letrass = ['jaca','melancia','ornitorrinco','proparoxitona','paralelepipedo','cabeleireira','otorrinolaringologista','infectologista','abelha','lapide','estojo','pincel','tinta','urna','queijo','boi','peru','dinheiro','onibus','gasolina','cacete']
let PalavraEscolhida;
let letras = document.querySelector('.caixa-letras')
let arrayPalavraEscolhida;
let vidas = document.querySelector('.vidas')
let forca = document.getElementById('forca')
let vida = 6

const Game = {
    iniciar() {
        vidas.innerHTML = vida
        Game.randomizando()
    },
    randomizando() {
        let randomizandos = Math.floor(Math.random() * letrass.length)
        PalavraEscolhida = letrass[randomizandos]
        Game.gerarEspacos()
        return PalavraEscolhida;

    },
    gerarEspacos() {
        arrayPalavraEscolhida = PalavraEscolhida.split("")
        for (let i = 0; i != arrayPalavraEscolhida.length; i++) {
            let espaco = document.createElement('p')
            espaco.innerHTML = `<p class='espaco'></p>`
            letras.append(espaco)
        }
    },
    preenchimento(procura, id) {
        let novo = []
        var cor = document.getElementById(id.toUpperCase())
        if (procura && cor.style.backgroundColor != '#92C792' && cor.style.backgroundColor != 'red' && vida != 0) {
            let campos = document.querySelectorAll('.espaco')
            function obtendoIndex(element, index) {
                if (element === id) {
                    novo.push(index)
                }
            }
            arrayPalavraEscolhida.forEach(obtendoIndex);
            for (let i = 0; i < novo.length; i++) {
                campos[novo[i]].innerHTML = id
            }

            cor.style.backgroundColor = "#92C792";
        // Travando letras que ja foram usadas
        } else if (cor.style.backgroundColor == '#92C792' || cor.style.backgroundColor == 'red' || vida <= 0) {
            return;
        // Redução de vida e chamada de verificação da derrota
        } else {
            vida = vida - 1
            vidas.innerHTML = vida
            if(vida == 5){
                forca.src = 'Imagens/forca1.png'
            }else if(vida == 4){
                forca.src = 'Imagens/forca2.png'
            }else if(vida == 3){
                forca.src = 'Imagens/forca3.png'
            }else if(vida == 2){
                forca.src = 'Imagens/forca4.png'
            }else if(vida == 1){
                forca.src = 'Imagens/forca5.png'
            }else if(vida == 0){
                forca.src = 'Imagens/forca6.png'
                vidas.innerHTML = 'Fim do jogo, você perdeu'
                Game.fimDeJogo()
            }
            cor.style.backgroundColor = "red";
        }

    },
    fimDeJogo() {
        if (vida == 0) {
            // Desabilita o teclado
            // Escreve a mensagem de fim de jogo
        } else {
            return;
        }
    },
    verificando(id) {
        id = id.toLowerCase();
        let procura = PalavraEscolhida.split(id).length - 1
        Game.preenchimento(procura, id)
        return procura
    }
}
Game.iniciar()
