var cuerpo = document.getElementById('cuerpo');
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let ruta = "/spanish";
let arrayPalabras;
let resultado;

function crearTabla(filas, columnas, palabras) {
    let table = document.createElement('table');
    let letras = palabras.slice();
    for ( i = 0; i < filas; i++) {
        let tr = document.createElement('tr');

        for ( j = 0; j < columnas; j++){
            let td = document.createElement('td');
            td.setAttribute('id', i.toString() + j);
            td.addEventListener('click', (e) => {
                console.log(e);
            });
            td.textContent = letras[i][j];
            tr.append(td);            
        }

        table.append(tr);
    }

    cuerpo.append(table);
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
        elegidas.push(arrayPalabras[Math.trunc(Math.random() * arrayPalabras.length)]);
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
    palabrasElegidas.forEach(element => {
        if (element == palabra) {
            resultado.push(element);
        }
    });
}

let palabrasElegidas = elegirPalabras(5, arrayPalabras);
console.log(palabrasElegidas);


let arrayRelleno = formarRelleno(10, 15, palabrasElegidas);

crearTabla(10, 15, arrayRelleno);