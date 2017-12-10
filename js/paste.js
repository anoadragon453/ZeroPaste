// Create a new paste and insert its contents into the user's
// data.json
function createNewPaste() {
    // Get the paste content
    pasteContent = document.getElementById("paste-area").value;

    // Check if encryption is enabled
    var encryption = document.getElementById('encryption-checkbox').checked;
    if(encryption) {
        console.log("Encrypting paste");

        // Ask for a password to encrypt with

        // Encrypt the paste
    }

    // Get the user's address
    var address = zeroPage.getSiteInfo()
        .then(() => {
            // This will run regardless
            // Pop up the address notification if not already signed in
            return zeroAuth.requestAuth();
        })
        .then(auth => {
            // Once we've got the auth, extract the address
            return auth.address;
            // TODO: Maybe load the userdata here, then save the paste in the next promise...
        })
        .then()
    )

    // Get the user's data JSON
    var userData = zeroFS.readFile("data/users" + address + "/data.json")
        .then(data => data); // Get the data, then return it so it's set to userData

    // Insert the paste

}

// Load the supplied pasteID from the DB (if it exists)
function loadPaste(id) {

}
