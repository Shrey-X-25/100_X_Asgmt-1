const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        msg = convertWordsToEmojis(e.target.value)
        sendMessage(msg)
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
        'like': '❤️',
        'hbd': '🎉🎈🎊',
        // Add more word-emoji mappings as needed
    };
    const words = message.split(' ');
    const convertedWords = words.map(word => {
        const emoji = emojiMap[word.toLowerCase()];
        return emoji ? emoji : word;
    });
    return convertedWords.join(' ');
}

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
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