// caching DOM elements
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

const creatureName = document.querySelector(".name");
const creatureId = document.querySelector(".output .id");
const weight = document.querySelector(".weight");
const height = document.querySelector(".height");
const typesContainer = document.querySelector(".types");
const specialName = document.querySelector(".special-name");
const description = document.querySelector(".description");

const BASE_STATS = ['hp', 'attack', 'defence', 'special-attack', 'special-defence', 'speed']

const STATS_COLOR = {
  fire: '#f87171',
  water: '#60a5fa',
  grass: '#4ade80',
  electric: '#facc15',
  rock: '#a8a29e',
  poison: '#a78bfa',
}

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const searchValue = searchInput.value.trim();
  if (!searchValue.length) return;

  try {
    const creature = await fetchAPI(searchValue);
    if (!creature) return;

    console.log(creature);
    updateUI(creature);
  } catch (error) {
    console.error('error: ', error);
  }
})


async function fetchAPI(searchValue) {
  try{
    const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${searchValue}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return null;
  }
}

function fillStatus(stats) {
  if (!stats.length) return;
  BASE_STATS.forEach((stat, index) => {
    const statEl = document.querySelector(`#${stat}`);
    statEl.textContent = stats[index].base_stat;
  })
}

function updateUI(creature) {
  creatureName.textContent = creature.name;
  creatureId.textContent = `#${creature.id}`;
  height.textContent = `Height: ${creature.height}`;
  weight.textContent = `Weight: ${creature.weight}`;
  renderTypes(creature.types);
  specialName.textContent = creature.special.name;
  description.textContent = creature.special.description;

  fillStatus(creature.stats);
}

function renderTypes(typeslist) {
  if (!typeslist.length) return;
  
  typesContainer.innerHTML = '';
  typeslist.map(t => {
    return typesContainer.innerHTML += `<li class="type p-2 bg-[${STATS_COLOR[t.name.toLowerCase()]}] border border-solid border-slate-600">${t.name.toUpperCase()}</li>`}).join("");
  }

// function getColor(type) {
//   return STATS_COLOR[type.toLowerCase()]
// }
//const API_KEY = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

