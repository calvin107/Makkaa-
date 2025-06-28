
function ProfilePage() {
    const { currentUser } = useAuth();
    const [userPosts, setUserPosts] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('posts');
    const [followers, setFollowers] = React.useState(1250);
    const [following, setFollowing] = React.useState(890);

    React.useEffect(() => {
        // Mock user posts
        const mockPosts = [
            {
                id: 1,
                imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
                likes: 125,
                comments: 23
            },
            {
                id: 2,
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
                likes: 89,
                comments: 12
            },
            {
                id: 3,
                imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
                likes: 210,
                comments: 45
            }
        ];
        setUserPosts(mockPosts);
    }, []);

    const tabs = [
        { id: 'posts', name: 'Posts', icon: 'fas fa-th' },
        { id: 'reels', name: 'Reels', icon: 'fas fa-video' },
        { id: 'tagged', name: 'Tagged', icon: 'fas fa-user-tag' }
    ];

    return React.createElement(
        'div',
        { className: 'screen bg-gray-900' },
        
        // Header
        React.createElement(
            'div',
            { className: 'flex justify-between items-center p-4 border-b border-gray-700' },
            React.createElement('h1', { className: 'text-xl font-semibold text-white' }, currentUser?.displayName || 'Profile'),
            React.createElement(
                'button',
                { className: 'p-2 rounded-full hover:bg-gray-800 transition' },
                React.createElement('i', { className: 'fas fa-ellipsis-v text-white' })
            )
        ),

        // Profile Info
        React.createElement(
            'div',
            { className: 'p-4' },
            React.createElement(
                'div',
                { className: 'flex items-center space-x-4 mb-4' },
                React.createElement('img', {
                    src: currentUser?.photoURL || 'https://randomuser.me/api/portraits/men/1.jpg',
                    alt: 'Profile',
                    className: 'w-20 h-20 rounded-full border-2 border-gray-600'
                }),
                React.createElement(
                    'div',
                    { className: 'flex-1' },
                    React.createElement(
                        'div',
                        { className: 'flex space-x-6 mb-2' },
                        React.createElement(
                            'div',
                            { className: 'text-center' },
                            React.createElement('div', { className: 'text-xl font-semibold text-white' }, userPosts.length),
                            React.createElement('div', { className: 'text-sm text-gray-400' }, 'Posts')
                        ),
                        React.createElement(
                            'div',
                            { className: 'text-center cursor-pointer' },
                            React.createElement('div', { className: 'text-xl font-semibold text-white' }, followers),
                            React.createElement('div', { className: 'text-sm text-gray-400' }, 'Followers')
                        ),
                        React.createElement(
                            'div',
                            { className: 'text-center cursor-pointer' },
                            React.createElement('div', { className: 'text-xl font-semibold text-white' }, following),
                            React.createElement('div', { className: 'text-sm text-gray-400' }, 'Following')
                        )
                    ),
                    React.createElement(
                        'button',
                        { className: 'w-full py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition' },
                        'Edit Profile'
                    )
                )
            ),
            
            // Bio
            React.createElement(
                'div',
                { className: 'mb-4' },
                React.createElement('p', { className: 'text-white font-medium' }, currentUser?.displayName || 'Demo User'),
                React.createElement('p', { className: 'text-gray-400 text-sm mt-1' }, 'Living life to the fullest ✨\nLove, Travel, Adventure 🌍'),
                React.createElement('p', { className: 'text-blue-400 text-sm mt-1' }, 'www.example.com')
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
                        className: `flex-1 py-3 text-center transition ${
                            activeTab === tab.id 
                                ? 'text-white border-b-2 border-white' 
                                : 'text-gray-400 hover:text-gray-300'
                        }`
                    },
                    React.createElement('i', { className: tab.icon })
                )
            )
        ),

        // Posts Grid
        React.createElement(
            'div',
            { className: 'grid grid-cols-3 gap-1 p-1' },
            userPosts.map(post =>
                React.createElement(
                    'div',
                    {
                        key: post.id,
                        className: 'relative aspect-square bg-gray-800 cursor-pointer hover:opacity-80 transition'
                    },
                    React.createElement('img', {
                        src: post.imageUrl,
                        alt: 'Post',
                        className: 'w-full h-full object-cover'
                    }),
                    React.createElement(
                        'div',
                        { className: 'absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition flex items-center justify-center' },
                        React.createElement(
                            'div',
                            { className: 'flex space-x-4 text-white opacity-0 hover:opacity-100 transition' },
                            React.createElement(
                                'div',
                                { className: 'flex items-center space-x-1' },
                                React.createElement('i', { className: 'fas fa-heart' }),
                                React.createElement('span', null, post.likes)
                            ),
                            React.createElement(
                                'div',
                                { className: 'flex items-center space-x-1' },
                                React.createElement('i', { className: 'fas fa-comment' }),
                                React.createElement('span', null, post.comments)
                            )
                        )
                    )
                )
            )
        )
    );
}

window.ProfilePage = ProfilePage;
