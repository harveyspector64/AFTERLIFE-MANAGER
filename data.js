// Function to load JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

// Load game data
async function loadGameData() {
    const [traits, virtues, sins, realms] = await Promise.all([
        loadJSON('data/traits.json'),
        loadJSON('data/virtues.json'),
        loadJSON('data/sins.json'),
        loadJSON('data/realms.json')
    ]);

    return { traits, virtues, sins, realms };
}
