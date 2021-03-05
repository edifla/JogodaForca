const letrass = ['jaca', 'melancia', 'ornitorrinco', 'proparoxitona', 'paralelepipedo', 'cabeleireira', 'otorrinolaringologista', 'infectologista', 'abelha', 'lapide', 'estojo', 'pincel', 'tinta', 'urna', 'queijo', 'boi', 'peru', 'dinheiro', 'onibus', 'gasolina', 'cacete']
let PalavraEscolhida;
let arrayPalavraEscolhida;
let jogo = document.querySelector('.caixa-forca')
let vidas = document.querySelector('.vidas')
let forca = document.getElementById('forca')
let vida = 6
let letras
let end = 0

const Game = {
	iniciar() {
		vida = 6
		vidas.style.color = 'black'
		end = 0
		forca.src = 'Imagens/forca.png'
		let btn = document.querySelectorAll(".btn")
		for (let i = 0; i < btn.length; i++) {
			btn[i].removeAttribute('disabled');	
		}

		let teclado = document.querySelectorAll('.btn')
		for (let i = 0; i < teclado.length; i++) {
			teclado[i].style.backgroundColor = 'white'
		}
		PalavraEscolhida = ""
		arrayPalavraEscolhida = ""
		let espacos = document.querySelectorAll('.espaco')
		for (let i = 0; i < espacos.length; i++) {
			letras.remove(espacos[i])
		}
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
		letras = document.createElement('div')
		letras.setAttribute('class', 'caixa-letras')
		jogo.appendChild(letras)
		if (arrayPalavraEscolhida != "") {
			for (let i = 0; i != arrayPalavraEscolhida.length; i++) {
				let espaco = document.createElement('p')
				espaco.innerHTML = `<p class='espaco' id='espa'></p>`
				letras.appendChild(espaco)
			}
		}
	},
	preenchimento(procura, id) {
		let novo = []
		var cor = document.getElementById(id.toUpperCase())
		let campos = document.querySelectorAll('.espaco')
		if (procura && cor.style.backgroundColor != '#92C792' && cor.style.backgroundColor != 'red' && vida != 0 && end != arrayPalavraEscolhida.length)  
		{
			
			function obtendoIndex(element, index) {
				if (element === id) {
					novo.push(index)
				}
			}
			arrayPalavraEscolhida.forEach(obtendoIndex);
			for (let i = 0; i < novo.length; i++) {
				campos[novo[i]].innerHTML = id
				end++
			}
			cor.style.backgroundColor = "#92C792";
			// Travando letras que ja foram usadas
		} else if (cor.style.backgroundColor == '#92C792' || cor.style.backgroundColor == 'red' || vida <= 0) {
			return;
			// Redução de vida e chamada de verificação da derrota
		}else {
			vida = vida - 1
			vidas.innerHTML = vida
			if (vida == 5) {
				forca.src = 'Imagens/forca1.png'
			} else if (vida == 4) {
				forca.src = 'Imagens/forca2.png'
			} else if (vida == 3) {
				forca.src = 'Imagens/forca3.png'
				vidas.style.color = 'yellow'
			} else if (vida == 2) {
				forca.src = 'Imagens/forca4.png'
				vidas.style.color = 'red'
			} else if (vida == 1) {
				forca.src = 'Imagens/forca5.png'
			} else if (vida == 0) {
				forca.src = 'Imagens/forca6.png'
				Game.fimDeJogo()
			}
			cor.style.backgroundColor = "red";
		}
		Game.fimDeJogo()
	},
	fimDeJogo() {
		let btn = document.querySelectorAll(".btn")
		if (vida == 0) {
			for (let i = 0; i < btn.length; i++) {
				btn[i].setAttribute('disabled', 'disabled');	
			}
			vidas.innerHTML = 'Fim do jogo, você perdeu.'
		}else if(end == arrayPalavraEscolhida.length){
			for (let i = 0; i < btn.length; i++) {
				btn[i].setAttribute('disabled', 'disabled');	
			}	
			vidas.innerHTML = 'Fim do jogo, você venceu.'
			vidas.style.color = 'green'
		}else {
			return;
		}
	},
	verificando(id) {
		id = id.toLowerCase();
		let procura = PalavraEscolhida.split(id).length - 1
		Game.preenchimento(procura, id)
		return procura
	},


}
Game.iniciar()