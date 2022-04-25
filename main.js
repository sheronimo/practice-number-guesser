/* HOW GAME WORKS:
- Player must guess a number between the min and max numbers
- Player gets a fixed amount of guesses
- Notify the player of remaining guesses
- Notify the player of the correct answer if they lose
- Let player choose to play again */

// Game values
let min = 1,
	max = 10,
	winningNum = 2, // for testing purposes only, will be random
	guessesLeft = 3;

// UI elements
const gameWrap = document.querySelector('#game'),
	minNum = document.querySelector('#min-num'),
	maxNum = document.querySelector('#max-num'),
	guessValue = document.querySelector('#guess-input'),
	guessBtn = document.querySelector('#guess-btn'),
	results = document.querySelector('#result-message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Add event listener for button
guessBtn.addEventListener('click', () => {
	let guess = parseInt(guessValue.value);

	// Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if winning number
	if (guess === winningNum) {
		// Game over - win case
		// Disable input
		guessValue.disabled = true;
		// Change border to green
		guessValue.style.borderColor = 'green';
		// Set winning message
		setMessage(`You win! ${winningNum} is correct! `, 'green');
	} else {
		// Wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// Game over - lose case
			// Disable input
			guessValue.disabled = true;
			// Change border to red
			guessValue.style.borderColor = 'red';
			// Set losing message
			setMessage(`You lose! The correct answer is ${winningNum}`, 'red');
		} else {
			// Game continues - answer wrong
			// Change border to red
			guessValue.style.borderColor = 'red';
			// Set warning message
			setMessage(
				`${guess} is incorrect! You have ${guessesLeft} guess(es) left`,
				'red'
			);
		}
	}
});

// Set a message
function setMessage(message, color) {
	results.style.color = color;
	results.textContent = message;
}
