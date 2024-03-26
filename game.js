// ... (previous code remains the same)

// Variables to track realm status
let heavenPopulation = 0;
let heavenKarma = 0;
let purgatoryPopulation = 0;
let purgatoryKarma = 0;
let hellPopulation = 0;
let hellKarma = 0;

// ... (previous code remains the same)

// Function to judge a soul and send them to a realm
function judgeSoul(soulCardElement, realm) {
    const soulName = soulCardElement.querySelector('h3').textContent;
    const soulKarmaScore = parseInt(soulCardElement.querySelector('.karma-score').textContent);
    const soulVirtueScore = parseInt(soulCardElement.querySelector('.virtue-score').textContent);
    const soulSinScore = parseInt(soulCardElement.querySelector('.sin-score').textContent);
    
    let points = 0;
    if (realm === 'Heaven' && soulKarmaScore >= 80) {
        points = soulVirtueScore;
        heavenPopulation++;
        heavenKarma += soulKarmaScore;
    } else if (realm === 'Purgatory' && soulKarmaScore >= 40 && soulKarmaScore < 80) {
        points = Math.floor((soulVirtueScore + soulSinScore) / 2);
        purgatoryPopulation++;
        purgatoryKarma += soulKarmaScore;
    } else if (realm === 'Hell' && soulKarmaScore < 40) {
        points = soulSinScore;
        hellPopulation++;
        hellKarma += soulKarmaScore;
    }
    
    // Add the earned points to the player's total score
    playerScore += points;
    
    // Display feedback to the player
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    feedbackElement.innerHTML = `
        <p>Judged soul: ${soulName}</p>
        <p>Sent to: ${realm}</p>
        <p>Points earned: ${points}</p>
    `;
    gameContainer.appendChild(feedbackElement);
    
    // Remove the feedback after a delay
    setTimeout(() => {
        feedbackElement.remove();
    }, 2000);
    
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
}

// Function to update the realm status
function updateRealmStatus() {
    const realmStatus = `
        <p class="realm-status">Heaven:</p>
        <p>Population: ${heavenPopulation}</p>
        <p>Karma: ${heavenKarma}</p>
        <p>Status: ${getRealmStatus(heavenPopulation, heavenKarma)}</p>
        
        <p class="realm-status">Purgatory:</p>
        <p>Population: ${purgatoryPopulation}</p>
        <p>Karma: ${purgatoryKarma}</p>
        <p>Status: ${getRealmStatus(purgatoryPopulation, purgatoryKarma)}</p>
        
        <p class="realm-status">Hell:</p>
        <p>Population: ${hellPopulation}</p>
        <p>Karma: ${hellKarma}</p>
        <p>Status: ${getRealmStatus(hellPopulation, hellKarma)}</p>
    `;
    realmStatusContainer.innerHTML = realmStatus;
}

// Function to determine the realm status based on population and karma
function getRealmStatus(population, karma) {
    if (population < 10 && karma >= 500) {
        return 'Balanced';
    } else if (population >= 10 && population < 20 && karma >= 400 && karma < 500) {
        return 'Slightly Overcrowded';
    } else if (population >= 20 || karma < 400) {
        return 'Overcrowded';
    }
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
        
        // Update the realm status
        updateRealmStatus();
    }
}
