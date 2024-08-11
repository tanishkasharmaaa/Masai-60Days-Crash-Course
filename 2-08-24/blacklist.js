// Initialize an empty array to store blacklisted tokens.
let blacklist = [];

// Function to add a token to the blacklist.
function addToBlacklist(token) {
    console.log(`Adding token to blacklist: ${token}`); // Log the token being added.
    blacklist.push(token); // Add the token to the blacklist array.
    console.log(`Current blacklist: ${blacklist}`); // Log the current state of the blacklist.
}

// Function to check if a token is blacklisted.
function isBlacklisted(token) {
    // Returns true if the token is found in the blacklist array, otherwise false.
    return blacklist.includes(token);
}

// Exporting the blacklist array and the functions to be used in other parts of the application.
module.exports = {
    blacklist,
    addToBlacklist,
    isBlacklisted
};
