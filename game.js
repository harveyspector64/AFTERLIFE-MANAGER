// ... (previous code remains the same)

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

// ... (previous code remains the same)

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

// Add event listener to the back button in the realm status screen
backButton.addEventListener('click', hideRealmStatus);
