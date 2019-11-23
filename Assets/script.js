// Setting the variable for password
const resultEl = document.getElementById('password');

// Establishing the variable for the buttons
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('copy');

// Seeking user inputs to determine password criteria and storing them as variables
const lengthEl = parseFloat(prompt("How many letters does the password need? (Enter a number between 8-128)"));
const uppercaseEl = confirm("Does the password need uppercase letters?");
const lowercaseEl = confirm("Does the password need lowercase letters?");
const numbersEl = confirm("Does the password need numbers?")
const symbolsEl = confirm("Does the password need special characters?")

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    numbers: getRandomNumbers,
    symbols: getRandomSymbols,
};

// Copy password to clipboard when "Copy to Clipboard" button is pressed
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.value;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Generate password when "Generate Password" button is pressed
generateEl.addEventListener("click", () => {
    const length = lengthEl;
    const hasLower = (lowercaseEl == true);
    const hasUpper = (uppercaseEl == true);
    const hasNumber = (numbersEl == true);
    const hasSymbol = (symbolsEl == true);

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Generate password function
function generatePassword(lower, upper, numbers, symbols, length) {
    let generatePassword = "";
    const typesCount = lower + upper + numbers + symbols;

    const typesArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(
        item => Object.values(item)[0]
    );

    // When user does not confirm any criteria for password
    if (typesCount === 0) {
        return "";
    }

    // Create a loop
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            console.log('funcName:', funcName);
            generatePassword += randomFunction[funcName]();
        });
    }

    const finalPassword = generatePassword.slice(0, length);

    return finalPassword;
}

// Generator functions
// ASCII Code Table https://ascii.cl/
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
    const symbols = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}