//JavaScript of Chat.ejs - Function

const socket = io();

const msgText = document.querySelector('#msg')  
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

let user_name;
do{
    user_name = prompt('Nickname:')
}while(!user_name)

document.querySelector('#name').textContent = user_name
msgText.focus()

btnSend.addEventListener('click',(e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
})

const sendMsg = message =>{
    let msg = {
        user: user_name,
        message: message.trim()
    }
    display(msg,'you-message')

    socket.emit('sendMessage',msg)
}

socket.on('sendToAll',msg =>{
    display(msg,'other-message')
    chatBox.scrollTop = chatBox.scrollHeight;
})

const display = (msg,type) =>{
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let times = new Date().toLocaleTimeString()

    let innerText = `
    <div class="message-title">
        <span>${msg.user}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${times}
    </div>
    `;
    
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)
}