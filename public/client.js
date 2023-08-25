const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        // handleSlashCommand(e.target.value)
        // msg = convertWordsToEmojis(e.target.value)
        const msg = (e.target.value);
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

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
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
        case '/clear':
            clearMessages();
            break;
        default:
            sendMessage('Invalid command'+command+'. Type /help for available commands.');
            break;
    }
}

function displayHelp() {
    const helpMessage = 'Available commands:\n' +
                        '/help - Display available commands\n' +
                        '/info - Display information\n' +
                        '/clear - Clear messages';
    sendMessage(helpMessage);
}

function displayInfo() {
    const infoMessage = 'This is a simple chat application.\n' +
                        'It allows you to send messages and use slash commands.';
    sendMessage(infoMessage);
}

function clearMessages() {
    messageArea.innerHTML = '';
    textarea.value = ''
}