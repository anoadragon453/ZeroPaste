// Get a user's data file contents
function getUserData(address) {
    var dataFile = "data/users/" + address + "/data.json";

    // Check if the file exists
    return zeroFS.fileExists(dataFile)
        .then(exists => {
            if (!exists) {
                // If it fails, the file is probably empty. In that case,
                // create a brand new empty data object, with no pastes yet.
                data = {
                    pastes: [],
                    next_paste_id: 0
                };
                return data;
            }

            // Found existing data
            // Try to parse the JSON into data
            return zeroFS.readFile(dataFile)
                .then(data => {
                    return JSON.parse(data);
                });
        }, () => ({})); // Ensure we return a promise
}

// Write data back to the user's data.json
function saveUserData(address, content) {
    var userDir = "data/users/" + address;

    // Convert the given content to JSON and write to the file
    return zeroFS.writeFile(userDir + "/data.json", JSON.stringify(content, null, "\t"))
        .then(() => {
            // Sign the site
            return zeroPage.cmd("siteSign", {inner_path: userDir + "/content.json"});
        })
        .then(() => {
            // TODO: Can make this sign: true without any repercussions?
            // Publish the site to the network
            return zeroPage.cmd("sitePublish", {inner_path: userDir + "/content.json", sign: false});
        })
        .then(res => {
            // Check if the content publish succeeded
            if(res != "ok" && res.error != "Port not opened." && res.error != "Content publish failed.") {
                return Promise.reject(res);
            }
        });
}

// Create a new paste and insert its contents into the user's
// data.json
function createNewPaste() {
    // Get the paste content
    pasteContent = document.getElementById("paste-area").value;

    // Check if encryption is enabled
    var isEncrypted = document.getElementById('encryption-checkbox').checked;
    if(isEncrypted) {
        console.log("Encrypting paste");

        // Ask for a password to encrypt with

        // Encrypt the paste
    }

    // Get the user's info
    // Pop up the address notification if not already signed in
    let address, user_id;
    zeroAuth.requestAuth()
        .then(auth => {
            // Once we've got the auth, extract the address and username
            address = auth.address;
            user_id = auth.cert_user_id;

            // Now get the user's data
            return getUserData(auth.address);
        })
        .then(userData => {
            // Insert the paste
            userData.pastes.push({
                id: userData.next_paste_id++, // Gets next user-specific paste id and increments
                author: user_id,              // The current user's public address
                content: pasteContent,        // The content of the paste
                encrypted: isEncrypted        // Set whether the paste is encrypted
            });

            // Push the updated paste content into the user's data.json
            saveUserData(address, userData);
        });
}

// Load the supplied pasteID from the DB (if it exists)
function loadPaste(id) {
    console.log("Requesting paste: " + id);

    zeroQuery("SELECT content, encrypted FROM pastes WHERE id = " + id);
}
