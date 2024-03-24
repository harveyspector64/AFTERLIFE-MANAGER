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
        const soulCardASCII = generateSoulCardASCII(soulCard);
        const soulCardElement = document.createElement('div');
        soulCardElement.classList.add('soul-card');
        soulCardElement.innerHTML = `<pre>${soulCardASCII}</pre>`;
        soulCardContainer.appendChild(soulCardElement);
    });

    // Add event listeners to judgment buttons
    const judgmentButtons = document.querySelectorAll('.judgment-button');
    judgmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const realm = button.dataset.realm;
            const soulCardElement = button.closest('.soul-card');
            judgeSoul(soulCardElement, realm);

            // Display judgment confirmation message
            const soulName = soulCardElement.querySelector('pre').textContent.trim().split('\n')[6].trim();
            const confirmationMessage = `
            ✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧
            ✦                                                                  ✦
            ✧      In the grand cosmic tapestry of fate,                       ✧
            ✦      the soul of ${soulName} has been judged.                    ✦
            ✧      Their deeds, virtues, and sins have been weighed            ✧
            ✦      upon the celestial scales of karmic balance.                ✦
            ✧                                                                  ✧
            ✦      By the divine decree of the Afterlife Manager,              ✦
            ✧      this soul shall be consigned to the realm of ${realm}.      ✧
            ✦                                                                  ✦
            ✧      May their eternal journey be shaped by the                  ✧
            ✦      consequences of their mortal actions.                       ✦
            ✧                                                                  ✧
            ✦      Let the cosmic wheels turn, and the soul's                  ✦
            ✧      fate be sealed in the annals of eternity.                   ✧
            ✦                                                                  ✦
            ✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧
            `;

            const confirmationElement = document.createElement('div');
            confirmationElement.classList.add('confirmation-message');
            confirmationElement.innerHTML = `<pre>${confirmationMessage}</pre>`;
            soulCardContainer.appendChild(confirmationElement);

            // Remove the confirmation message after a delay
            setTimeout(() => {
                confirmationElement.remove();
            }, 3000);
        });
    });
}

// Function to judge a soul and send them to a realm
function judgeSoul(soulCardElement, realm) {
    const soulName = soulCardElement.querySelector('pre').textContent.trim().split('\n')[6].trim();
    console.log(`Judging soul: ${soulName}`);
    console.log(`Sending soul to ${realm}`);

    // TODO: Update the game state based on the judgment
    // - Remove the judged soul card from the list
    // - Update the realm's population and karma balance
    // - Check for any realm-specific events or consequences
    // - Proceed to the next soul card or end the judgment phase

    // For now, let's just remove the judged soul card
    soulCardElement.remove();
}
