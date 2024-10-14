const body = document.querySelector('body'),
  sidebar = body.querySelector('.sidebar'),
  toggle = body.querySelector('.toggle'),
  searchBtn = body.querySelector('.search-box'),
  modeSwitch = body.querySelector('.toggle-switch'),
  modeText = body.querySelector('.mode-text');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close');
});

searchBtn.addEventListener('click', () => {
  sidebar.classList.remove('close');
});

modeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    modeText.innerText = 'Light Mode'
  }
  else {
    modeText.innerText = 'Dark Mode'
  }
});

function showSection(sectionId) {
  // Hide all sections
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('encryption').style.display = 'none';
  document.getElementById('decryption').style.display = 'none';

  // Show the selected section
  document.getElementById(sectionId).style.display = 'block';
}

function loadDashboard() {
  showSection('dashboard');
}

function loadEncryption() {
  showSection('encryption');
}

function loadDecryption() {
  showSection('decryption');
}

// --------------------------------------------------------------------------------------------------------

document.getElementById('encryptionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const secretMessage = document.getElementById('secretMessage').value;
  const encryptionKey = document.getElementById('encryptionKey').value;
  const imageInput = document.getElementById('imageInput').files[0];

  if (imageInput) {
    // Encrypt the secret message using AES
    const encryptedMessage = CryptoJS.AES.encrypt(secretMessage, encryptionKey).toString();
    console.log("Encrypted Message: ", encryptedMessage);

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert encrypted message to binary
        const binaryMessage = textToBinary(encryptedMessage);

        // Encode the message using LSB method
        for (let i = 0, j = 0; i < data.length && j < binaryMessage.length; i += 4) {
          data[i] = (data[i] & 254) | parseInt(binaryMessage[j], 2);
          j++;
        }

        // Update the canvas with the new image data
        ctx.putImageData(imageData, 0, 0);

        // Get the base64 image data URL
        const encryptedImageDataUrl = canvas.toDataURL();

        // Send the base64 image data to Python via Eel
        eel.receive_encrypted_image(encryptedImageDataUrl);

        // Show the new encrypted image in the browser
        const encryptedImage = document.getElementById('encryptedImage');
        encryptedImage.src = encryptedImageDataUrl;
        document.getElementById('result').textContent = 'Image encrypted successfully!';
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(imageInput);
  }
});

// Helper function to convert text to binary
function textToBinary(text) {
  return text.split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}


// --------------------------------------------------------------------------------------------------------

document.getElementById('decryptionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const decryptionPassword = document.getElementById('decryptionPassword').value;
  const decryptionKey = document.getElementById('decryptionKey').value;
  const encryptedImageInput = document.getElementById('encryptedImageInput').files[0];

  if (encryptedImageInput) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Extract the binary message from the LSB of the red channel
        let binaryMessage = '';
        for (let i = 0; i < data.length; i += 4) {
          const redChannelLSB = data[i] & 1; // Get the LSB from the red channel
          binaryMessage += redChannelLSB;
        }

        // Convert binary to text
        const encryptedMessage = binaryToText(binaryMessage);
        console.log("Extracted Encrypted Message: ", encryptedMessage);

        // Decrypt the message using AES
        const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, decryptionKey).toString(CryptoJS.enc.Utf8);

        // Display the decrypted message
        document.getElementById('decryptedmessage').value = decryptedMessage;
        document.getElementById('decryptionResult').textContent = 'Image decrypted successfully!';
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(encryptedImageInput);
  }
});

// Helper function to convert binary to text
function binaryToText(binary) {
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
}

// ---------------------------------------------------------------------------------------

// Handle the exit button click
document.getElementById('exit-btn').addEventListener('click', function() {
  // First, close the window using JavaScript
  window.close();
  webview.destroy()
  // Then, call Python to quit the application process
  eel.quit_app();
});