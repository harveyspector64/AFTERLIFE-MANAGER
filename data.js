// Function to load JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

// Load game data
async function loadGameData() {
    const [traits, virtuesData, sinsData, realms, maleFirstNames, femaleFirstNames, lastNames] = await Promise.all([
        loadJSON('data/traits.json'),
        loadJSON('data/virtues.json'),
        loadJSON('data/sins.json'),
        loadJSON('data/realms.json'),
        loadJSON('data/maleFirstNames.json'),
        loadJSON('data/femaleFirstNames.json'),
        loadJSON('data/lastNames.json')
    ]);

    // Convert virtues and sins data to arrays of objects
    const virtues = Object.entries(virtuesData).map(([name, score]) => ({ name, score }));
    const sins = Object.entries(sinsData).map(([name, score]) => ({ name, score }));

    return { traits, virtues, sins, realms, maleFirstNames, femaleFirstNames, lastNames };
}
