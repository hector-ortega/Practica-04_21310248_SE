// Personajes, armas y locaciones
const characters = [
    { name: "Sr. Esponja", pista:["Se sospecha que fue alguien muy molesto...", "Alguien vio una figura amarilla y cuadrada muy cerca del cuerpo de Gary justo antes de que desapareciera."]},
    { name: "Sr. Patricio", pista:["A juzgar por las pistas no fue alguien muy listo...","Se encontraron huellas de estrellas de mar cerca de la escena del crimen… ¿será que Patricio estuvo ahí?"] },
    { name: "Sra. Arenita", pista:["Parece ser que fue alguien muy calculador y cuidadoso...","Quedaron algunas bellotas y polvo de su traje de astronauta en el suelo cerca de la escena del crimen."] },
    { name: "Sr. Calamardo", pista:["Todo apunta a alguien que siembre está de mal humor...","par de tentáculos dejaron rastros cerca de la zona del crimen."]},
    { name: "Sr. Plankton", pista:["Todos dicen que era un pequeño enemigo de la victima...","Se encontró una marca sospechosa de pisada pequeña y verde…"]}
];

const weapons = [
    { name: "Espatula", pista:["Las pistas muestran que El objeto usado se encuentra en la cocina", "Se encontraron restos de Cangreburgers esparcidos por la zona. Una espatula gigante pudo haber sido usada para removerlos." ]},
    { name: "Clarinete", pista:["Es un instrumento muy inusual para hacer un asesinato","Un extraño ruido musical se escuchó antes del incidente, como si un clarinete estuviera siendo usada." ]},
    { name: "Cangreburguer", pista:["Utilizaron su aficion a la comida como su debilidad para asesinarlo", "Restos de veneno se encontraron en la cangreburgues que se mandó a analizar en laboratorio." ]},
    { name: "Coco", pista: ["La unica forma de que lo haya matado es que le haya caido del cielo...","Parece ser que al sujeto le pegaron en la ingle con un coco, que puedese este la causa de fallecimiento"]}, 
    { name: "Red de Medusas", pista: ["Parece ser que el sujeto era cazador de medusas por deporte...","Una red rota fue encontrada en el lugar del robo… alguien quizás atrapó algo más que medusas."]}
];

const locations = [
    { name: "Crustaceo Cascarudo", pista: ["Cometieron el crimen en un lugar concurrido para ocultar sus pistas...","Unas monedas fuera del restaurante parecen indicar que alguien estuvo rondando por ahí" ]},
    { name: "Balde de Carnada", pista: ["Parece ser que lo llevaron al lugar con un engaño o alguna carnada, coincidencia?...","Un olor extraño y partes mecánicas en el suelo apuntan al Balde de Carnada."]},
    { name: "Casa de Bob", pista: ["Un lugar conocido para la victima... seguro lo tomo por sorpresa", "Hay burbujas que conducen directamente hacia la piña en la calle Concha."]},
    { name: "Casa de Patricio", pista: ["Nadie se le ocurriria buscar debajo de las piedras...","Cerca de una roca hay huellas que indican que el cimen se cometió aquí"]},
    { name: "Santuario de medusas", pista:["A la victima la llevaron a un lugar muy lejano, pesnando que nadie iría tan lejos...", "Marcas de ancla y arena sugieren que algo importante sucedió en el santuario"]}
];

// Inicializar las variables de juego
let chances = 5;
let indiceAleatorio1, indiceAleatorio2, indiceAleatorio3;

// Función para iniciar el juego
function startGame() {
    indiceAleatorio1 = Math.floor(Math.random() * locations.length);
    indiceAleatorio2 = Math.floor(Math.random() * locations.length);
    indiceAleatorio3 = Math.floor(Math.random() * locations.length);

    solution = {
        character: characters[indiceAleatorio1,indiceAleatorio1],
        weapon: weapons[indiceAleatorio2],
        location: locations[indiceAleatorio3]
    };

    const newCharacters = characters.filter((_, index) => index !== indiceAleatorio1);
    const newWeapons = weapons.filter((_, index) => index !== indiceAleatorio2);
    const newLocations = locations.filter((_, index) => index !== indiceAleatorio3);

    console.log("Solucion", solution);

    console.log("Indice 1", indiceAleatorio1);
    console.log("Indice 2", indiceAleatorio2);
    console.log("Indice 3", indiceAleatorio3);

     // Imprimir los nuevos arrays
     console.log("Nuevos personajes:", newCharacters);
     console.log("Nuevas armas:", newWeapons);
     console.log("Nuevas locaciones:", newLocations);
     console.log("Solución:", solution); // Solo para verificar la solución en la consola

    // Reiniciar las oportunidades

    chances = 5;
    document.getElementById('chances').innerText = `Oportunidades restantes: ${chances}`;
    document.getElementById('infoText').innerText = "";
    document.getElementById('deductionSection').classList.add('hidden'); // Ocultar sección de deducción al inicio


     // Habilitar todos los botones de nuevo
     const buttons = document.querySelectorAll(".button");
     buttons.forEach(button => {
         button.classList.remove('disabled');
         button.disabled = false;
     });


}

// Función para obtener información basada en la selección del jugador
function getInfo(type, index) {
    if (chances <= 0) {
        return; // No más oportunidades
    }

    let info = "";
    // Comprobar el tipo de información solicitada
    switch (type) {
        case 'character':
            if (characters[index].name === solution.character.name) {
                info = `${characters[index].pista[1]}`;/*`${characters[index].name} fue visto saliendo de ${solution.location.name}, parecía muy nervioso.`;*/
            } else {
                info = `${characters[index].name} no estaba cerca de la escena del crimen. \n ${characters[indiceAleatorio1].pista[0]}`;
            }
            break;
        case 'weapon':
            if (weapons[index].name === solution.weapon.name) {
                info = `${weapons[index].pista[1]}`;
            } else {
                info = `La ${weapons[index].name} no tiene relación con el crimen. \n${weapons[indiceAleatorio2].pista[0]}`;
            }
            break;
        case 'location':
            if (locations[index].name === solution.location.name) {
                info = `${locations[index].pista[1]}`;
            } else {
                info = `La ${locations[index].name} no tiene ninguna prueba relevante.\n ${locations[indiceAleatorio3].pista[0]}`;
            }
            break;
    }

    // Mostrar la información en la interfaz
    document.getElementById('infoText').innerText = info;
    // Reduzca las oportunidades restantes
    chances--;
    document.getElementById('chances').innerText = `Oportunidades restantes: ${chances}`;
    
    // Deshabilitar botón después de usarlo
    const buttonId = `${type}${index + 1}`;
    document.getElementById(buttonId).classList.add('disabled');
    document.getElementById(buttonId).disabled = true;

    // Si se terminan las oportunidades, mostrar la deducción final
    if (chances === 0) {
        document.getElementById('infoText2').innerText = "No tienes más oportunidades. Haz tu deducción.";
        document.getElementById('infoText2').classList.remove('hidden');
        document.getElementById('deductionSection').classList.remove('hidden');
    }
}

// Función para hacer la deducción final
function makeDeduction() {
    const character = document.getElementById('deductionCharacter').value;
    const weapon = document.getElementById('deductionWeapon').value;
    const location = document.getElementById('deductionLocation').value;

    if (character === solution.character.name && weapon === solution.weapon.name && location === solution.location.name) {
        alert("¡Felicidades! Has resuelto el misterio correctamente.");
    } else {
        alert("Incorrecto. La solución era: " + 
              `Personaje: ${solution.character.name}, ` + 
              `Arma: ${solution.weapon.name}, ` + 
              `Locación: ${solution.location.name}`);
    }

    // Reiniciar el juego
    startGame();
}

// Llamar a startGame al cargar la página
startGame();