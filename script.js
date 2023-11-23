var contenedorTabla = document.getElementById('tabla');
var contenedorLista = document.getElementById('lista');
var botonComprobar = document.getElementById('comprobar');
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
            tr.append(td);            
        }

        table.append(tr);
    }

    contenedorTabla.append(table);
}

function seleccionarLetra(e) {
    let cuadrado = document.getElementById(e.target.id);
    cuadrado.classList.add('amarillo');
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

function formarRelleno(filas, columnas, palabras) {
    // Crea un array de filas x columnas, mete las palabras y en los huecos libres letras random. 
    let elegidas = palabras.slice();
    let palabra = [];
    
    elegidas.forEach(element => { palabra.push(element.split(''))})
    
    let arrayRelleno = [];
    let unaPalabraPorFila;

    for (i = 0; i <= filas; i++) {
    
        let letrasFila = [];
        unaPalabraPorFila = false;

        for (j = 0; j <= columnas; j++) {
            let random = Math.trunc(Math.random() * columnas);
            if (palabra.length > 0 && j >= random && (columnas - j) >= palabra[0].length && !unaPalabraPorFila) {

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
    }
    return arrayRelleno;
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
    } else {
        limpiarNoAcertada(letras);
    }
}



function colorearAcertada(letrasSeleccionadas) {
    while (letrasSeleccionadas.length > 0) {
        letrasSeleccionadas[0].classList.add('verde');
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

botonComprobar.addEventListener('click', sacarPalabra);

let palabrasElegidas = elegirPalabras(5, arrayPalabras);
console.log(palabrasElegidas);


let arrayRelleno = formarRelleno(filas, columnas, palabrasElegidas);

crearTabla(filas, columnas, arrayRelleno);