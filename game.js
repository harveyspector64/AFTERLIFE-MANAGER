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
const backButton = document.getElementById('back-button');

let divineFavor = 0;
let maxDivineFavor = 100;
let soulCards = [];
let realmBalance = {
    heaven: { population: 0, karma: 0, idealPopulation: 10, idealKarma: 500 },
    purgatory: { population: 0, karma: 0, idealPopulation: 20, idealKarma: 400 },
    hell: { population: 0, karma: 0, idealPopulation: 30, idealKarma: 300 }
};

// Show the main menu by default
mainMenu.style.display = 'block';

// Button click event listeners
startButton.addEventListener('click', startGame);
loadButton.addEventListener('click', loadGame);
settingsButton.addEventListener('click', openSettings);
realmStatusButton.addEventListener('click', showRealmStatus);
backButton.addEventListener('click', hideRealmStatus);

// Function to start a new game
async function startGame() {
    // Hide the main menu and show the game screen
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'block';
    
    // Initialize the game state
    divineFavor = 50;
    soulCards = [];
    resetRealmBalance();
    
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
    
    // Update realm balance based on the judged soul
    realmBalance[realm.toLowerCase()].population++;
    realmBalance[realm.toLowerCase()].karma += soulKarmaScore;
    
    // Calculate the change in Divine Favor based on the judgment
    const divineFavorChange = calculateDivineFavorChange(soulKarmaScore, realm);
    divineFavor += divineFavorChange;
    divineFavor = Math.max(0, Math.min(divineFavor, maxDivineFavor));
    
    // Display judgment message
    const judgmentMessage = getJudgmentMessage(soulName, realm);
    const judgmentElement = document.createElement('div');
    judgmentElement.classList.add('judgment-message');
    judgmentElement.innerHTML = `<p>${judgmentMessage}</p>`;
    soulCardElement.appendChild(judgmentElement);
    
    // Remove the judgment buttons
    const judgmentButtons = soulCardElement.querySelector('.judgment-buttons');
    judgmentButtons.remove();
    
    // Remove the soul card and judgment message after a delay
    setTimeout(() => {
        soulCardElement.remove();
    }, 2000);
    
    // Remove the judged soul card from the array
    const index = soulCards.findIndex(card => card.firstName + ' ' + card.lastName === soulName);
    if (index !== -1) {
        soulCards.splice(index, 1);
    }
    
    // Check if all soul cards have been judged
    if (soulCards.length === 0) {
        // Trigger realm events or challenges based on balance
        triggerRealmEvents();
        
        // Show the realm status screen
        showRealmStatus();
        
        // Generate new soul cards after a delay
        setTimeout(() => {
            generateNewSoulCards();
        }, 3000);
    }
}

// Function to calculate the change in Divine Favor based on a judgment
function calculateDivineFavorChange(soulKarmaScore, realm) {
    let favorChange = 0;
    
    if (realm === 'Heaven' && soulKarmaScore >= 80) {
        favorChange = 10;
    } else if (realm === 'Purgatory' && soulKarmaScore >= 40 && soulKarmaScore < 80) {
        favorChange = 5;
    } else if (realm === 'Hell' && soulKarmaScore < 40) {
        favorChange = 2;
    } else {
        favorChange = -5;
    }
    
    return favorChange;
}

// Function to get the judgment message based on the soul and realm
function getJudgmentMessage(soulName, realm) {
    const messages = {
        Heaven: [
            `By the grace of the Divine, ${soulName} shall ascend to the celestial paradise of Heaven.`,
            `The virtuous deeds of ${soulName} have earned them a place among the angels in Heaven.`,
            `${soulName}'s soul, pure and true, shall find eternal rest in the hallowed halls of Heaven.`
        ],
        Purgatory: [
            `${soulName} shall endure the trials of Purgatory to atone for their earthly transgressions.`,
            `In the crucible of Purgatory, ${soulName}'s soul shall be refined and purified.`,
            `${soulName} is consigned to the limbo of Purgatory, where they shall reflect upon their mortal deeds.`
        ],
        Hell: [
            `By the decree of the Divine Judge, ${soulName} shall be consigned to the eternal flames of Hell for their mortal transgressions.`,
            `The wicked deeds of ${soulName} have earned them a place among the damned in Hell.`,
            `${soulName}'s soul, blackened by sin, shall suffer the torments of Hell for all eternity.`
        ]
    };
    
    const realmMessages = messages[realm];
    const randomIndex = Math.floor(Math.random() * realmMessages.length);
    return realmMessages[randomIndex];
}

// Function to trigger realm events or challenges based on balance
function triggerRealmEvents() {
    for (const realm in realmBalance) {
        const { population, karma, idealPopulation, idealKarma } = realmBalance[realm];
        
        if (population > idealPopulation || karma < idealKarma) {
            // Trigger a negative event or challenge for the imbalanced realm
            console.log(`Imbalance detected in ${realm}! Triggering a negative event.`);
            // TODO: Implement the logic for negative realm events
        } else if (population === idealPopulation && karma >= idealKarma) {
            // Trigger a positive event or reward for the balanced realm
            console.log(`${realm} is in perfect balance! Triggering a positive event.`);
            // TODO: Implement the logic for positive realm events
        }
    }
}

// Function to update the realm status display
function updateRealmStatusDisplay() {
    const realmStatusElement = document.getElementById('realm-status-container');
    let realmStatusHTML = '';
    
    for (const realm in realmBalance) {
        const { population, karma, idealPopulation, idealKarma } = realmBalance[realm];
        
        realmStatusHTML += `
            <div class="realm-status">
                <h3>${realm.charAt(0).toUpperCase() + realm.slice(1)}</h3>
                <p>Population: ${population}/${idealPopulation}</p>
                <p>Karma: ${karma}/${idealKarma}</p>
            </div>
        `;
    }
    
    realmStatusElement.innerHTML = realmStatusHTML;
}

// Function to generate a new set of soul cards
function generateNewSoulCards() {
    initializeGame();
}

// Function to reset the realm balance to initial values
function resetRealmBalance() {
    realmBalance.heaven.population = 0;
    realmBalance.heaven.karma = 0;
    realmBalance.purgatory.population = 0;
    realmBalance.purgatory.karma = 0;
    realmBalance.hell.population = 0;
    realmBalance.hell.karma = 0;
}

// Function to show the realm status screen
function showRealmStatus() {
    // Hide the game screen and show the realm status screen
    gameScreen.style.display = 'none';
    document.getElementById('realm-status-screen').style.display = 'block';
    
    // Update the realm status display
    updateRealmStatusDisplay();
    
    // Display a message or tutorial prompt
    const tutorialMessage = `
        <p>The fate of the afterlife rests in your hands, Divine Judge.</p>
        <p>Monitor the balance of the realms and the growth of your Divine Favor.</p>
        <p>Your judgments shall shape the destiny of souls and the cosmos itself.</p>
    `;
    const tutorialElement = document.createElement('div');
    tutorialElement.classList.add('tutorial-message');
    tutorialElement.innerHTML = tutorialMessage;
    document.getElementById('realm-status-screen').appendChild(tutorialElement);
}

// Function to hide the realm status screen and return to the game screen
function hideRealmStatus() {
    // Hide the realm status screen and show the game screen
    document.getElementById('realm-status-screen').style.display = 'none';
    gameScreen.style.display = 'block';
}
