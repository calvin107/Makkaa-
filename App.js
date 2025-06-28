
// Wait for React Router DOM to load
if (!window.ReactRouterDOM) {
    console.error('React Router DOM not loaded');
    return;
}

const { BrowserRouter, Routes, Route, Navigate } = window.ReactRouterDOM;

// Convert existing components to use React Router
function LoginPageWrapper() {
    const { handleLogin, handleRegister, error, setError } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    
    const onLogin = async (email, password) => {
        setIsLoading(true);
        await handleLogin(email, password);
        setIsLoading(false);
    };
    
    return React.createElement(LoginPage, {
        onLogin,
        onRegister: () => window.location.hash = '#/register',
        isLoading,
        error
    });
}

function RegisterPageWrapper() {
    const { handleRegister, error } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    
    const onRegister = async (username, email, password, confirmPassword) => {
        setIsLoading(true);
        const success = await handleRegister(email, password, username);
        setIsLoading(false);
        if (success) {
            window.location.hash = '#/chats';
        }
    };
    
    return React.createElement(RegisterPage, {
        onRegister,
        onBackToLogin: () => window.location.hash = '#/login',
        isLoading,
        error
    });
}

function ChatsListWrapper() {
    const { currentUser } = useAuth();
    const navigate = window.ReactRouterDOM.useNavigate();
    
    const onChatSelect = (chat) => {
        navigate(`/chat/${chat.id}`, { state: { chat } });
    };
    
    return React.createElement(ChatsListScreen, {
        onChatSelect,
        currentUser
    });
}

function ChatScreenWrapper() {
    const { currentUser } = useAuth();
    const navigate = window.ReactRouterDOM.useNavigate();
    const location = window.ReactRouterDOM.useLocation();
    
    const chat = location.state?.chat || {
        id: 1,
        name: 'Demo Chat',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        online: true,
        lastMessage: 'Hey there!'
    };
    
    const onBack = () => {
        navigate('/chats');
    };
    
    return React.createElement(ChatScreen, {
        chat,
        onBack,
        currentUser
    });
}

function ReelsScreenWrapper() {
    const { currentUser } = useAuth();
    return React.createElement(ReelsScreen, { currentUser });
}

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return React.createElement(
            'div',
            { className: 'flex items-center justify-center h-screen bg-gray-900' },
            React.createElement('div', { className: 'text-white' }, 'Loading...')
        );
    }
    
    if (!isAuthenticated) {
        return React.createElement(Navigate, { to: '/login', replace: true });
    }
    
    return children;
}

function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return React.createElement(
            'div',
            { className: 'flex items-center justify-center h-screen bg-gray-900' },
            React.createElement('div', { className: 'text-white' }, 'Loading...')
        );
    }
    
    if (isAuthenticated) {
        return React.createElement(Navigate, { to: '/chats', replace: true });
    }
    
    return children;
}

function App() {
    return React.createElement(
        BrowserRouter,
        null,
        React.createElement(
            AuthProvider,
            null,
            React.createElement(
                'div',
                { className: 'min-h-screen bg-gray-900 text-white' },
                React.createElement(
                    Routes,
                    null,
                    React.createElement(
                        Route,
                        { path: '/login', element: React.createElement(PublicRoute, null, React.createElement(LoginPageWrapper)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/register', element: React.createElement(PublicRoute, null, React.createElement(RegisterPageWrapper)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/chats', element: React.createElement(ProtectedRoute, null, React.createElement(ChatsListWrapper)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/chat/:id', element: React.createElement(ProtectedRoute, null, React.createElement(ChatScreenWrapper)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/explore', element: React.createElement(ProtectedRoute, null, React.createElement(ExplorePage)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/reels', element: React.createElement(ProtectedRoute, null, React.createElement(ReelsScreenWrapper)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/notifications', element: React.createElement(ProtectedRoute, null, React.createElement(NotificationsPage)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/profile', element: React.createElement(ProtectedRoute, null, React.createElement(ProfilePage)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/settings', element: React.createElement(ProtectedRoute, null, React.createElement(SettingsPage)) }
                    ),
                    React.createElement(
                        Route,
                        { path: '/', element: React.createElement(Navigate, { to: '/chats', replace: true }) }
                    )
                ),
                React.createElement(BottomNavigation)
            )
        )
    );
}

// Initialize the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
