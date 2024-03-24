// Function to generate a random soul card
function generateSoulCard(traits, virtues, sins, maleFirstNames, femaleFirstNames, lastNames) {
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const firstName = gender === 'male' ? getRandomItem(maleFirstNames) : getRandomItem(femaleFirstNames);
    const lastName = getRandomItem(lastNames);
    const age = getRandomNumber(18, 100);
    const trait1 = getRandomItem(traits);
    const trait2 = getRandomItem(traits);
    const virtue = getRandomItem(virtues);
    const sin = getRandomItem(sins);

    const totalKarma = virtue.score + sin.score;

    return {
        firstName,
        lastName,
        gender,
        age,
        traits: [trait1, trait2],
        virtue,
        sin,
        totalKarma
    };
}

// Function to generate ASCII art for a soul card
function generateSoulCardASCII(soulCard) {
    const wrapText = (text, maxWidth) => {
        // ... (wrapText function implementation remains the same)
    };

    const ascii = `
    ✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦
    ✧                                                                    ✧
    ✦                                                                    ✦
    ✧        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         ✧
    ✦        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         ✦
    ✧        ░░                                                ░░         ✧
    ✦        ░░    ${soulCard.firstName.toUpperCase()} ${soulCard.lastName.toUpperCase()}    ░░         ✦
    ✧        ░░                                                ░░         ✧
    ✦        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         ✦
    ✧        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         ✧
    ✦                                                                    ✦
    ✧          Gender: ${soulCard.gender}                                 ✧
    ✦          Age: ${soulCard.age}                                       ✦
    ✧                                                                    ✧
    ✦          Traits:                                                   ✦
    ✧          - ${soulCard.traits[0]}                                    ✧
    ✦          - ${soulCard.traits[1]}                                    ✦
    ✧                                                                    ✧
    ✦          Virtue:                                                   ✦
    ✧          ${wrapText(soulCard.virtue.name, 40)}                      ✧
    ✦          (${soulCard.virtue.score})                                 ✦
    ✧                                                                    ✧
    ✦          Sin:                                                      ✦
    ✧          ${wrapText(soulCard.sin.name, 40)}                         ✧
    ✦          (${soulCard.sin.score})                                    ✦
    ✧                                                                    ✧
    ✦          Total Karma: ${soulCard.totalKarma}                        ✦
    ✧                                                                    ✧
    ✦                                                                    ✦
    ✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦
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
