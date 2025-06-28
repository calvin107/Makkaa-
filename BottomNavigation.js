
const { useNavigate, useLocation } = window.ReactRouterDOM;

function BottomNavigation() {
    const { isAuthenticated, handleLogout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!isAuthenticated) return null;

    const navItems = [
        { path: '/chats', icon: 'fas fa-comment', label: 'Chats' },
        { path: '/explore', icon: 'fas fa-compass', label: 'Explore' },
        { path: '/reels', icon: 'fas fa-video', label: 'Reels' },
        { path: '/notifications', icon: 'fas fa-bell', label: 'Activity' },
        { path: '/profile', icon: 'fas fa-user', label: 'Profile' }
    ];

    return React.createElement(
        'div',
        { className: 'fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50' },
        React.createElement(
            'div',
            { className: 'flex justify-around items-center py-2 px-4 max-w-md mx-auto' },
            navItems.map(item =>
                React.createElement(
                    'button',
                    {
                        key: item.path,
                        onClick: () => navigate(item.path),
                        className: `flex flex-col items-center p-2 rounded transition ${
                            location.pathname === item.path || 
                            (item.path === '/chats' && location.pathname.startsWith('/chat/'))
                                ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`
                    },
                    React.createElement('i', { className: `${item.icon} text-xl mb-1` }),
                    React.createElement('span', { className: 'text-xs' }, item.label)
                )
            ),
            React.createElement(
                'button',
                {
                    onClick: () => navigate('/settings'),
                    className: `flex flex-col items-center p-2 rounded transition ${
                        location.pathname === '/settings' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                    }`
                },
                React.createElement('i', { className: 'fas fa-cog text-xl mb-1' }),
                React.createElement('span', { className: 'text-xs' }, 'Settings')
            )
        )
    );
}

window.BottomNavigation = BottomNavigation;
