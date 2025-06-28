
function ExplorePage() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [activeCategory, setActiveCategory] = React.useState('all');

    const categories = [
        { id: 'all', name: 'All', icon: 'fas fa-th' },
        { id: 'trending', name: 'Trending', icon: 'fas fa-fire' },
        { id: 'photos', name: 'Photos', icon: 'fas fa-image' },
        { id: 'videos', name: 'Videos', icon: 'fas fa-video' },
        { id: 'people', name: 'People', icon: 'fas fa-users' }
    ];

    React.useEffect(() => {
        // Mock explore data
        const mockPosts = [
            {
                id: 1,
                type: 'photo',
                imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
                likes: 1250,
                comments: 89,
                user: {
                    name: 'Travel Explorer',
                    avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
                }
            },
            {
                id: 2,
                type: 'video',
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
                likes: 890,
                comments: 67,
                user: {
                    name: 'Fitness Guru',
                    avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
                }
            },
            {
                id: 3,
                type: 'photo',
                imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
                likes: 2100,
                comments: 156,
                user: {
                    name: 'Food Lover',
                    avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
                }
            },
            {
                id: 4,
                type: 'photo',
                imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
                likes: 567,
                comments: 23,
                user: {
                    name: 'Tech Blogger',
                    avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
                }
            },
            {
                id: 5,
                type: 'video',
                imageUrl: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&w=400&q=80',
                likes: 3400,
                comments: 234,
                user: {
                    name: 'Music Artist',
                    avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
                }
            },
            {
                id: 6,
                type: 'photo',
                imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
                likes: 890,
                comments: 45,
                user: {
                    name: 'Business Pro',
                    avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
                }
            }
        ];
        
        setPosts(mockPosts);
        setLoading(false);
    }, []);

    const filteredPosts = React.useMemo(() => {
        if (activeCategory === 'all') return posts;
        return posts.filter(post => post.type === activeCategory || 
            (activeCategory === 'trending' && post.likes > 1000));
    }, [posts, activeCategory]);

    if (loading) {
        return React.createElement(
            'div',
            { className: 'flex items-center justify-center h-screen' },
            React.createElement('div', { className: 'text-white' }, 'Loading...')
        );
    }

    return React.createElement(
        'div',
        { className: 'screen p-4 pb-20' },
        
        // Header
        React.createElement(
            'div',
            { className: 'flex justify-between items-center mb-6' },
            React.createElement('h1', { className: 'text-2xl font-semibold text-white' }, 'Explore'),
            React.createElement(
                'button',
                { className: 'p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition' },
                React.createElement('i', { className: 'fas fa-search text-white' })
            )
        ),

        // Categories
        React.createElement(
            'div',
            { className: 'flex space-x-2 mb-6 overflow-x-auto pb-2' },
            categories.map(category =>
                React.createElement(
                    'button',
                    {
                        key: category.id,
                        onClick: () => setActiveCategory(category.id),
                        className: `flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition ${
                            activeCategory === category.id 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`
                    },
                    React.createElement('i', { className: category.icon }),
                    React.createElement('span', null, category.name)
                )
            )
        ),

        // Posts Grid
        React.createElement(
            'div',
            { className: 'grid grid-cols-2 gap-3' },
            filteredPosts.map(post =>
                React.createElement(
                    'div',
                    {
                        key: post.id,
                        className: 'relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform'
                    },
                    React.createElement('img', {
                        src: post.imageUrl,
                        alt: 'Post',
                        className: 'w-full h-48 object-cover'
                    }),
                    
                    // Video indicator
                    post.type === 'video' && React.createElement(
                        'div',
                        { className: 'absolute top-2 right-2' },
                        React.createElement('i', { className: 'fas fa-play text-white bg-black bg-opacity-50 p-2 rounded-full' })
                    ),
                    
                    // Overlay with stats
                    React.createElement(
                        'div',
                        { className: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3' },
                        React.createElement(
                            'div',
                            { className: 'flex items-center justify-between text-white text-sm' },
                            React.createElement(
                                'div',
                                { className: 'flex items-center space-x-2' },
                                React.createElement('i', { className: 'fas fa-heart' }),
                                React.createElement('span', null, post.likes)
                            ),
                            React.createElement(
                                'div',
                                { className: 'flex items-center space-x-2' },
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

window.ExplorePage = ExplorePage;
