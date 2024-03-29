const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'

let id 
let LIST

/*
$ ********** Creacion de fecha  **********
*/

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-AR', {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
	year:'numeric'
})

/*
$ ********** funcion Agregar Tarea **********
*/

function agregarTarea(tarea, id, realizado, eliminado) {
	if (eliminado) return

	const REALIZADO = realizado ? check : uncheck
	const LINE = realizado ? lineThrough : ''

	const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}" >${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
	lista.insertAdjacentHTML('beforeend', elemento)
}

/*
$ ********** funcion Tarea Realizada **********
*/

function tareaRealizada(element) {
	element.classList.toggle(check)
	element.classList.toggle(uncheck)
	element.parentNode.querySelector('.text').classList.toggle(lineThrough)
	LIST[element.id].realizado = LIST[element.id].realizado ? false : true //Si
	/* 
	console.log(LIST)
	console.log(LIST[element.id])
	console.log(LIST[element.id].realizado) 
	*/
}

/*
$ ********** funcion Tarea Eliminada **********
*/

function tareaEliminada(element) {
	console.log(element.parentNode.parentNode)
	console.log(element.parentNode)
	element.parentNode.parentNode.removeChild(element.parentNode)
	LIST[element.id].eliminado = true
	/* 
	console.log(LIST)
	*/
}

/*
$ ********** Boton de Agregar Tarea **********
*/

botonEnter.addEventListener('click', () => {
	const tarea = input.value
	if (tarea) {
		agregarTarea(tarea, id, false, false)
		LIST.push({
			nombre: tarea,
			id: id,
			realizado: false,
			eliminado: false,
		})
	}
	localStorage.setItem('ToDo', JSON.stringify(LIST))
	input.value = ''
	id++
	console.log(LIST)
})

document.addEventListener('keyup', function (event) {
	if (event.key == 'Enter') {
		const tarea = input.value
		if (tarea) {
			agregarTarea(tarea, id, false, false)
			LIST.push({
				nombre: tarea,
				id: id,
				realizado: false,
				eliminado: false,
			})
		}
		localStorage.setItem('ToDo', JSON.stringify(LIST))

		input.value = ''
		id++
		console.log(LIST)
	}
})

/*
$ ********** Actualización Check de Lista **********
*/

lista.addEventListener('click', function (event) {
	const element = event.target
	const elementData = element.attributes.data.value
	/* 
	console.log(element)
	console.log(element.attributes)
	console.log(element.attributes.data)
	console.log(element.attributes.data.value) 
	*/
	if (elementData === 'realizado') {
		tareaRealizada(element)
	} else if (elementData === 'eliminado') {
		tareaEliminada(element)
	}
	localStorage.setItem('ToDo', JSON.stringify(LIST))
})

/*
$ ********** LocalStorage getItem **********
*/

let data = localStorage.getItem('ToDo')
if (data) {
	LIST = JSON.parse(data)
	console.log(LIST)
	id = LIST.length
	cargarLista(LIST)
} else {
	LIST = []
	id = 0
}

function cargarLista(array) {
	array.forEach(function (item) {
		agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
	})
}