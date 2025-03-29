console.log("Client-side code loaded!");

const uploadPageButton = document.getElementById('upload-page-button');

uploadPageButton.onclick = function() {
  // Redirect to the upload page when the button is clicked
  window.location.href = '/upload.html';
}