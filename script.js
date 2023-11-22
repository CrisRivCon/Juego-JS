var contenedorTabla = document.getElementById('tabla');
var contenedorLista = document.getElementById('lista');
var botonComprobar = document.getElementById('comprobar');
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let ruta = "/spanish";
let arrayPalabras;
let resultado = [];

function crearTabla(filas, columnas, palabras) {
    let table = document.createElement('table');
    let letras = palabras.slice();
    for ( i = 0; i < filas; i++) {
        let tr = document.createElement('tr');

        for ( j = 0; j < columnas; j++){
            let td = document.createElement('td');
            td.setAttribute('id', i.toString() + j );
            td.addEventListener('mousedown', (e) => {
                let cuadrado = document.getElementById(e.target.id);
                cuadrado.classList.add('amarillo');
                // TODO: que seleccione al arrastras
            });
            td.textContent = letras[i][j];
            tr.append(td);            
        }

        table.append(tr);
    }

    contenedorTabla.append(table);
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
        if (palabra.length > 5) {
        elegidas.push(palabra);
        } else {
            i--;
        }
    }
    return elegidas;
}

function formarRelleno(filas, columnas, palabras) {
    // TODO: crear array de filas x columnas y meter las palabras y en los huecos libres letras random. 
    let elegidas = palabras.slice();
    let prueba = [];
    
    elegidas.forEach(element => { prueba.push(element.split(''))})
    
    let arrayRelleno = [];

    for (i = 0; i <= filas; i++) {
    
        let nuevoArra = [];

        for (j = 0; j <= columnas; j++) {
            let random = Math.trunc(Math.random() * columnas);
            if (prueba.length > 0 && j >= random && (columnas - j) >= prueba[0].length) {
                prueba[0].forEach(element => {
                    nuevoArra.push(element.toUpperCase());
                    j++;
                });
                prueba.shift();
            } else {
                nuevoArra.push(ABC[Math.trunc(Math.random() *  ABC.length)]);
            }
        }
        arrayRelleno.push(nuevoArra);
    }
    return arrayRelleno;
}

function compararPalabras(palabrasElegidas, palabra) {
    let comprobacion;
    palabrasElegidas.forEach(element => {
        console.log(palabra);
        if (element.toLowerCase() == palabra.toLowerCase()) {
            resultado.push(element);
            escribir(element);
            console.log('si es igual');
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
    console.log(compararPalabras(palabrasElegidas, palabra));
    if (compararPalabras(palabrasElegidas, palabra)) {
        verifica(letras);
    }
}

function verifica(letras) {
    console.log(letras);
    for ( i = 0; i < letras.length; i++) {
        letras[i].classList.add('verde');
    }
    for ( i = 0; i < letras.length; i++) {
        letras[i].classList.remove('amarillo');
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


let arrayRelleno = formarRelleno(10, 15, palabrasElegidas);

crearTabla(10, 15, arrayRelleno);