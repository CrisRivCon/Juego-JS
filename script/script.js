var contenedorTabla = document.getElementById('tabla');
var contenedorLista = document.getElementById('lista');
var contenedorMarcador = document.getElementById('marcador');
var botonComprobar = document.getElementById('comprobar');
var botonResetear = document.getElementById('resetear');
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var ruta = "spanish";
var arrayPalabras;
var listaDeAcertadas = [];
var posiblesSelect = [];
var filas = 10;
var columnas = 15;
var longitudPalabra = 8; // Longitud máxima de las palabras que aparecerán
var numPalabras = 10; // Número de palabras a buscar en la sopa de letras
var numHorizontales = 5; // Número de palabras que se pondrán horizontales, el resto en vertical.

var desdeServidor = confirm('¿Estás ejecutando "Sopa de letras" desde un servidor?');
if (desdeServidor) {
    // ***************************************************************************
    // Lee las palabras del archivo especificado en la ruta y da valores a arrayPalabras.

    var archivo = new XMLHttpRequest();
    archivo.open('GET', ruta, false);

    archivo.onreadystatechange = function () {
        if (archivo.readyState === 4) {
            if (archivo.status === 200 || archivo.status == 0) {
                let texto = archivo.responseText;
                arrayPalabras = texto.split('\n');
            }
        }
    }
    archivo.send(null);

    // https://wordcodepress.com/leer-archivo-de-texto-con-javascript/
    //**************************************************************************
} else {
    arrayPalabras = ["cancín", "villar", "algo", "bizaza", "púdico", "persa", "bilma", "pura", "pingar", "trío",
        "pollez", "nicena", "boy", "ecarté", "retobo", "bosta", "roel", "bribar", "empino", "huiche",
        "etano", "horcón", "amén", "altea", "tésera", "figura", "tesura", "chirca", "rudo", "erizar",
        "dedo", "osca", "visita", "chaco", "bigote", "bentos", "gomer", "embaír", "roer", "ártica"];
}

function crearTabla(filas, columnas, palabras) {
    let table = document.createElement('table');
    let letras = palabras.slice();
    for (i = 0; i < filas; i++) {
        let tr = document.createElement('tr');

        for (j = 0; j < columnas; j++) {
            let td = document.createElement('td');
            td.setAttribute('id', i.toString() + j);
            td.addEventListener('mousedown', seleccionarLetra);
            td.textContent = letras[i][j].toUpperCase();
            tr.append(td);
        }

        table.append(tr);
    }

    contenedorTabla.append(table);
}

function crearPosiciones(filas, columnas, palabras) {
    let posiciones = [];
    let posicionPalabra;
    let lonPalabra;
    let contadorHorizontales = 0;

    while (palabras.length > 0) {
        let palabra = palabras[0];
        posicionPalabra = [];
        lonPalabra = palabra.length;
        let col = Math.trunc(Math.random() * columnas);
        let fila = Math.trunc(Math.random() * filas);
        try {
            if (contadorHorizontales < numHorizontales) { // Posiciones de palabras en horizontal 
                if ((columnas - col) > lonPalabra) {
                    for (let i = 0; i < lonPalabra; i++) {
                        posiciones.forEach(posicion => {
                            for (j = 0; j < posicion.length; j++) {
                                if (posicion[j][0] == fila && posicion[j][1] == col + i) {
                                    throw 'error'; // Si coincide la posición de la fila y la columna lanza un error.
                                }
                            }
                        });
                        posicionPalabra.push([fila, col + i, palabra[i]]);
                    }
                    contadorHorizontales++;
                } else {
                    throw 'error';
                }
            } else { // Posiciones de palabras en vertical
                if ((filas - fila) > lonPalabra) {
                    for (let i = 0; i < lonPalabra; i++) {
                        posiciones.forEach(posicion => {
                            for (j = 0; j < posicion.length; j++) {
                                if (posicion[j][0] == fila + i && posicion[j][1] == col) {
                                    throw 'error'; // Si coincide la posición de la fila y la columna lanza un error.
                                }
                            }
                        });
                        posicionPalabra.push([fila + i, col, palabra[i]]);
                    }
                } else {
                    throw 'error';
                }
            }
            palabras.splice(0, 1);
        } catch (error) {
            continue;
        }
        posiciones.push(posicionPalabra);
    }
    return posiciones;
}

function formarRelleno(filas, columnas, palabras = null) {
    let arrayRelleno = [];
    let posiciones = crearPosiciones(filas, columnas, palabras.slice());

    for (let i = 0; i < filas; i++) {
        let letrasFila = [];

        for (let j = 0; j < columnas; j++) {
            letrasFila.push(ABC[Math.trunc(Math.random() * ABC.length)]);

            posiciones.forEach(posicion => {
                for (n = 0; n < posicion.length; n++) {
                    if (posicion[n][0] == i && posicion[n][1] == j) {
                        letrasFila.pop();
                        letrasFila.push(posicion[n][2]);
                    }
                }
            });
        }
        arrayRelleno.push(letrasFila);
    }
    return arrayRelleno;
}

function seleccionarLetra(e) {
    let cuadrado = document.getElementById(e.target.id);

    if (cuadrado.hasAttribute('disable')) {
        return;
    } else {
        cuadrado.classList.toggle('amarillo');
    }
    // TODO: que seleccione al arrastrar
}

function elegirPalabras(numero, arrayPalabras) {
    let elegidas = [];

    for (i = 0; i < numero; i++) {
        let palabra = arrayPalabras[Math.trunc(Math.random() * arrayPalabras.length)];
        if (palabra.length < longitudPalabra) {
            elegidas.push(palabra.trim());
        } else {
            i--;
        }
    }
    return elegidas;
}

function compararPalabras(palabrasElegidas, palabra) {
    let comprobacion;

    palabrasElegidas.forEach(element => {

        if (element.toLowerCase() == palabra.toLowerCase()) {
            listaDeAcertadas.push(element);
            comprobacion = true;
        }
    });

    if (comprobacion) {
        posiblesSelect = [];
        return true;
    } else {
        return false;
    }
}

function sacarPalabra() {
    let letras = document.getElementsByClassName('amarillo');
    let palabra = '';
    for (i = 0; i < letras.length; i++) {
        palabra += letras[i].textContent;
    }
    if (compararPalabras(palabrasElegidas, palabra)) {
        colorearAcertada(letras);
        listaPalabras.marcarAcertada(palabra.toLowerCase());
        listaPalabras.mostrarMarcador(contenedorMarcador);
    } else {
        limpiarNoAcertada(letras);
    }
}

function colorearAcertada(letrasSeleccionadas) {
    while (letrasSeleccionadas.length > 0) {
        letrasSeleccionadas[0].classList.add('verde');
        letrasSeleccionadas[0].setAttribute('disable', '');
        letrasSeleccionadas[0].classList.remove('amarillo');
    }
}

function limpiarNoAcertada(letrasSeleccionadas) {
    while (letrasSeleccionadas.length > 0) {
        letrasSeleccionadas[0].classList.remove('amarillo');
    }
}

function escribir(cadena, elementoDom = null, id = false) {
    let p = document.createElement('p');
    p.textContent = cadena
    if (id) {
        p.setAttribute('id', cadena);
    }
    elementoDom.append(p);
}

function resetear() {
    location.reload()
}

botonComprobar.addEventListener('click', sacarPalabra);
botonResetear.addEventListener('click', resetear);
let palabrasElegidas = elegirPalabras(numPalabras, arrayPalabras);
crearTabla(filas, columnas, formarRelleno(filas, columnas, palabrasElegidas));

// -------------------------------- Manipulación de objetos ---------------------------------
function Palabras(arrayPalabras, palabrasAcertadas = []) {
    this.palabras = arrayPalabras;
    this.acertadas = palabrasAcertadas;

    this.escribirPalabras = function (nodo) {
        arrayPalabras.forEach(palabra => {
            escribir(palabra, nodo, true)
        });
    }

    this.marcarAcertada = function (id) {
        let palaraAcertada = document.getElementById(id);
        palaraAcertada.classList.add('rosa');
        this.acertadas.push(palaraAcertada);
    }

    this.numeroAcertadas = function () {
        return this.acertadas.length;
    }

    this.totalPalabras = function () {
        return this.palabras.length;
    }

    this.mostrarMarcador = function (nodo) {
        if (nodo.hasChildNodes()) {
            nodo.removeChild(nodo.firstChild);
        }
        escribir(this.numeroAcertadas() + '/' + this.totalPalabras(), nodo);
        if (this.numeroAcertadas() == this.totalPalabras()) {
            this.ganar();
        }
    }

    this.ganar = function () {
        alert('Has ganado!');
        resetear();
    }
}

let listaPalabras = new Palabras(palabrasElegidas);
listaPalabras.escribirPalabras(lista);
listaPalabras.mostrarMarcador(contenedorMarcador);
//---------------------------------------------------------------------------------------------