// Get references to DOM elements
const gameContainer = document.getElementById('game-container');
const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const settingsScreen = document.getElementById('settings-screen');
const startButton = document.getElementById('start-button');
const loadButton = document.getElementById('load-button');
const settingsButton = document.getElementById('settings-button');
const soulCardContainer = document.getElementById('soul-card-container');
const realmInfoContainer = document.getElementById('realm-info-container');

// Show the main menu by default
mainMenu.style.display = 'block';

// Button click event listeners
startButton.addEventListener('click', startGame);
loadButton.addEventListener('click', loadGame);
settingsButton.addEventListener('click', openSettings);

// Function to start a new game
async function startGame() {
    // Hide the main menu and show the game screen
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'block';
    
    // Initialize the game state and begin the game loop
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
    const soulCards = [];
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
            <p>Total Karma: ${soulCard.totalKarma}</p>
            <div class="judgment-buttons">
                <button class="judgment-button" data-realm="Heaven">Heaven</button>
                <button class="judgment-button" data-realm="Purgatory">Purgatory</button>
                <button class="judgment-button" data-realm="Hell">Hell</button>
            </div>
        `;
        soulCardContainer.appendChild(soulCardElement);
    });

    // Add event listeners to judgment buttons
    const judgmentButtons = document.querySelectorAll('.judgment-button');
    judgmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const realm = button.dataset.realm;
            const soulCard = button.closest('.soul-card');
            judgeSoul(soulCard, realm);
        });
    });
}

// Function to judge a soul and send them to a realm
function judgeSoul(soulCard, realm) {
    console.log(`Judging soul: ${soulCard.querySelector('h3').textContent}`);
    console.log(`Sending soul to ${realm}`);

    // TODO: Update the game state based on the judgment
    // - Remove the judged soul card from the list
    // - Update the realm's population and karma balance
    // - Check for any realm-specific events or consequences
    // - Proceed to the next soul card or end the judgment phase

    // For now, let's just remove the judged soul card
    soulCard.remove();
}
