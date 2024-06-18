document.addEventListener('DOMContentLoaded', () => {
    const passwordElement = document.getElementById('password');
    const lengthElement = document.getElementById('length');
    const lowercaseElement = document.getElementById('lowercase');
    const uppercaseElement = document.getElementById('uppercase');
    const numbersElement = document.getElementById('numbers');
    const symbolsElement = document.getElementById('symbols');
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');

    const getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    const getRandomSymbol = () => {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    };

    const generatePassword = (length, lower, upper, number, symbol) => {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

        if (typesCount === 0) {
            return '';
        }

        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        return generatedPassword.slice(0, length);
    };

    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };

    generateButton.addEventListener('click', () => {
        const length = +lengthElement.value;
        const hasLower = lowercaseElement.checked;
        const hasUpper = uppercaseElement.checked;
        const hasNumber = numbersElement.checked;
        const hasSymbol = symbolsElement.checked;

        passwordElement.value = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
    });

    copyButton.addEventListener('click', () => {
        const password = passwordElement.value;
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        });
    });
});
