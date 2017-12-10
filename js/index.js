// Gets a parameter from the URL
// i.e. ('p') http://127.0.0.1:43110/site.bit?p=hello -> hello
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// Check if the user supplied a paste
// Paste IDs can be supplied in the URL with the 'p' param
var pasteID = getURLParameter('p');
if(pasteID) {
    console.log("Loading paste ID: " + pasteID);
    loadPaste(pasteID);
}
