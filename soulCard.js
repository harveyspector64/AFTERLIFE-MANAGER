// Function to generate a random soul card
function generateSoulCard(traits, virtues, sins) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const age = getRandomNumber(18, 100);
    const trait1 = getRandomItem(traits);
    const trait2 = getRandomItem(traits);
    const virtue = getRandomItem(virtues);
    const sin = getRandomItem(sins);

    return {
        firstName,
        lastName,
        age,
        traits: [trait1, trait2],
        virtue,
        sin
    };
}

// Function to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}