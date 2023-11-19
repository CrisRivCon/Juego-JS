var cuerpo = document.getElementById('cuerpo');
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let ruta = "/spanish";
let arrayPalabras;

function crearTabla(filas, columnas, palabras) {
    let table = document.createElement('table');

    for ( i = 0; i < filas; i++) {
        let tr = document.createElement('tr');

        for ( j = 0; j < columnas; j++){
            let td = document.createElement('td');
            td.textContent = ABC[Math.trunc(Math.random() *  ABC.length)];
            tr.append(td);            
        }

        table.append(tr);
    }

    cuerpo.append(table);
}

// ******************************************************************
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

function formarLetras(filas, columnas, palabras) {
    // TODO: crear array de filas x columnas y meter las palabras y en los huecos libres letras random. 
}


//let elegidas = elegirPalabras(5, arrayPalabras);
//console.log(elegidas);

let elegidas = [ "tripular", "agramontés", "arraz", "esculta", "defectuosa" ];


crearTabla(10, 15, elegidas);