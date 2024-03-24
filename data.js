// Function to load JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

// Load game data
async function loadGameData() {
    const [traits, virtuesData, sinsData, realms, maleFirstNames, femaleFirstNames, lastNames] = await Promise.all([
        loadJSON('AFTERLIFE-MANAGER/data/traits.json'),
        loadJSON('AFTERLIFE-MANAGER/data/virtues.json'),
        loadJSON('AFTERLIFE-MANAGER/data/sins.json'),
        loadJSON('AFTERLIFE-MANAGER/data/realms.json'),
        loadJSON('AFTERLIFE-MANAGER/data/maleFirstNames.json'),
        loadJSON('AFTERLIFE-MANAGER/data/femaleFirstNames.json'),
        loadJSON('AFTERLIFE-MANAGER/data/lastNames.json')
    ]);

    // Convert virtues and sins data to arrays of objects
    const virtues = Object.entries(virtuesData).map(([name, score]) => ({ name, score }));
    const sins = Object.entries(sinsData).map(([name, score]) => ({ name, score }));

    return { traits, virtues, sins, realms, maleFirstNames, femaleFirstNames, lastNames };
}
