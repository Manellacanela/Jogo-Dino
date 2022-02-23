document.addEventListener('DOMContentLoaded',()=>{

const dino = document.querySelector('.dino')
const grid = document.querySelector('.grid')
const body = document.querySelector('body')
const alert = document.getElementById('alert')

let jumping = false
let gravity = 0.9
let gameo = false
let dinopy = 0

function jumpcontrol(tecla){
	if(tecla.keyCode == 32){
		if(jumping == false){
			jumping = true;
			jump();
		}
	}
}

document.addEventListener('keyup',jumpcontrol)

function jump(){
	let count = 0;
	// setInterval(função,tempo)
	let timerId = setInterval(function(){

	// caindo
	if(count == 15){
		clearInterval(timerId)
		let downTimerId = setInterval(function(){
			if(count == 0){
				clearInterval(downTimerId)
				jumping = false
			}
			dinopy -= 5
			count = count - 1
			dinopy = dinopy * gravity
			dino.style.bottom = dinopy + 'px'
		},20)
	}

	// subida
	dinopy += 30
	count = count + 1
	dinopy = dinopy * gravity
	dino.style.bottom = dinopy + 'px'
	},20)


}

function gerarobst(){
	let randomTime = Math.random() * 4000
	let obstaclepx = 1400
	const obstacle = document.createElement('div')

	if(gameo == false){
		obstacle.classList.add('obstacle')
	}
	grid.appendChild(obstacle)
	obstacle.style.left = obstaclepx + 'px'

	let timerId = setInterval(function(){
		if(obstaclepx > 0 && obstaclepx < 60 && dinopy < 60){
			clearInterval(timerId)
			alert.innerHTML = 'fim de jogo'
			gameo = true
			// Remover todas as cópias
			body.removeChild(body.firstChild)
			while(grid.firstChild){
				grid.removeChild(grid.lastChild)
			}
		}
		obstaclepx -= 10
		obstacle.style.left = obstaclepx + 'px'
	},20)

	if(!gameo){
		setTimeout(gerarobst,randomTime)
	}

}

gerarobst()

})