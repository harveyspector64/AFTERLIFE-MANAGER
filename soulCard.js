// Function to generate a random soul card
function generateSoulCardASCII(soulCard) {
    const ascii = `
    +--------------------------+
    |  ${soulCard.firstName} ${soulCard.lastName}  |
    +--------------------------+
    |  Gender: ${soulCard.gender}              |
    |  Age: ${soulCard.age}                  |
    |                          |
    |  Traits:                 |
    |  - ${soulCard.traits[0]}               |
    |  - ${soulCard.traits[1]}               |
    |                          |
    |  Virtue: ${soulCard.virtue.name}      |
    |  (${soulCard.virtue.score})             |
    |                          |
    |  Sin: ${soulCard.sin.name}          |
    |  (${soulCard.sin.score})                 |
    |                          |
    |  Total Karma: ${soulCard.totalKarma}        |
    +--------------------------+
    `;
    return ascii;
}

// Function to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
