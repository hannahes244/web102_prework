/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
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

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) { // loop over each item in the data
        const div = document.createElement("div"); // create a new div element, which will become the game card
        div.classList.add("game-card"); // add the class game-card to the list
        div.innerHTML = `
            <img class="game-img" src=${games[i].img}>
            <h3 class="game-name">${games[i].name}</h3>
            <p class="game-description">${games[i].description}</p>
            <p class="game-backers">Backers: ${games[i].backers}</p>
        `;
        //<h3 class="game-goal">Goal: $${games[i].goal}</h2>
        //<h4 class="game-pledged">Pledged: $${games[i].pledged}</h2>
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gamesContainer.appendChild(div); // append the game to the games-container
    }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const contributions = GAMES_JSON.reduce( (currnum, game) => { return currnum + game.backers; }, 0);
contributionsCard.innerHTML = `<p>${contributions.toLocaleString('en-US')}</p>`;

// use reduce() to count the number of total contributions by summing the backers

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce( (acc, game) => { return acc + game.pledged; }, 0);
raisedCard.innerHTML = `<p>$${raised.toLocaleString('en-US')}</p>`; // set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter ( (game) => { // use filter() to get a list of games that have not yet met their goal
        return game.pledged < game.goal
    });
    addGamesToPage(unfundedGames); // use the function we previously created to add the unfunded games to the DOM
}

//filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter ( (game) => { // use filter() to get a list of games that have met or exceeded their goal
        return game.pledged >= game.goal;
    });
    addGamesToPage(fundedGames) // use the function we previously created to add unfunded games to the DOM
}
//filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON); // add all games from the JSON data to the DOM
}
//showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const numUnfunded = GAMES_JSON.reduce ((sum, game) => {
return sum + (game.pledged < game.goal ? 1 : 0);
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
const displayString = `A total of $<strong>${raised.toLocaleString('en-US')}</strong> has been raised for <strong>${GAMES_JSON.length}</strong> games. Currently, <strong>${numUnfunded}</strong> games remained unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const description = document.createElement("description");
description.innerHTML = `<p>${displayString}</p>`;
descriptionContainer.appendChild(description);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame] = [...sortedGames];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgeGame = document.createElement("topGame");
topPledgeGame.innerHTML = `
<div id="first-game-card">
    <img id="first-game-img" src=${firstGame.img}>
    <h4 id="first-game-name">${firstGame.name}</h4>
</div>`;
firstGameContainer.appendChild(topPledgeGame);

topPledgeGame.addEventListener("click", () => {
    deleteChildElements(gamesContainer);
    addGamesToPage([firstGame]);
});

// do the same for the runner up item
const runnerUpGame = document.createElement("runnerUpGame");
runnerUpGame.innerHTML = `
<div id="first-game-card">
    <img id="first-game-img" src=${secondGame.img}>
    <h4 id="first-game-name">${secondGame.name}</h4>
</div>`;
secondGameContainer.appendChild(runnerUpGame);

runnerUpGame.addEventListener("click", () => {
    deleteChildElements(gamesContainer);
    addGamesToPage([secondGame]);
});

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", () => {
    deleteChildElements(gamesContainer);
    const filteredGames = GAMES_JSON.filter((game) => {
        return game.name.toLowerCase().includes(searchBar.value.toLowerCase());
    });
    addGamesToPage(filteredGames);
});