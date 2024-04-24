// Ejercicio Vectores - NSEO 
const fs = require('fs'); 

function getSeniales(filePath) { // Función que retorna las señales de giro leídas
  const data = fs.readFileSync(filePath, 'utf8'); // Método que lee el contenido de un archivo de texto específico
  return data.trim().split('_').map(Number);
}

function getCuadrantes(seniales) { //Función para convertir las señales a cuadrantes -> (Norte, Este, Sur y Oeste) 
  let cuadrantes = [];
  for (let senial of seniales) {
    if (senial < 0) {
      break;
  }
  // Para cada señal, determina el cuadrante correspondiente según los grados:
    let cuadrante = '';
    if (senial <= 45 || senial > 315) {
      cuadrante = 'E';
    } else if (senial > 45 && senial <= 135) {
      cuadrante = 'N';
    } else if (senial > 135 && senial <= 225) {
      cuadrante = 'O';
    } else if (senial > 225 && senial <= 315) {
      cuadrante = 'S';
    }
    cuadrantes.push(cuadrante);
  }
  return cuadrantes.join(' ');
}

function contarCiclosCompletos(cuadrantes) { // Cuenta la cantidad de ciclos completos (las veces que se pasa por los cuatro cuadrantes en sentido horario o antihorario)
  const ciclosCompletos = ['NESO', 'NOSE', 'OSEN', 'ESON', 'SENO', 'SONE', 'ENOS', 'ONES']; // Posibles ciclos completos
  let ciclos = 0;
  let secuenciaStr = cuadrantes.replace(/ /g, "");
  for (let i = 0; i < ciclosCompletos.length; i++) {
    if (secuenciaStr.match(ciclosCompletos[i]) != null) {
      ciclos++;
    }
  }
  return ciclos;
}

function porcentajeOcurrencias(cuadrantes) {  // Cuenta la cantidad de veces que aparece cada cuadrante y calcula el porcentaje en relación al total de cuadrantes en la secuencia
  let secuencia = cuadrantes.replace(/ /g, "");
  const total = secuencia.length; // total 
  const porcentajeN = ((secuencia.match(/N/g)).length / total * 100).toFixed(2);
  const porcentajeS = ((secuencia.match(/S/g)).length / total * 100).toFixed(2);
  const porcentajeE = ((secuencia.match(/E/g)).length / total * 100).toFixed(2);
  const porcentajeO = ((secuencia.match(/O/g)).length / total * 100).toFixed(2);
  return [porcentajeN, porcentajeS, porcentajeE, porcentajeO];
}

function main(filePath) {
  const seniales = getSeniales(filePath);
  const secuencia = getCuadrantes(seniales);
  const ciclos = contarCiclosCompletos(secuencia);
  const porcentajes = porcentajeOcurrencias(secuencia);

  console.log("Señales: "+ seniales.join("_"));
  console.log("Secuencia en letras de los cuadrantes: " + secuencia);
  console.log("Cantidad de ciclos completos: " + ciclos);
  console.log("Porcentaje de ocurrencias de cada cuadrante: \nNorte: " + porcentajes[0] + "%\nSur: " + porcentajes[1] + "%\nEste: " + porcentajes[2] + "%\nOeste: " + porcentajes[3] + "%");
}
const filePath = 'seniales.txt';
main(filePath);