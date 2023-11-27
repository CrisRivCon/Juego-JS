var contenedorTabla = document.getElementById('tabla');
var contenedorLista = document.getElementById('lista');
var botonComprobar = document.getElementById('comprobar');
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
let ruta = "/spanish";
let arrayPalabras;
let listaDeAcertadas = [];
var filas = 10;
var columnas = 15;
var longitudPalabra = 6; // Longitud máxima de las palabras que aparecerán

function crearTabla(filas, columnas, palabras) {
    let table = document.createElement('table');
    let letras = palabras.slice();
    for ( i = 0; i < filas; i++) {
        let tr = document.createElement('tr');

        for ( j = 0; j < columnas; j++){
            let td = document.createElement('td');
            td.setAttribute('id', i.toString() + j );
            td.addEventListener('mousedown', seleccionarLetra);
            td.textContent = letras[i][j];
            //td.setAttribute('disable', '');
            tr.append(td);            
        }

        table.append(tr);
    }

    contenedorTabla.append(table);
}
// ****************************************************************************
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from
//*******************************************************************************

function crearPosiciones(filas, columnas, palabras) {
    let posiciones = [];
    let posicionPalabra;
    let lonPalabra;
    let rangoFilas = range(0, filas, 1);

    palabras.forEach(palabra => {
        posicionPalabra = [];
        palabraNormalizada = palabra;
        lonPalabra = palabraNormalizada.length;
        let posicionLetraC = Math.trunc(Math.random() * (columnas - lonPalabra));
        let posicionLetraF = Math.trunc(Math.random() * (filas - lonPalabra));

        //if ( palabras.indexOf(palabra) % 2 == 0 ) {
            // Horizontal
        for (let i = 0; i < lonPalabra; i++){
           posicionPalabra.push([rangoFilas[posicionLetraF], (posicionLetraC + i)]); 
        }
        posiciones.push(posicionPalabra);
        //}
        rangoFilas.splice(posicionLetraF, 1);
    });
    return posiciones;
}

function formarRelleno(filas, columnas, palabras = null) {
    // Crea un array de filas x columnas, mete las palabras y en los huecos libres letras random. 
    let arrayRelleno = [];
    for (i = 0; i <= filas; i++) {
        let letrasFila = [];
        for (j = 0; j <= columnas; j++) {
            letrasFila.push(ABC[Math.trunc(Math.random() *  ABC.length)]);
        }
            arrayRelleno.push(letrasFila);
    }

    let posiciones = crearPosiciones(filas, columnas, palabras);
    let palabrasCopia = palabras.slice();
    for ( i = 0; i < posiciones.length; i ++){
        let palabraDividida = palabrasCopia[i].split('');
        posiciones[i].forEach(posicion =>{
            arrayRelleno[posicion[0]][posicion[1]] = palabraDividida[0];
            palabraDividida.shift();

        });
    }
    /* let elegidas = palabras.slice();
    let palabra = [];
    
    elegidas.forEach(element => { palabra.push(element.split(''))})s
    
    let arrayRelleno = [];
    let unaPalabraPorFila;

    for (i = 0; i <= filas; i++) {
    
        let letrasFila = [];
        unaPalabraPorFila = false;

        for (j = 0; j <= columnas; j++) {
            let random = Math.trunc(Math.random() * columnas);
            if (validarPosicion(palabra, random, columnas, unaPalabraPorFila)) {
                palabra[0].forEach(element => {

                    letrasFila.push(element.toUpperCase());
                    j++;
                });
                unaPalabraPorFila = true;
                palabra.shift();
            } else {
                letrasFila.push(ABC[Math.trunc(Math.random() *  ABC.length)]);
            }
        }
        arrayRelleno.push(letrasFila);
    } */
    return arrayRelleno;
}

/* function validarPosicion(palabra, random, columnas, unaPalabraPorFila = false) {
    return palabra.length > 0 && j >= random && (columnas - j) >= palabra[0].length && !unaPalabraPorFila;
} */

function seleccionarLetra(e) {
    let cuadrado = document.getElementById(e.target.id);
    if (cuadrado.hasAttribute('disable')) {
        return;
    } else {
        cuadrado.classList.add('amarillo');
    }
    // TODO: que seleccione al arrastras
}

// ***************************************************************************
// Lee las palabras del archivo especificado en la ruta y crea arrayPalabras.

var archivo = new XMLHttpRequest();
archivo.open('GET', ruta, false);

archivo.onreadystatechange = function () {
    if(archivo.readyState === 4)
    {
        if(archivo.status === 200 || archivo.status == 0)
        {
            let texto = archivo.responseText;
            arrayPalabras = texto.split('\n');
        }
    }
}
archivo.send(null);
    
        // https://wordcodepress.com/leer-archivo-de-texto-con-javascript/
//**************************************************************************

function elegirPalabras(numero, arrayPalabras) {
    let elegidas = [];

    for (i = 0; i < numero; i++) {
        let palabra = arrayPalabras[Math.trunc(Math.random() * arrayPalabras.length)];
        if (palabra.length < longitudPalabra) {
            elegidas.push(palabra);
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
            escribir(element);
            comprobacion = true;
        }
    });

    if (comprobacion) {
        return true;
    } else {
        return false;
    }
}

function sacarPalabra() {
    let letras = document.getElementsByClassName('amarillo');
    let palabra = '';
    for ( i = 0; i < letras.length; i++) {
        palabra += letras[i].textContent;
    }
    if (compararPalabras(palabrasElegidas, palabra)) {
        colorearAcertada(letras);
        listaPalabras.marcarAcertada(palabra);
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

function escribir(cadena) {
    let p = document.createElement('p');
    p.textContent = cadena
    contenedorLista.append(p);
}

function escribirError(error) {
    
}

botonComprobar.addEventListener('click', sacarPalabra);
let palabrasElegidas = elegirPalabras(5, arrayPalabras);
crearTabla(filas, columnas, formarRelleno(filas, columnas, palabrasElegidas));

// -------------------------------- Manipulación de objetos ---------------------------------
function Palabras(arrayPalabras) {
    this.palabras = arrayPalabras;

    this.escribirPalabras = function (nodo) {
        arrayPalabras.forEach(palabra => {
            let p = document.createElement('p');
            p.textContent = palabra
            p.setAttribute('id', palabra);
            nodo.append(p);
        });
    }

    this.marcarAcertada = function (id) {
        let palaraAcertada = document.getElementById(id);
        palaraAcertada.classList.add('rosa');
    }
}

let listaPalabras = new Palabras(palabrasElegidas);
listaPalabras.escribirPalabras(lista);



//---------------------------------------------------------------------------------------------