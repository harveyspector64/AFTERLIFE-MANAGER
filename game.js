// Get references to DOM elements
const gameContainer = document.getElementById('game-container');
const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const settingsScreen = document.getElementById('settings-screen');
const startButton = document.getElementById('start-button');
const loadButton = document.getElementById('load-button');
const settingsButton = document.getElementById('settings-button');
const soulCardContainer = document.getElementById('soul-card-container');
const realmStatusContainer = document.getElementById('realm-status-container');
const realmStatusButton = document.getElementById('realm-status-button');

let playerScore = 0;
let soulCards = [];

// Show the main menu by default
mainMenu.style.display = 'block';

// Button click event listeners
startButton.addEventListener('click', startGame);
loadButton.addEventListener('click', loadGame);
settingsButton.addEventListener('click', openSettings);
realmStatusButton.addEventListener('click', toggleRealmStatus);

// Function to start a new game
async function startGame() {
    // Hide the main menu and show the game screen
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'block';
    
    // Initialize the game state
    playerScore = 0;
    soulCards = [];
    
    // Generate initial soul cards
    await initializeGame();
}

// Function to load a saved game
function loadGame() {
    // TODO: Implement the logic to load a saved game state
    console.log('Loading game...');
}

// Function to open the settings menu
function openSettings() {
    // Hide the main menu and show the settings screen
    mainMenu.style.display = 'none';
    settingsScreen.style.display = 'block';
    
    // TODO: Implement the settings menu functionality
}

// Function to initialize the game state
async function initializeGame() {
    console.log('Loading game data...');
    const gameData = await loadGameData();
    const { traits, virtues, sins, realms, maleFirstNames, femaleFirstNames, lastNames } = gameData;
    console.log('Game data loaded:', gameData);

    // Generate initial soul cards
    soulCards = [];
    for (let i = 0; i < 5; i++) {
        const soulCard = generateSoulCard(traits, virtues, sins, maleFirstNames, femaleFirstNames, lastNames);
        soulCards.push(soulCard);
    }
    console.log('Soul cards generated:', soulCards);

    // Display soul cards on the game screen
    displaySoulCards(soulCards);
}

// Function to display soul cards on the game screen
function displaySoulCards(soulCards) {
    soulCardContainer.innerHTML = '';

    soulCards.forEach(soulCard => {
        const soulCardElement = document.createElement('div');
        soulCardElement.classList.add('soul-card');
        soulCardElement.innerHTML = `
            <h3>${soulCard.firstName} ${soulCard.lastName}</h3>
            <p>Gender: ${soulCard.gender}</p>
            <p>Age: ${soulCard.age}</p>
            <p>Traits: ${soulCard.traits.join(', ')}</p>
            <p>Virtue: ${soulCard.virtue.name} (${soulCard.virtue.score})</p>
            <p>Sin: ${soulCard.sin.name} (${soulCard.sin.score})</p>
            <p>Total Karma: <span class="karma-score">${soulCard.totalKarma}</span></p>
            <div class="judgment-buttons">
                <button class="judgment-button heaven-button" data-realm="Heaven">Heaven</button>
                <button class="judgment-button purgatory-button" data-realm="Purgatory">Purgatory</button>
                <button class="judgment-button hell-button" data-realm="Hell">Hell</button>
            </div>
        `;
        soulCardContainer.appendChild(soulCardElement);

        // Add event listeners to judgment buttons
        const judgmentButtons = soulCardElement.querySelectorAll('.judgment-button');
        judgmentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const realm = button.dataset.realm;
                judgeSoul(soulCardElement, realm);
            });
        });
    });
}

// Function to judge a soul and send them to a realm
function judgeSoul(soulCardElement, realm) {
    const soulName = soulCardElement.querySelector('h3').textContent;
    const soulKarmaScore = parseInt(soulCardElement.querySelector('.karma-score').textContent);
    
    let points = 0;
    if (realm === 'Heaven' && soulKarmaScore >= 80) {
        points = 100;
    } else if (realm === 'Purgatory' && soulKarmaScore >= 40 && soulKarmaScore < 80) {
        points = 50;
    } else if (realm === 'Hell' && soulKarmaScore < 40) {
        points = 25;
    }
    
    // Add the earned points to the player's total score
    playerScore += points;
    
    console.log(`Judging soul: ${soulName}`);
    console.log(`Sending soul to ${realm}`);
    console.log(`Points earned: ${points}`);
    
    // Remove the judged soul card from the array
    const index = soulCards.findIndex(card => card.firstName + ' ' + card.lastName === soulName);
    if (index !== -1) {
        soulCards.splice(index, 1);
    }
    
    // Remove the soul card element from the DOM
    soulCardElement.remove();
    
    // Check if all soul cards have been judged
    if (soulCards.length === 0) {
        displayScore();
        generateNewSoulCards();
    }
}

// Function to display the player's total score
function displayScore() {
    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score-display');
    scoreElement.textContent = `Your Score: ${playerScore}`;
    gameContainer.appendChild(scoreElement);
    
    // Remove the score display after a delay
    setTimeout(() => {
        scoreElement.remove();
    }, 2000);
}

// Function to generate a new set of soul cards
function generateNewSoulCards() {
    initializeGame();
}

// Function to toggle the realm status screen
function toggleRealmStatus() {
    if (gameScreen.style.display === 'none') {
        // Hide the realm status screen and show the game screen
        document.getElementById('realm-status-screen').style.display = 'none';
        gameScreen.style.display = 'block';
    } else {
        // Hide the game screen and show the realm status screen
        gameScreen.style.display = 'none';
        document.getElementById('realm-status-screen').style.display = 'block';
        
        // TODO: Implement the logic to display the realm status and consequences
        const realmStatus = `
            <p class="realm-status">Heaven: Balanced</p>
            <p class="realm-status">Purgatory: Slightly Overcrowded</p>
            <p class="realm-status">Hell: Overcrowded</p>
        `;
        realmStatusContainer.innerHTML = realmStatus;
    }
}
