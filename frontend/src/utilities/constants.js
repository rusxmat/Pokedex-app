const pokemonIdNormalEnd = 1010
const specialPokemonIdStart = 10001
const specialPokemonIdEnd = 10271
const totalPokemon = 1281
const statTotalValue = 255

const typeToColor = {
    "bug": ['169', '187', '35'],
    "dark": ["80", "58", "43"],
    "dragon": ["116", "93", "220"],
    "electric": ["250", "185", "20"],
    "fairy": ["243", "179", "243"],
    "fighting": ["121", "52", "28"],
    "fire": ["238", "64", "14"],
    "flying": ["140", "162", "239"],
    "ghost": ["99", "97", "175"],
    "grass": ["111", "192", "51"], 
    "ground": ["209", "176", "85"],
    "ice": ["155", "229", "253"],
    "normal": ["197", "193", "183"], 
    "poison": ["149", "72", "149"],
    "psychic": ["231", "76", "130"],
    "rock": ["185", "166", "94"],
    "steel": ["193", "191", "205"], 
    "water": ["83", "162", "239"]
  };

export {specialPokemonIdEnd, specialPokemonIdStart, pokemonIdNormalEnd, typeToColor, totalPokemon, statTotalValue}