/* HOW GAME WORKS:
- Player must guess a number between the min and max numbers
- Player gets a fixed amount of guesses
- Notify the player of remaining guesses
- Notify the player of the correct answer if they lose
- Let player choose to play again */

// Game values
let min = 1,
	max = 10,
	winningNum = getRandomNumber(min, max),
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

// Add event listener for play again
gameWrap.addEventListener('mousedown', (e) => {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

// Add event listener for button
guessBtn.addEventListener('click', () => {
	let guess = parseInt(guessValue.value);

	// Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	if (guess === winningNum) {
		// Game over - win case
		gameOver(true, `You win! ${winningNum} is correct!`);
	} else {
		// Wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// Game over - lose case
			gameOver(false, `You lose! The correct answer is ${winningNum}`);
		} else {
			// Game continues - answer wrong
			// Change border to red
			guessValue.style.borderColor = 'red';

			// Clear input
			guessValue.value = '';

			// Set warning message
			setMessage(
				`${guess} is incorrect! You have ${guessesLeft} guess(es) left`,
				'red'
			);
		}
	}
});

// Get winning number
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game over
function gameOver(win, message) {
	let color;

	// Clear input
	guessValue.value = '';

	// Disable input
	guessValue.disabled = true;

	color = win ? 'green' : 'red';
	guessValue.style.borderColor = color;

	// Set winning message
	setMessage(message, color);

	// Play again
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// Set a message
function setMessage(message, color) {
	results.style.color = color;
	results.textContent = message;
}
