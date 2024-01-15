const DEFAULT_TIMER_VALUE = 10;
const WINNING_SCORE = 20;

document.addEventListener('DOMContentLoaded', () => {
    const wordToGuessElement = document.getElementById('word-to-guess');
    const tabooWordsListElement = document.getElementById('taboo-words-list');
    const nextCardButton = document.getElementById('skip-button');

    nextCardButton.addEventListener('click', loadNewTabooCard);

    function loadNewTabooCard() {
        fetch('taboo-words.json')
            .then(response => response.json())
            .then(tabooCards => {
                const randomIndex = Math.floor(Math.random() * tabooCards.length);
                const card = tabooCards[randomIndex];
                displayTabooCard(card);
            })
            .catch(error => console.error('Error loading taboo cards:', error));
    }

    function displayTabooCard(card) {
        wordToGuessElement.textContent = card.word;
        tabooWordsListElement.innerHTML = '';
        card.tabooWords.forEach(tabooWord => {
            const listItem = document.createElement('li');
            listItem.textContent = tabooWord;
            tabooWordsListElement.appendChild(listItem);
        });
    }

    let redTeamScore = 0;
    let blueTeamScore = 0;
    let currentTeam = 'red';
    let timerValue = DEFAULT_TIMER_VALUE;
    let timerInterval = null;

    // Add event listeners for the new buttons
    document.getElementById('mistake-button').addEventListener('click', handleMistake);
    document.getElementById('skip-button').addEventListener('click', loadNewTabooCard);
    document.getElementById('success-button').addEventListener('click', handleSuccess);

    function handleMistake() {
        if (currentTeam === 'red') {
            redTeamScore--;
        } else {
            blueTeamScore--;
        }
        loadNewTabooCard(); // Display the next card when a mistake is made
        updateScores();
    }

    function handleSuccess() {
        if (currentTeam === 'red') {
            redTeamScore++;
        } else {
            blueTeamScore++;
        }
        loadNewTabooCard();
        updateScores();
        checkForWinner();
    }

    function checkForWinner() {
        if ((redTeamScore >= WINNING_SCORE || blueTeamScore >= WINNING_SCORE) && (redTeamScore !== blueTeamScore)) {
            clearInterval(timerInterval);
            const winningTeam = redTeamScore > blueTeamScore ? 'Red' : 'Blue';
            document.getElementById('end-screen').style.display = 'flex';
            document.getElementById('winning-team-name').textContent = `${winningTeam} Team Wins!`;
        }
    }

    function updateScores() {
        document.getElementById('team-red-score').textContent = `Red Team: ${redTeamScore}`;
        document.getElementById('team-blue-score').textContent = `Blue Team: ${blueTeamScore}`;
    }

    function switchTeam() {
        currentTeam = currentTeam === 'red' ? 'blue' : 'red';
        document.getElementById('current-team').textContent = `${currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)} Team's Turn`;
        timerValue = DEFAULT_TIMER_VALUE;
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        document.getElementById('timer').textContent = timerValue;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timerValue > 0) {
                timerValue--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                switchTeam();
            }
        }, 1000);
    }

    // Comment out the automatic start of the timer when the game loads
    // startTimer();

    // Show the pause screen at the start of the game
    document.getElementById('pause-screen').style.display = 'flex';

    // Add event listener for the continue button
    document.getElementById('continue-button').addEventListener('click', function() {
        document.getElementById('pause-screen').style.display = 'none';
        startTimer();
    });

    function switchTeam() {
        currentTeam = currentTeam === 'red' ? 'blue' : 'red';
        document.getElementById('current-team').textContent = `${currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)} Team's Turn`;
        timerValue = DEFAULT_TIMER_VALUE;
        updateTimerDisplay();
        // Show the pause screen and do not start the timer automatically
        document.getElementById('pause-screen').style.display = 'flex';
        clearInterval(timerInterval); // Stop the timer
    }

    // Update the initial load of a taboo card to use the new file path
    loadNewTabooCard();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('ServiceWorker registration successful with scope:', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed:', err);
        });
    });
}
