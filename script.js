document.addEventListener('DOMContentLoaded', () => {
    const continueButton = document.getElementById('continue-button');
    continueButton.addEventListener('click', processInput);
});

let songs = [];
let correctSongIndex;

function processInput() {
    const input = document.getElementById('song-links').value;
    console.log("🚀 ~ file: script.js:11 ~ processInput ~ input:", input)
    songs = input.split('\n')
                 .map(line => {
                     const parts = line.split(' by ');
                     console.log("🚀 ~ file: script.js:15 ~ processInput ~ parts:", parts)
                     if (parts.length > 1) {
                         const title = parts[0].replace('*', '').trim();
                         const link = parts[1].split(' ')[1].trim();
                         return { title, link };
                     }
                     return null;
                 })
                 .filter(song => song !== null);

    if (songs.length >= 3) {
        document.getElementById('input-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        startGame();
    } else {
        alert('Please enter at least 3 YouTube links.');
    }
}

function startGame() {
    correctSongIndex = Math.floor(Math.random() * songs.length);
    console.log("🚀 ~ file: script.js:34 ~ startGame ~ correctSongIndex:", correctSongIndex, songs)
    createPlayer(songs[correctSongIndex].link);
    generateOptions();
}

function createPlayer(songLink) {
    console.log("🚀 ~ file: script.js:39 ~ createPlayer ~ songLink:", songLink)
    const playerDiv = document.getElementById('player');
    console.log("🚀 ~ file: script.js:41 ~ createPlayer ~ playerDiv:", playerDiv)
    // playerDiv.innerHTML = `<iframe width="560" height="315" src="${songLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    // playerDiv.innerHTML = `<iframe src="http://www.youtube.com/embed/W7qWa52k-nE"width="560" height="315" frameborder="0" allowfullscreen></iframe>`

    playerDiv.innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/CKZvWhCqx1s?si=OmDfmJXj-Lz1vUMt?autoplay=1" title="YouTube video player" frameborder="0"  allow="autoplay" allowfullscreen></iframe>
    `
    // playerDiv.innerHTML = `
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/gL0osl_vcjE?autoplay=1" title="YouTube video player" frameborder="0" allow="autoplay" allowfullscreen></iframe>
    // `
    //     <iframe id="ytplayer" type="text/html" width="640" height="360"
//     allow="autoplay"
//   src="https://www.youtube.com/embed/Tc0tLGWIqxA"
//   referrerpolicy="no-referrer-when-downgrade"
//   frameborder="0"></iframe>
}

function generateOptions() {
    let options = [songs[correctSongIndex].title];
    while (options.length < 3) {
        let randomIndex = Math.floor(Math.random() * songs.length);
        if (randomIndex !== correctSongIndex) {
            options.push(songs[randomIndex].title);
        }
    }
    shuffleArray(options);

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-button';
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedTitle) {
    if (selectedTitle === songs[correctSongIndex].title) {
        alert('Correct!');
    } else {
        alert('Incorrect. Try again!');
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
