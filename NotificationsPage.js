
function NotificationsPage() {
    const [notifications, setNotifications] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('all');

    React.useEffect(() => {
        // Mock notifications
        const mockNotifications = [
            {
                id: 1,
                type: 'like',
                user: {
                    name: 'Sarah Johnson',
                    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
                },
                message: 'liked your photo',
                time: '2m ago',
                read: false,
                postImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=100&q=80'
            },
            {
                id: 2,
                type: 'comment',
                user: {
                    name: 'Mike Wilson',
                    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
                },
                message: 'commented on your post: "Amazing shot!"',
                time: '5m ago',
                read: false,
                postImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=100&q=80'
            },
            {
                id: 3,
                type: 'follow',
                user: {
                    name: 'Emma Davis',
                    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
                },
                message: 'started following you',
                time: '1h ago',
                read: true
            },
            {
                id: 4,
                type: 'mention',
                user: {
                    name: 'Alex Brown',
                    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
                },
                message: 'mentioned you in a comment',
                time: '2h ago',
                read: true,
                postImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=100&q=80'
            },
            {
                id: 5,
                type: 'like',
                user: {
                    name: 'Lisa Garcia',
                    avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
                },
                message: 'and 12 others liked your reel',
                time: '3h ago',
                read: true,
                postImage: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&w=100&q=80'
            }
        ];
        setNotifications(mockNotifications);
    }, []);

    const tabs = [
        { id: 'all', name: 'All' },
        { id: 'unread', name: 'Unread' },
        { id: 'mentions', name: 'Mentions' }
    ];

    const filteredNotifications = React.useMemo(() => {
        switch (activeTab) {
            case 'unread':
                return notifications.filter(n => !n.read);
            case 'mentions':
                return notifications.filter(n => n.type === 'mention');
            default:
                return notifications;
        }
    }, [notifications, activeTab]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'like':
                return 'fas fa-heart text-red-500';
            case 'comment':
                return 'fas fa-comment text-blue-500';
            case 'follow':
                return 'fas fa-user-plus text-green-500';
            case 'mention':
                return 'fas fa-at text-yellow-500';
            default:
                return 'fas fa-bell text-gray-500';
        }
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev => 
            prev.map(n => 
                n.id === notificationId ? { ...n, read: true } : n
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(n => ({ ...n, read: true }))
        );
    };

    return React.createElement(
        'div',
        { className: 'screen bg-gray-900 pb-20' },
        
        // Header
        React.createElement(
            'div',
            { className: 'flex items-center justify-between p-4 border-b border-gray-700' },
            React.createElement('h1', { className: 'text-xl font-semibold text-white' }, 'Notifications'),
            React.createElement(
                'button',
                { 
                    onClick: markAllAsRead,
                    className: 'text-blue-400 text-sm hover:text-blue-300 transition' 
                },
                'Mark all read'
            )
        ),

        // Tabs
        React.createElement(
            'div',
            { className: 'flex border-b border-gray-700' },
            tabs.map(tab =>
                React.createElement(
                    'button',
                    {
                        key: tab.id,
                        onClick: () => setActiveTab(tab.id),
                        className: `flex-1 py-3 px-4 text-center transition ${
                            activeTab === tab.id 
                                ? 'text-white border-b-2 border-blue-500' 
                                : 'text-gray-400 hover:text-gray-300'
                        }`
                    },
                    tab.name,
                    tab.id === 'unread' && notifications.filter(n => !n.read).length > 0 &&
                        React.createElement(
                            'span',
                            { className: 'ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full' },
                            notifications.filter(n => !n.read).length
                        )
                )
            )
        ),

        // Notifications List
        React.createElement(
            'div',
            { className: 'divide-y divide-gray-700' },
            filteredNotifications.length === 0 
                ? React.createElement(
                    'div',
                    { className: 'flex flex-col items-center justify-center py-16 text-gray-400' },
                    React.createElement('i', { className: 'fas fa-bell-slash text-4xl mb-4' }),
                    React.createElement('p', null, 'No notifications yet'),
                    React.createElement('p', { className: 'text-sm mt-2' }, 'When someone interacts with your posts, you\'ll see it here')
                )
                : filteredNotifications.map(notification =>
                    React.createElement(
                        'div',
                        {
                            key: notification.id,
                            onClick: () => markAsRead(notification.id),
                            className: `flex items-center space-x-3 p-4 hover:bg-gray-800 transition cursor-pointer ${
                                !notification.read ? 'bg-gray-800 bg-opacity-50' : ''
                            }`
                        },
                        React.createElement(
                            'div',
                            { className: 'relative' },
                            React.createElement('img', {
                                src: notification.user.avatar,
                                alt: notification.user.name,
                                className: 'w-12 h-12 rounded-full'
                            }),
                            React.createElement(
                                'div',
                                { className: 'absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center' },
                                React.createElement('i', { className: `${getNotificationIcon(notification.type)} text-xs` })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'flex-1' },
                            React.createElement(
                                'p',
                                { className: 'text-white text-sm' },
                                React.createElement('span', { className: 'font-semibold' }, notification.user.name),
                                ' ',
                                notification.message
                            ),
                            React.createElement('p', { className: 'text-gray-400 text-xs mt-1' }, notification.time)
                        ),
                        notification.postImage && React.createElement('img', {
                            src: notification.postImage,
                            alt: 'Post',
                            className: 'w-12 h-12 rounded object-cover'
                        }),
                        !notification.read && React.createElement(
                            'div',
                            { className: 'w-2 h-2 bg-blue-500 rounded-full' }
                        )
                    )
                )
        )
    );
}

window.NotificationsPage = NotificationsPage;
