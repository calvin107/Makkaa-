
// ChatScreen React component
function ChatScreen({ chat, onBack, currentUser }) {
    const [messages, setMessages] = React.useState([
        {
            id: 1,
            text: 'Hey! How are you doing?',
            sender: 'them',
            timestamp: '2:30 PM',
            avatar: chat.avatar
        },
        {
            id: 2,
            text: 'I\'m doing great! Thanks for asking. How about you?',
            sender: 'me',
            timestamp: '2:32 PM'
        },
        {
            id: 3,
            text: 'That\'s wonderful to hear! I\'m doing well too. Are we still on for tomorrow?',
            sender: 'them',
            timestamp: '2:35 PM',
            avatar: chat.avatar
        },
        {
            id: 4,
            text: 'Absolutely! Looking forward to it 😊',
            sender: 'me',
            timestamp: '2:36 PM'
        }
    ]);
    
    const [newMessage, setNewMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'me',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, message]);
            setNewMessage('');
            
            // Simulate typing indicator and response
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const response = {
                    id: messages.length + 2,
                    text: 'Thanks for your message! 👍',
                    sender: 'them',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    avatar: chat.avatar
                };
                setMessages(prev => [...prev, response]);
            }, 2000);
        }
    };

    return React.createElement(
        'div',
        { className: 'screen bg-gray-900 text-white flex flex-col' },
        
        // Header
        React.createElement(
            'div',
            { className: 'flex items-center p-4 bg-gray-800 border-b border-gray-700' },
            React.createElement(
                'button',
                {
                    onClick: onBack,
                    className: 'mr-3 p-2 hover:bg-gray-700 rounded-full transition-colors'
                },
                React.createElement('i', { className: 'fas fa-arrow-left' })
            ),
            React.createElement('img', {
                src: chat.avatar,
                alt: chat.name,
                className: 'w-10 h-10 rounded-full object-cover mr-3'
            }),
            React.createElement(
                'div',
                { className: 'flex-1' },
                React.createElement('h2', { className: 'font-semibold' }, chat.name),
                React.createElement(
                    'p',
                    { className: 'text-sm text-gray-400' },
                    chat.online ? 'Online' : 'Last seen recently'
                )
            ),
            React.createElement(
                'div',
                { className: 'flex space-x-2' },
                React.createElement(
                    'button',
                    { className: 'p-2 hover:bg-gray-700 rounded-full transition-colors' },
                    React.createElement('i', { className: 'fas fa-phone' })
                ),
                React.createElement(
                    'button',
                    { className: 'p-2 hover:bg-gray-700 rounded-full transition-colors' },
                    React.createElement('i', { className: 'fas fa-video' })
                )
            )
        ),
        
        // Messages area
        React.createElement(
            'div',
            { className: 'flex-1 overflow-y-auto p-4 space-y-4' },
            messages.map(message =>
                React.createElement(
                    'div',
                    {
                        key: message.id,
                        className: `flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`
                    },
                    React.createElement(
                        'div',
                        { className: `flex ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} items-end max-w-xs lg:max-w-md` },
                        message.sender === 'them' && React.createElement('img', {
                            src: message.avatar,
                            alt: 'Avatar',
                            className: 'w-8 h-8 rounded-full object-cover mr-2'
                        }),
                        React.createElement(
                            'div',
                            { className: `px-4 py-2 rounded-lg ${message.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'}` },
                            React.createElement('p', null, message.text),
                            React.createElement(
                                'p',
                                { className: `text-xs mt-1 ${message.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'}` },
                                message.timestamp
                            )
                        )
                    )
                )
            ),
            
            // Typing indicator
            isTyping && React.createElement(
                'div',
                { className: 'flex justify-start' },
                React.createElement(
                    'div',
                    { className: 'flex items-end' },
                    React.createElement('img', {
                        src: chat.avatar,
                        alt: 'Avatar',
                        className: 'w-8 h-8 rounded-full object-cover mr-2'
                    }),
                    React.createElement(
                        'div',
                        { className: 'bg-gray-700 px-4 py-2 rounded-lg' },
                        React.createElement(
                            'div',
                            { className: 'flex space-x-1' },
                            React.createElement('div', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce' }),
                            React.createElement('div', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce', style: { animationDelay: '0.1s' } }),
                            React.createElement('div', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce', style: { animationDelay: '0.2s' } })
                        )
                    )
                )
            )
        ),
        
        // Message input
        React.createElement(
            'div',
            { className: 'p-4 bg-gray-800 border-t border-gray-700' },
            React.createElement(
                'form',
                { onSubmit: handleSendMessage, className: 'flex items-center space-x-2' },
                React.createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'p-2 text-gray-400 hover:text-white transition-colors'
                    },
                    React.createElement('i', { className: 'fas fa-paperclip' })
                ),
                React.createElement('input', {
                    type: 'text',
                    value: newMessage,
                    onChange: (e) => setNewMessage(e.target.value),
                    placeholder: 'Type a message...',
                    className: 'flex-1 bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                }),
                React.createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'p-2 text-gray-400 hover:text-white transition-colors'
                    },
                    React.createElement('i', { className: 'fas fa-smile' })
                ),
                React.createElement(
                    'button',
                    {
                        type: 'submit',
                        className: 'bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full transition-colors disabled:opacity-50',
                        disabled: !newMessage.trim()
                    },
                    React.createElement('i', { className: 'fas fa-paper-plane text-white' })
                )
            )
        )
    );
}

// Make the component available globally
window.ChatScreen = ChatScreen;
