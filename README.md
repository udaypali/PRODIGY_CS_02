# Image Encryption & Decryption App

This project is a desktop application that allows users to encrypt and decrypt messages hidden within images using the Least Significant Bit (LSB) steganography technique. It provides both encryption and decryption capabilities, securing the data with AES encryption.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#how-to-use)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Features
- **Encrypt**: Hide a secret message within an image and encrypt the message with AES encryption.
- **Decrypt**: Extract and decrypt the hidden message from an encrypted image.
- **Dark Mode**: Switch between light and dark themes.
- **Interactive Sidebar**: Easily navigate between different sections of the application.

## Technology Stack
- **Frontend**: HTML, CSS (Glassmorphism Design), JavaScript
- **Backend**: Python (with Eel)
- **Encryption**: AES encryption (using `crypto-js` in JavaScript and `pycryptodome` in Python)
- **Image Processing**: LSB steganography (using Pillow in Python)

## Prerequisites
Before you begin, ensure you have the following installed:
- Python (version 3.7 or later)
- Node.js (for frontend dependencies like `crypto-js`)

## Installation
1. Clone the repository from GitHub.
   ```bash
   git clone https://github.com/udaypali/PRODIGY_CS_02.git
   cd PRODIGY_CS_02

## Creating a Virtual Environment
2. Create a new virtual environment for the project.
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   pip install -r requirements.txt

## Installing Frontend Dependencies
3. Install frontend dependencies by installing `crypto-js` via npm.
   ```bash
   npm install crypto-js

## Running the Application

### Start the Python Backend
```bash
python main.py
```

## Usage

### 1. Encryption
- Navigate to the "Encryption" section.
- Select an image, provide a secret message, and an encryption key.
- Click on the "Encrypt" button to hide the message in the image.
- The encrypted image will be displayed, and you can save it locally.

### 2. Decryption
- Navigate to the "Decryption" section.
- Upload the encrypted image and provide the decryption key.
- Click on the "Decrypt" button to retrieve and decrypt the hidden message.

## File Structure
```bash
assets/           # Contains images used in the application (e.g., dashboard background)
main.py           # The Python backend logic
app.js            # Frontend logic written in JavaScript
style.css         # CSS for styling the application
templates/        # HTML files for the user interface
requirements.txt  # Lists Python dependencies
README.md         # Documentation for the project
```

## Dependencies
The application depends on the following libraries:
- **Eel**: To enable desktop applications with HTML/JS frontend.
- **Pillow**: For image processing and LSB encoding.
- **PyCryptodome**: AES encryption library for Python.
- **crypto-js**: AES encryption library for JavaScript.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

**Disclaimer**: The author is not responsible for any misuse of this application. Use it at your own risk.
