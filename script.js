
// App State Management
function App() {
    const [currentScreen, setCurrentScreen] = React.useState('login');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [loginAttempts, setLoginAttempts] = React.useState(0);
    const [isLocked, setIsLocked] = React.useState(false);
    const [lockTimeRemaining, setLockTimeRemaining] = React.useState(0);

    // Handle Login
    const handleLogin = (username, password) => {
        console.log('Attempting login with:', username);
        
        // Check if account is locked
        if (isLocked) {
            setError(`Too many failed attempts. Try again in ${lockTimeRemaining} seconds.`);
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        // Simple validation
        if (!username || !username.trim()) {
            setError('Please enter a username or email');
            setIsLoading(false);
            increaseLoginAttempts();
            return;
        }

        if (!password || !password.trim()) {
            setError('Please enter a password');
            setIsLoading(false);
            increaseLoginAttempts();
            return;
        }

        if (username.trim().length < 3) {
            setError('Username must be at least 3 characters long');
            setIsLoading(false);
            increaseLoginAttempts();
            return;
        }

        if (password.trim().length < 3) {
            setError('Password must be at least 3 characters long');
            setIsLoading(false);
            increaseLoginAttempts();
            return;
        }

        // Simulate login process with success condition
        setTimeout(() => {
            // For demo purposes, let's say login succeeds if username is "demo" and password is "demo123"
            // You can modify this condition as needed
            if (username.trim().toLowerCase() === 'demo' && password === 'demo123') {
                console.log('Login successful for:', username);
                const userData = { username: username.trim(), id: Date.now() };
                setCurrentUser(userData);
                setIsAuthenticated(true);
                setCurrentScreen('chats');
                localStorage.setItem('user', JSON.stringify(userData));
                setError('');
                setLoginAttempts(0); // Reset attempts on successful login
            } else {
                setError('Invalid username or password');
                increaseLoginAttempts();
            }
            setIsLoading(false);
        }, 1500);
    };

    // Handle login attempt tracking
    const increaseLoginAttempts = () => {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 5) {
            setIsLocked(true);
            setLockTimeRemaining(30);
            setError('Too many failed login attempts. Account locked for 30 seconds.');
            
            // Start countdown timer
            const timer = setInterval(() => {
                setLockTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsLocked(false);
                        setLoginAttempts(0);
                        setError('');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    // Handle Register
    const handleRegister = () => {
        setCurrentScreen('register');
    };

    // Handle Register Submit
    const handleRegisterSubmit = (username, email, password, confirmPassword) => {
        setIsLoading(true);
        setError('');
        
        // Validation
        if (!username || !username.trim()) {
            setError('Please enter a username');
            setIsLoading(false);
            return;
        }

        if (!email || !email.trim()) {
            setError('Please enter an email');
            setIsLoading(false);
            return;
        }

        if (!password || !password.trim()) {
            setError('Please enter a password');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (username.trim().length < 3) {
            setError('Username must be at least 3 characters long');
            setIsLoading(false);
            return;
        }

        if (password.length !== 13) {
            setError('Password must be exactly 13 characters long');
            setIsLoading(false);
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Simulate registration process
        setTimeout(() => {
            console.log('Registration successful for:', username);
            const userData = { username: username.trim(), email: email.trim(), id: Date.now() };
            setCurrentUser(userData);
            setIsAuthenticated(true);
            setCurrentScreen('chats');
            localStorage.setItem('user', JSON.stringify(userData));
            setError('');
            setIsLoading(false);
        }, 2000);
    };

    // Handle Logout
    const handleLogout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setCurrentScreen('login');
        localStorage.removeItem('user');
    };

    // Navigate between screens
    const navigateToScreen = (screen) => {
        setCurrentScreen(screen);
    };

    // Open specific chat
    const openChat = (chat) => {
        setSelectedChat(chat);
        setCurrentScreen('chat');
    };

    // Check for existing session on load
    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
                setIsAuthenticated(true);
                setCurrentScreen('chats');
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Render current screen
    const renderScreen = () => {
        if (!isAuthenticated) {
            if (currentScreen === 'register') {
                return React.createElement(RegisterPage, {
                    onRegister: handleRegisterSubmit,
                    onBackToLogin: () => setCurrentScreen('login'),
                    isLoading: isLoading,
                    error: error
                });
            }
            return React.createElement(LoginPage, {
                onLogin: handleLogin,
                onRegister: handleRegister,
                isLoading: isLoading,
                error: error
            });
        }

        switch (currentScreen) {
            case 'chats':
                return React.createElement(ChatsListScreen, {
                    onChatSelect: openChat,
                    currentUser: currentUser
                });
            case 'chat':
                return React.createElement(ChatScreen, {
                    chat: selectedChat,
                    onBack: () => navigateToScreen('chats'),
                    currentUser: currentUser
                });
            case 'reels':
                return React.createElement(ReelsScreen, {
                    currentUser: currentUser
                });
            default:
                return React.createElement(ChatsListScreen, {
                    onChatSelect: openChat,
                    currentUser: currentUser
                });
        }
    };

    // Bottom Navigation
    const BottomNavigation = () => {
        if (!isAuthenticated) return null;

        return React.createElement(
            'div',
            { className: 'fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-2' },
            React.createElement(
                'div',
                { className: 'flex justify-around items-center max-w-sm mx-auto' },
                React.createElement(
                    'button',
                    {
                        onClick: () => navigateToScreen('chats'),
                        className: `flex flex-col items-center p-2 rounded ${currentScreen === 'chats' || currentScreen === 'chat' ? 'text-white' : 'text-gray-400'}`
                    },
                    React.createElement('i', { className: 'fas fa-comment text-xl mb-1' }),
                    React.createElement('span', { className: 'text-xs' }, 'Chats')
                ),
                React.createElement(
                    'button',
                    {
                        onClick: () => navigateToScreen('reels'),
                        className: `flex flex-col items-center p-2 rounded ${currentScreen === 'reels' ? 'text-white' : 'text-gray-400'}`
                    },
                    React.createElement('i', { className: 'fas fa-video text-xl mb-1' }),
                    React.createElement('span', { className: 'text-xs' }, 'Reels')
                ),
                React.createElement(
                    'button',
                    {
                        onClick: handleLogout,
                        className: 'flex flex-col items-center p-2 rounded text-gray-400'
                    },
                    React.createElement('i', { className: 'fas fa-sign-out-alt text-xl mb-1' }),
                    React.createElement('span', { className: 'text-xs' }, 'Logout')
                )
            )
        );
    };

    return React.createElement(
        'div',
        { className: 'min-h-screen bg-gray-900 text-white relative pb-16' },
        renderScreen(),
        React.createElement(BottomNavigation)
    );
}

// Initialize the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
