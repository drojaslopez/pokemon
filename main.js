
const equipo1 = [
  {
    nombre: "pokemon",
    tipo: "Agua",
    nivel: 95,
    poderes: ["ataque", "ataque2", "ataque3", "ataque4"],
  },
  {
    nombre: "pokemon2",
    tipo: "Tierra",
    nivel: 15,
    poderes: ["ataque5", "ataque6", "ataque7", "ataque8"],
  },
  {
    nombre: "pokemon3",
    tipo: "Fuego",
    nivel: 20,
    poderes: ["ataque9", "ataque10", "ataque11"],
  },
  {
    nombre: "pokemon4",
    tipo: "Planta",
    nivel: 95,
    poderes: ["ataque12", "ataque13", "ataque14", "ataque15"],
  },
  {
    nombre: "pokemon5",
    tipo: "Siquico",
    nivel: 95,
    poderes: ["ataque16", "ataque17", "ataque18"],
  },
  {
    nombre: "pokemon6",
    tipo: "Agua",
    nivel: 95,
    poderes: ["ataque19", "ataque20"],
  },
];

const equipo2 = [
  {
    nombre: "pokemon",
    tipo: "Agua",
    nivel: 95,
    poderes: ["ataque", "ataque2", "ataque3", "ataque4"],
  },
  {
    nombre: "pokemon2",
    tipo: "Tierra",
    nivel: 15,
    poderes: ["ataque", "ataque2", "ataque3", "ataque4", "ataque5"],
  },
  {
    nombre: "pokemon3",
    tipo: "Fuego",
    nivel: 20,
    poderes: ["ataque", "ataque2", "ataque3"],
  },
  {
    nombre: "pokemon4",
    tipo: "Fuego",
    nivel: 95,
    poderes: ["ataque", "ataque2", "ataque3", "ataque4"],
  },
  {
    nombre: "pokemon5",
    tipo: "Siquico",
    nivel: 95,
    poderes: ["ataque", "ataque2", "ataque3"],
  },
  { nombre: "pokemon6", tipo: "Agua", nivel: 95, poderes: [] },
  {
    nombre: "pokemon6",
    tipo: "Agua",
    nivel: 95,
    poderes: ["ataque", "ataque5"],
  },
];

async function validarEquipo(equipo) {
  const obtenerValidad  = await  validarCantidadEquipo(equipo);
  const obtenerValidad2 = await  validarPoderPokemones(equipo);
  const obtenerValidad3 = await  validarTiposPokemones(equipo);  
  const obtenerValidad4 = await  validarPoderesPokemon(equipo);  
  const obtenerValidad5 = await  validarPoderesEnComunEntrePokemones(equipo);
  const obtenerValidad6 = await  validarPokemonesRepetido(equipo);

  if (obtenerValidad && obtenerValidad2 && obtenerValidad3 && obtenerValidad4 && obtenerValidad5 &&obtenerValidad6 ) {
    console.log("Equipo Valido");
  } else {
    console.log("Equipo No Valido");
  }
}

function validarCantidadEquipo(equipo) {
  //console.log("validarCantidadEquipo");
  if (equipo.length == 6) {
    return true;
  } else {
    console.log("Equipo con cantidad distinta a 6: " + equipo.length);
    return false;
  }
}
function validarPoderPokemones(equipo) {
  //console.log("validarPoderPokemones");
  equipo.forEach((pokemon) => {
    if (pokemon.nivel > 100 || pokemon.nivel < 0)
      console.log("Nivel de pokemon fuera de los rango: " + pokemon.nivel);
    return false;
  });
  return true;
}

function validarPokemonesRepetido(equipo) {
  //console.log("validarPokemonesRepetido");
  equipo.forEach((pokemon) => {
    const equipoMuestra = removerPokemon(pokemon, equipo);
    if (contienePokemon(pokemon, equipoMuestra))
      console.log("Pokemon Repetido: " + pokemon.nombre);
    return false;
  });
  return true;
}

function removerPokemon(pokemon, pokemones) {
  const index = pokemones.indexOf(pokemon);
  if (index > -1) {
    pokemones.splice(index, 1);
    return pokemones;
  }
}

function contienePokemon(pokemon, pokemones) {
  var i;
  for (i = 0; i < pokemones.length; i++) {
    const pokemonComparativa = pokemones[i];
    if (pokemonComparativa.nombre === pokemon.nombre) {
      return true;
    }
  }
  return false;
}

function validarPoderesPokemon(equipo) {
  //console.log("validarPoderesPokemon");
  pokemonesNoValidos = 0;
  equipo.forEach((pokemon) => {
    if (validarCantidadDePoderesPokemon(pokemon)) {
      pokemonesNoValidos = pokemonesNoValidos + 1;
    }
  });
  if (pokemonesNoValidos > 0) {
    return false;
  } else {
    return true;
  }
}

function validarCantidadDePoderesPokemon(pokemon) {
  if (pokemon.poderes.length > 4 || pokemon.poderes.length < 1) {
    console.log(
      "Pokemon con poderes numero de poderes fuera de rango :" +
        pokemon.poderes.length
    );
    return true;
  } else {
    return false;
  }
}

function validarTiposPokemones(equipo) {
  //console.log("validarTipoPokemones");
  const tiposPokemon = [];
  const elementoPrimario = ["Agua", "Fuego", "Planta"];
  equipo.forEach((pokemon) => {
    tiposPokemon.push(pokemon.tipo);
  });
  const contiene = elementoPrimario.every((ai) => tiposPokemon.includes(ai));
  if (!contiene)
    console.log("Equipo no cumple con tener a los pokemones primario");
  return contiene;
}

function validarPoderesEnComunEntrePokemones(equipo) {
   pokemonesNoValidos = 0;
  equipo.forEach((pokemon) => {
    const equipoMuestra = removerPokemon(pokemon, equipo);
    const resultadoComparacion = comparaPokemonesPoderes(pokemon, equipoMuestra)
    if (resultadoComparacion>0) { 
      pokemonesNoValidos = pokemonesNoValidos + 1;
    }
  });
  if (pokemonesNoValidos > 0) {
    console.log("Pokemones con poderes repetidos");
    return false;
  }
  return true;
}

function comparaPokemonesPoderes(pokemon, equipo) {
  
   cantidadRepeticiones = 0 ;
  const poderes1 = pokemon.poderes;
  equipo.forEach((pokemonComparar) => {
    poderes2 = pokemonComparar.poderes;
    if( compararPoderes(poderes1, poderes2)){   
        cantidadRepeticiones = cantidadRepeticiones + 1;
    }
  });
  return cantidadRepeticiones;
}

function compararPoderes(poderesPrincipal, poderesComparador) {
  cantidadPoderesRepetidos = 0;
  poderesPrincipal.forEach((poder) => {
    if (poderesComparador.some((data) => data === poder)) {
      cantidadPoderesRepetidos = cantidadPoderesRepetidos + 1;
    }
  });
  if (cantidadPoderesRepetidos > 2) {
    return true;
  } else {
    return false;
  }
}

/*
Se pasa por argumento el equipo, 
equipo1 es un equipo valido, equipo2 no es un equipo valido en donde te presenta cual es la causa que no cumple 
*/
validarEquipo(equipo);