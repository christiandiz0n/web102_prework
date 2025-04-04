/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
function addGamesToPage(games) {

    for(let i = 0; i < games.length; i++){
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h1>${games[i].name}</h1>
            <p>Description: ${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");
    const totalContributions = GAMES_JSON.reduce( (accumulator, currentVal) => {
        return accumulator + currentVal.backers;
    }, 0);

    contributionsCard.textContent = totalContributions;

const raisedCard = document.getElementById("total-raised");
    const totalRaised = GAMES_JSON.reduce( (accumulator, currentVal) => {
        return accumulator + currentVal.pledged;
    }, 0);

    raisedCard.textContent = '$' + totalRaised.toLocaleString('en-US');

const gamesCard = document.getElementById("num-games");
    const totalGames = GAMES_JSON.reduce ( (accumulator) => {
        return accumulator + 1;
    }, 0);

    gamesCard.textContent = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {

    deleteChildElements(gamesContainer);

    let notmetGoal = GAMES_JSON.filter ((funding) => {
        return funding.pledged < funding.goal;
    });

    addGamesToPage(notmetGoal);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    
    let metGoal = GAMES_JSON.filter ((funding) => {
        return funding.pledged >= funding.goal;
    });

    addGamesToPage(metGoal);
}


function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
const totalUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, ${totalUnfunded} ${totalUnfunded === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;

const para = document.createElement("p");
para.textContent = displayStr;
descriptionContainer.appendChild(para);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, d3estructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  [...GAMES_JSON].sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [{name: item1}, {name: item2}] = sortedGames;

const firstGameElement = document.createElement("p");
firstGameElement.textContent = item1;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.textContent = item2;
secondGameContainer.appendChild(secondGameElement);