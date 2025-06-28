
function SettingsPage() {
    const { currentUser, handleLogout } = useAuth();
    const [notifications, setNotifications] = React.useState({
        push: true,
        email: false,
        sms: false
    });
    const [privacy, setPrivacy] = React.useState({
        privateAccount: false,
        showActivity: true,
        allowComments: true
    });

    const settingsGroups = [
        {
            title: 'Account',
            items: [
                { icon: 'fas fa-user', label: 'Edit Profile', action: () => {} },
                { icon: 'fas fa-key', label: 'Change Password', action: () => {} },
                { icon: 'fas fa-shield-alt', label: 'Two-Factor Authentication', action: () => {} },
                { icon: 'fas fa-download', label: 'Download Data', action: () => {} }
            ]
        },
        {
            title: 'Privacy & Security',
            items: [
                { 
                    icon: 'fas fa-lock', 
                    label: 'Private Account', 
                    toggle: true,
                    value: privacy.privateAccount,
                    onChange: (value) => setPrivacy(prev => ({...prev, privateAccount: value}))
                },
                { 
                    icon: 'fas fa-eye', 
                    label: 'Show Activity Status', 
                    toggle: true,
                    value: privacy.showActivity,
                    onChange: (value) => setPrivacy(prev => ({...prev, showActivity: value}))
                },
                { 
                    icon: 'fas fa-comment', 
                    label: 'Allow Comments', 
                    toggle: true,
                    value: privacy.allowComments,
                    onChange: (value) => setPrivacy(prev => ({...prev, allowComments: value}))
                },
                { icon: 'fas fa-user-slash', label: 'Blocked Users', action: () => {} }
            ]
        },
        {
            title: 'Notifications',
            items: [
                { 
                    icon: 'fas fa-bell', 
                    label: 'Push Notifications', 
                    toggle: true,
                    value: notifications.push,
                    onChange: (value) => setNotifications(prev => ({...prev, push: value}))
                },
                { 
                    icon: 'fas fa-envelope', 
                    label: 'Email Notifications', 
                    toggle: true,
                    value: notifications.email,
                    onChange: (value) => setNotifications(prev => ({...prev, email: value}))
                },
                { 
                    icon: 'fas fa-sms', 
                    label: 'SMS Notifications', 
                    toggle: true,
                    value: notifications.sms,
                    onChange: (value) => setNotifications(prev => ({...prev, sms: value}))
                }
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: 'fas fa-question-circle', label: 'Help Center', action: () => {} },
                { icon: 'fas fa-bug', label: 'Report a Problem', action: () => {} },
                { icon: 'fas fa-info-circle', label: 'About', action: () => {} },
                { icon: 'fas fa-gavel', label: 'Terms of Service', action: () => {} },
                { icon: 'fas fa-user-secret', label: 'Privacy Policy', action: () => {} }
            ]
        }
    ];

    const Toggle = ({ value, onChange }) => {
        return React.createElement(
            'button',
            {
                onClick: () => onChange(!value),
                className: `relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-600'
                }`
            },
            React.createElement(
                'span',
                {
                    className: `inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                    }`
                }
            )
        );
    };

    return React.createElement(
        'div',
        { className: 'screen bg-gray-900 pb-20' },
        
        // Header
        React.createElement(
            'div',
            { className: 'flex items-center justify-between p-4 border-b border-gray-700' },
            React.createElement('h1', { className: 'text-xl font-semibold text-white' }, 'Settings'),
            React.createElement(
                'button',
                { 
                    onClick: handleLogout,
                    className: 'p-2 rounded-full hover:bg-gray-800 transition' 
                },
                React.createElement('i', { className: 'fas fa-sign-out-alt text-red-400' })
            )
        ),

        // User Info
        React.createElement(
            'div',
            { className: 'flex items-center space-x-4 p-4 border-b border-gray-700' },
            React.createElement('img', {
                src: currentUser?.photoURL || 'https://randomuser.me/api/portraits/men/1.jpg',
                alt: 'Profile',
                className: 'w-16 h-16 rounded-full'
            }),
            React.createElement(
                'div',
                null,
                React.createElement('h2', { className: 'text-white font-semibold' }, currentUser?.displayName || 'Demo User'),
                React.createElement('p', { className: 'text-gray-400 text-sm' }, currentUser?.email || 'demo@makkaa.com')
            )
        ),

        // Settings Groups
        React.createElement(
            'div',
            { className: 'p-4 space-y-6' },
            settingsGroups.map((group, groupIndex) =>
                React.createElement(
                    'div',
                    { key: groupIndex },
                    React.createElement('h3', { className: 'text-white font-semibold mb-3' }, group.title),
                    React.createElement(
                        'div',
                        { className: 'bg-gray-800 rounded-lg overflow-hidden' },
                        group.items.map((item, itemIndex) =>
                            React.createElement(
                                'div',
                                {
                                    key: itemIndex,
                                    className: `flex items-center justify-between p-4 ${
                                        itemIndex < group.items.length - 1 ? 'border-b border-gray-700' : ''
                                    }`
                                },
                                React.createElement(
                                    'div',
                                    { className: 'flex items-center space-x-3' },
                                    React.createElement('i', { className: `${item.icon} text-gray-400 w-5` }),
                                    React.createElement('span', { className: 'text-white' }, item.label)
                                ),
                                item.toggle 
                                    ? React.createElement(Toggle, { value: item.value, onChange: item.onChange })
                                    : React.createElement(
                                        'button',
                                        { 
                                            onClick: item.action,
                                            className: 'text-gray-400 hover:text-white transition' 
                                        },
                                        React.createElement('i', { className: 'fas fa-chevron-right' })
                                    )
                            )
                        )
                    )
                )
            )
        ),

        // Danger Zone
        React.createElement(
            'div',
            { className: 'p-4 mt-6' },
            React.createElement('h3', { className: 'text-red-400 font-semibold mb-3' }, 'Danger Zone'),
            React.createElement(
                'div',
                { className: 'bg-gray-800 rounded-lg p-4' },
                React.createElement(
                    'button',
                    { className: 'w-full text-left flex items-center justify-between p-2 rounded hover:bg-gray-700 transition' },
                    React.createElement(
                        'div',
                        { className: 'flex items-center space-x-3' },
                        React.createElement('i', { className: 'fas fa-trash text-red-400 w-5' }),
                        React.createElement('span', { className: 'text-red-400' }, 'Delete Account')
                    ),
                    React.createElement('i', { className: 'fas fa-chevron-right text-red-400' })
                )
            )
        )
    );
}

window.SettingsPage = SettingsPage;
