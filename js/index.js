// Gets a parameter from the URL
// i.e. ('p') http://127.0.0.1:43110/site.bit?p=hello -> hello
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// Check if the user supplied a paste
// Paste IDs can be supplied in the URL with the 'p' param
var pasteID = getURLParameter('p');
if(pasteID) {
    loadPaste(pasteID)
        .then(paste_data => {
            // Check we actually got content back
            if (paste_data.length != 0) {
                // Extract info about the paste
                var author = paste_data[0];
                var content = paste_data[1];

                // Set the content of the paste area to the requested paste
                document.getElementById('paste-area').value = content;

                // Show a notification that paste content was loaded!
                zeroFrame.cmd("wrapperNotification", ["done", "Paste loaded successfully!", 4000]);

                // If we're currently on a loaded paste,
                // create a new paste upon clicking the paste button
                paste_button = document.getElementById('paste-button');
                paste_button.innerHTML = "New Paste!";
                paste_button.onclick = function(){
                    // Navigate to ZeroPaste without the pasteID appended to the URL
                    window.location.href = window.location.href.split('?')[0];
                }

                // Hide the encrypted button option
                document.getElementById('encryption-div').style.display = "none";

                // Make the textarea readonly
                document.getElementById('paste-area').readOnly = true;

                // Add the author's name
                document.getElementById('paste-author').innerHTML = "Authored by " + author;
            }
        });
}
