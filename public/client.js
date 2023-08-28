const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please enter your name: ')
} while(!name)

function sendEvent(){
    const msg = textarea.value;
    if (!msg.trim()) {
        return;
    }
    const args = msg.split(' ');
    
    if(msg[0]=='/' &&  args.length == 1){
        const slashCommand = args[0].toLowerCase();
        handleSlashCommand(slashCommand)
    }else{
        sendMessage(msg)
    }    
}

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
    
        const msg = (e.target.value);
        if (!msg.trim()) {
            return;
        }
        const args = msg.split(' ');
        
        if(msg[0]=='/' &&  args.length == 1){
            const slashCommand = args[0].toLowerCase();
            handleSlashCommand(slashCommand)
        }else{
            sendMessage(e.target.value)
        }
    }
})

// Your existing code...

// Emoji mapping


function convertWordsToEmojis(message) {
    const emojiMap = {
        'hey': '👋',
    'react': '⚛️',
    'lol': '🤣',
    'happy': '😁',
    'sad': '😔',
    'heart': '❤️',
    'thumbsup': '👍',
    'thumbsdown': '👎',
    'star': '⭐️',
    'fire': '🔥',
    'rocket': '🚀',
    'sun': '☀️',
    'moon': '🌙',
    'cloud': '☁️',
    'rainbow': '🌈',
    'coffee': '☕️',
    'cake': '🍰',
    'pizza': '🍕',
    'taco': '🌮',
    'book': '📚',
    'music': '🎵',
    'movie': '🎬',
    'guitar': '🎸',
    'football': '⚽️',
    'basketball': '🏀',
    'globe': '🌍',
    'umbrella': '☔️',
    'camera': '📷',
    'gift': '🎁',
    'flag': '🚩',
    'clock': '🕒',
    'cat': '🐱',
    'dog': '🐶',
    'unicorn': '🦄',
    'dolphin': '🐬',
    'penguin': '🐧',
    'elephant': '🐘',
    'flamingo': '🦩',
    'butterfly': '🦋',
    'hamburger': '🍔',
    'icecream': '🍦',
    'cookie': '🍪',
    'banana': '🍌',
    // Add more word-emoji mappings as needed
    };

    // message = message;
const words = message.split(/[\s,.!?;:]+/);
   const convertedWords = words.map(word => {
        const emoji = emojiMap[word.toLowerCase()];
        return emoji ? emoji : word;
    });
    return convertedWords.join(' ');
}
function sendMessage(message) {
    let msg = {
        user: name,
        message: convertWordsToEmojis(message)
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    mainDiv.style.padding='10px'
    const currentHour = new Date().getHours();
    const formattedHour = (currentHour < 10 ? '0' : '') + currentHour;
    const currentMinute = new Date().getMinutes();
    const formattedMinute = (currentMinute < 10 ? '0' : '') + currentMinute;
    let ampm = "";

    if (currentHour >= 0 && currentHour < 12) {
    ampm = "AM";
    } else {
    ampm = "PM";
    }
    
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <p class="text-sm">${formattedHour}:${formattedMinute} ${ampm}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

function handleSlashCommand(command) {
    console.log(command.toString().trim() === "/help");

    switch (command.toString().trim()) {
        case '/help':
            displayHelp();
            break;
        case '/info':
            displayInfo();
            break;
        case '/map':
            displayMap();
            break;
        case '/clear':
            clearMessages();
            break;
        case '/random':
            sendRandomNumber();
            break;
        case '/joke':
            sendDankJoke();
            break;                
        default:
            sendMessage('Invalid command'+command+'. Type /help for available commands.');
            break;
    }
}

async function fetchDankJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=dank');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dank joke:', error);
        return null;
    }
}

function displayHelp() {
    const helpMessage = 'Available commands: <br>' +
                        '/help - Display available commands <br>' +
                        '/info - Display information <br>' +
                        '/map - List of Convertable Words <br>' +
                        '/clear - Clear messages <br>' +
                        '/random - Generate a random number <br>' +
                        '/joke - Get a Random joke';
    sendMessage(helpMessage);
}

function displayInfo() {
    const infoMessage = 'This is a simple chat application. <br>' +
                        'It allows you to send messages and use slash commands.';
    sendMessage(infoMessage);
}

function  displayMap() {
    const EmojiMap = 
            '<br>hey<br>' +
            'react<br>' +
            'lol<br>' +
            'happy<br>' +
            'sad<br>' +
            'heart<br>' +
            'thumbsup<br>' +
            'thumbsdown<br>' +
            'star<br>' +
            'fire<br>' +
            'rocket<br>' +
            'sun<br>' +
            'moon<br>' +
            'cloud<br>' +
            'rainbow<br>' +
            'coffee<br>' +
            'cake<br>' +
            'pizza<br>' +
            'taco<br>' +
            'book<br>' +
            'music<br>' +
            'movie<br>' +
            'guitar<br>' +
            'football<br>' +
            'basketball<br>' +
            'globe<br>' +
            'umbrella<br>' +
            'camera<br>' +
            'gift<br>' +
            'flag<br>' +
            'clock<br>' +
            'cat<br>' +
            'dog<br>' +
            'unicorn<br>' +
            'dolphin<br>' +
            'penguin<br>' +
            'elephant<br>' +
            'flamingo<br>' +
            'butterfly<br>' +
            'hamburger<br>' +
            'icecream<br>' +
            'cookie<br>' +
            'banana';
    
    sendMessage('Try typing these Words<br>' + EmojiMap);
}

function clearMessages() {
    messageArea.innerHTML = '';
    textarea.value = ''
}

function sendRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    sendMessage('Random Number - ' + randomNumber);
}

async function sendDankJoke() {
    const dankJokeData = await fetchDankJoke();

    if (dankJokeData && dankJokeData.joke) {
        sendMessage('Joke - ' + dankJokeData.joke);
    } else {
        sendMessage('Failed to fetch a Joke. Please try again later.');
    }
}