
// ReelsScreen React component
function ReelsScreen({ currentUser }) {
    const [reels, setReels] = React.useState([
        {
            id: 1,
            author: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            thumbnail: 'https://picsum.photos/400/600?random=1',
            caption: 'Beautiful sunset at the beach! 🌅 #sunset #beach #nature',
            likes: 1234,
            comments: 89,
            shares: 45,
            music: 'Summer Vibes - Artist Name'
        },
        {
            id: 2,
            author: 'Mike Chen',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
            thumbnail: 'https://picsum.photos/400/600?random=2',
            caption: 'Quick cooking tutorial! Try this at home 👨‍🍳 #cooking #food #tutorial',
            likes: 2567,
            comments: 156,
            shares: 78,
            music: 'Cooking Beat - Chef Sounds'
        },
        {
            id: 3,
            author: 'Emma Wilson',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            thumbnail: 'https://picsum.photos/400/600?random=3',
            caption: 'Dance challenge! Who\'s next? 💃 #dance #challenge #fun',
            likes: 3421,
            comments: 234,
            shares: 123,
            music: 'Dance Hit 2024 - PopStar'
        }
    ]);

    const [currentReelIndex, setCurrentReelIndex] = React.useState(0);
    const [liked, setLiked] = React.useState({});
    const [following, setFollowing] = React.useState({});

    const currentReel = reels[currentReelIndex];

    const handleLike = (reelId) => {
        setLiked(prev => ({
            ...prev,
            [reelId]: !prev[reelId]
        }));
        
        setReels(prev => prev.map(reel => 
            reel.id === reelId 
                ? { ...reel, likes: reel.likes + (liked[reelId] ? -1 : 1) }
                : reel
        ));
    };

    const handleFollow = (reelId) => {
        setFollowing(prev => ({
            ...prev,
            [reelId]: !prev[reelId]
        }));
    };

    const handlePrevious = () => {
        setCurrentReelIndex(prev => prev > 0 ? prev - 1 : reels.length - 1);
    };

    const handleNext = () => {
        setCurrentReelIndex(prev => prev < reels.length - 1 ? prev + 1 : 0);
    };

    return React.createElement(
        'div',
        { className: 'screen bg-black text-white overflow-y-scroll snap-y snap-mandatory' },
        
        // Header
        React.createElement(
            'div',
            { className: 'fixed top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent' },
            React.createElement(
                'div',
                { className: 'flex items-center justify-between' },
                React.createElement('h1', { className: 'text-xl font-semibold' }, 'Reels'),
                React.createElement(
                    'button',
                    { className: 'p-2 hover:bg-white/20 rounded-full transition-colors' },
                    React.createElement('i', { className: 'fas fa-camera text-white' })
                )
            )
        ),

        // Reel container
        React.createElement(
            'div',
            { className: 'relative h-screen w-full flex items-center justify-center' },
            
            // Background image/video placeholder
            React.createElement(
                'div',
                { 
                    className: 'absolute inset-0 bg-cover bg-center',
                    style: { backgroundImage: `url(${currentReel.thumbnail})` }
                }
            ),
            
            // Content overlay
            React.createElement(
                'div',
                { className: 'absolute inset-0 bg-black/30' }
            ),
            
            // Navigation arrows
            React.createElement(
                'button',
                {
                    onClick: handlePrevious,
                    className: 'absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-20'
                },
                React.createElement('i', { className: 'fas fa-chevron-up text-white' })
            ),
            
            React.createElement(
                'button',
                {
                    onClick: handleNext,
                    className: 'absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-20'
                },
                React.createElement('i', { className: 'fas fa-chevron-down text-white' })
            ),
            
            // Reel content
            React.createElement(
                'div',
                { className: 'relative z-10 w-full h-full flex' },
                
                // Left side - Author info and caption
                React.createElement(
                    'div',
                    { className: 'flex-1 flex flex-col justify-end p-4' },
                    
                    // Author info
                    React.createElement(
                        'div',
                        { className: 'flex items-center mb-3' },
                        React.createElement('img', {
                            src: currentReel.avatar,
                            alt: currentReel.author,
                            className: 'w-10 h-10 rounded-full object-cover mr-3 border-2 border-white'
                        }),
                        React.createElement(
                            'div',
                            { className: 'flex-1' },
                            React.createElement('h3', { className: 'font-semibold text-white' }, currentReel.author),
                            React.createElement(
                                'p',
                                { className: 'text-sm text-gray-300 flex items-center' },
                                React.createElement('i', { className: 'fas fa-music mr-1' }),
                                currentReel.music
                            )
                        ),
                        React.createElement(
                            'button',
                            {
                                onClick: () => handleFollow(currentReel.id),
                                className: `px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
                                    following[currentReel.id] 
                                        ? 'bg-gray-600 text-white' 
                                        : 'bg-white text-black hover:bg-gray-200'
                                }`
                            },
                            following[currentReel.id] ? 'Following' : 'Follow'
                        )
                    ),
                    
                    // Caption
                    React.createElement(
                        'div',
                        { className: 'mb-4' },
                        React.createElement('p', { className: 'text-white text-sm' }, currentReel.caption)
                    )
                ),
                
                // Right side - Action buttons
                React.createElement(
                    'div',
                    { className: 'flex flex-col justify-end items-center p-4 space-y-4' },
                    
                    // Like button
                    React.createElement(
                        'div',
                        { className: 'flex flex-col items-center' },
                        React.createElement(
                            'button',
                            {
                                onClick: () => handleLike(currentReel.id),
                                className: `p-3 rounded-full transition-colors ${
                                    liked[currentReel.id] ? 'text-red-500' : 'text-white hover:text-red-500'
                                }`
                            },
                            React.createElement('i', { 
                                className: `${liked[currentReel.id] ? 'fas' : 'far'} fa-heart text-2xl` 
                            })
                        ),
                        React.createElement(
                            'span',
                            { className: 'text-white text-xs mt-1' },
                            currentReel.likes.toLocaleString()
                        )
                    ),
                    
                    // Comment button
                    React.createElement(
                        'div',
                        { className: 'flex flex-col items-center' },
                        React.createElement(
                            'button',
                            { className: 'p-3 text-white hover:text-blue-400 transition-colors' },
                            React.createElement('i', { className: 'far fa-comment text-2xl' })
                        ),
                        React.createElement(
                            'span',
                            { className: 'text-white text-xs mt-1' },
                            currentReel.comments
                        )
                    ),
                    
                    // Share button
                    React.createElement(
                        'div',
                        { className: 'flex flex-col items-center' },
                        React.createElement(
                            'button',
                            { className: 'p-3 text-white hover:text-green-400 transition-colors' },
                            React.createElement('i', { className: 'far fa-paper-plane text-2xl' })
                        ),
                        React.createElement(
                            'span',
                            { className: 'text-white text-xs mt-1' },
                            currentReel.shares
                        )
                    ),
                    
                    // More options
                    React.createElement(
                        'button',
                        { className: 'p-3 text-white hover:text-gray-300 transition-colors' },
                        React.createElement('i', { className: 'fas fa-ellipsis-vertical text-2xl' })
                    )
                )
            )
        ),
        
        // Progress indicators
        React.createElement(
            'div',
            { className: 'fixed bottom-20 left-4 right-4 flex space-x-1 z-10' },
            reels.map((_, index) =>
                React.createElement(
                    'div',
                    {
                        key: index,
                        className: `h-1 flex-1 rounded-full transition-colors ${
                            index === currentReelIndex ? 'bg-white' : 'bg-white/30'
                        }`
                    }
                )
            )
        )
    );
}

// Make the component available globally
window.ReelsScreen = ReelsScreen;
