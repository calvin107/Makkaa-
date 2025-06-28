
// ChatsListScreen React component
function ChatsListScreen({ onChatSelect, currentUser }) {
    const [chats, setChats] = React.useState([
        {
            id: 1,
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            lastMessage: 'Hey! How are you doing?',
            time: '2:30 PM',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Mike Chen',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            lastMessage: 'See you tomorrow!',
            time: '1:45 PM',
            unread: 0,
            online: false
        },
        {
            id: 3,
            name: 'Emma Wilson',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            lastMessage: 'Thanks for your help 😊',
            time: '12:20 PM',
            unread: 1,
            online: true
        },
        {
            id: 4,
            name: 'David Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
            lastMessage: 'Great work on the project!',
            time: '11:15 AM',
            unread: 0,
            online: false
        },
        {
            id: 5,
            name: 'Lisa Thompson',
            avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
            lastMessage: 'Can we reschedule?',
            time: 'Yesterday',
            unread: 3,
            online: true
        }
    ]);

    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return React.createElement(
        'div',
        { className: 'screen bg-gray-900 text-white' },
        React.createElement(
            'div',
            { className: 'p-4' },
            
            // Header
            React.createElement(
                'div',
                { className: 'flex items-center justify-between mb-6' },
                React.createElement('h1', { className: 'text-2xl font-semibold' }, 'Chats'),
                React.createElement(
                    'button',
                    { className: 'bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full transition-colors' },
                    React.createElement('i', { className: 'fas fa-edit text-white' })
                )
            ),
            
            // Search bar
            React.createElement(
                'div',
                { className: 'relative mb-6' },
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Search conversations...',
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    className: 'w-full py-3 pl-10 pr-4 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                }),
                React.createElement(
                    'span',
                    { className: 'absolute left-3 top-3 text-gray-400' },
                    React.createElement('i', { className: 'fas fa-search' })
                )
            ),
            
            // Chats list
            React.createElement(
                'div',
                { className: 'space-y-2' },
                filteredChats.map(chat =>
                    React.createElement(
                        'div',
                        {
                            key: chat.id,
                            className: 'flex items-center p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors',
                            onClick: () => onChatSelect && onChatSelect(chat)
                        },
                        
                        // Avatar with online indicator
                        React.createElement(
                            'div',
                            { className: 'relative mr-3' },
                            React.createElement('img', {
                                src: chat.avatar,
                                alt: chat.name,
                                className: 'w-12 h-12 rounded-full object-cover'
                            }),
                            chat.online && React.createElement(
                                'div',
                                { className: 'absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full' }
                            )
                        ),
                        
                        // Chat info
                        React.createElement(
                            'div',
                            { className: 'flex-1 min-w-0' },
                            React.createElement(
                                'div',
                                { className: 'flex items-center justify-between mb-1' },
                                React.createElement(
                                    'h3',
                                    { className: 'font-semibold text-white truncate' },
                                    chat.name
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'text-xs text-gray-400' },
                                    chat.time
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'flex items-center justify-between' },
                                React.createElement(
                                    'p',
                                    { className: 'text-gray-400 text-sm truncate' },
                                    chat.lastMessage
                                ),
                                chat.unread > 0 && React.createElement(
                                    'span',
                                    { className: 'bg-indigo-600 text-white text-xs px-2 py-1 rounded-full ml-2' },
                                    chat.unread
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

// Make the component available globally
window.ChatsListScreen = ChatsListScreen;
