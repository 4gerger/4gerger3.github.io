// Setting the variable for password
var resultEl = document.getElementById('password');

// Establishing the variable for the buttons
var generateEl = document.getElementById('generate');
var clipboardEl = document.getElementById('copy');


// Asking for customer inputs
function setting() {
    var lengthEl = parseFloat(prompt("How many letters does the password need? (Enter a number between 8-128)"));
    while (lengthEl < 8 || lengthEl > 128 || isNaN(lengthEl)) {
        lengthEl = parseFloat(prompt("Please enter a number between 8-128!"))
    };
    // if conditions to limit user input
    var uppercaseEl = confirm("Does the password need uppercase letters?");
    var lowercaseEl = confirm("Does the password need lowercase letters?");
    var numbersEl = confirm("Does the password need numbers?")
    var symbolsEl = confirm("Does the password need special characters?")
    // if user puts all false prompt user that they must pick one to be true

    while (lowercaseEl === false && uppercaseEl === false && numbersEl === false && symbolsEl === false) {
        alert("Please click 'OK' for at least one of the following criteria!");
        var uppercaseEl = confirm("Does the password need uppercase letters?");
        var lowercaseEl = confirm("Does the password need lowercase letters?");
        var numbersEl = confirm("Does the password need numbers?")
        var symbolsEl = confirm("Does the password need special characters?")
    };

    var randomFunction = {
        lower: getRandomLower,
        upper: getRandomUpper,
        numbers: getRandomNumbers,
        symbols: getRandomSymbols,
    };

    function generatePassword(lower, upper, numbers, symbols, length) {
        var generatePassword = "";
        var typesCount = lower + upper + numbers + symbols;

        var typesArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(
            item => Object.values(item)[0]
        );

        // When user does not confirm any criteria for password
        if (typesCount === 0) {
            return "";
        }

        // Create a loop
        for (var i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                var funcName = Object.keys(type)[0];
                console.log('funcName:', funcName);
                generatePassword += randomFunction[funcName]();
            });
        }

        var finalPassword = generatePassword.slice(0, length);

        return finalPassword;
    }

    var length = lengthEl;
    var hasLower = (lowercaseEl == true);
    var hasUpper = (uppercaseEl == true);
    var hasNumber = (numbersEl == true);
    var hasSymbol = (symbolsEl == true);

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

}

// Creating a function to call setting and generatePassword functions
function randomPassword() {
    setting();
    generatePassword();
}

// addEventListener to run randomPassword function to generate a password
generateEl.addEventListener("click", randomPassword);

// addEventListener to copy password to clipboard
clipboardEl.addEventListener('click', () => {
    var textarea = document.createElement('textarea');
    var password = resultEl.value;

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

// Generator functions
// use string or array to assign to the criteria
// ASCII Code Table https://ascii.cl/
function getRandomLower() {
    var lowerString = "abcdefghijklmnopqrstuvwxyz";
    return lowerString[Math.floor(Math.random() * lowerString.length)];
}

function getRandomUpper() {
    var upperString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return upperString[Math.floor(Math.random() * upperString.length)];

}

function getRandomNumbers() {
    var numberStrings = "1234567890";
    return numberStrings[Math.floor(Math.random() * numberStrings.length)];
}

function getRandomSymbols() {
    var symbolString = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    return symbolString[Math.floor(Math.random() * symbolString.length)];
}