
// Firebase configuration
const firebaseConfig = {
    // Add your Firebase config here
    apiKey: "demo-key",
    authDomain: "demo.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "demo-app-id"
};

// Initialize Firebase (using demo config for now)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// Authentication Context
const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [loginAttempts, setLoginAttempts] = React.useState(0);
    const [isLocked, setIsLocked] = React.useState(false);
    const [lockTimeRemaining, setLockTimeRemaining] = React.useState(0);

    // Demo login function (replace with Firebase auth later)
    const handleLogin = async (email, password) => {
        setError('');
        
        if (isLocked) {
            setError(`Too many failed attempts. Try again in ${lockTimeRemaining} seconds.`);
            return false;
        }

        if (!email?.trim() || !password?.trim()) {
            setError('Please enter both email and password');
            increaseLoginAttempts();
            return false;
        }

        try {
            // Demo authentication (replace with Firebase)
            if (email.toLowerCase() === 'demo@makkaa.com' && password === 'demo123456789') {
                const userData = {
                    uid: 'demo-user-id',
                    email: email,
                    displayName: 'Demo User',
                    photoURL: 'https://randomuser.me/api/portraits/men/1.jpg'
                };
                setCurrentUser(userData);
                setIsAuthenticated(true);
                setLoginAttempts(0);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            } else {
                setError('Invalid email or password');
                increaseLoginAttempts();
                return false;
            }
        } catch (error) {
            setError(error.message);
            increaseLoginAttempts();
            return false;
        }
    };

    const handleRegister = async (email, password, displayName) => {
        setError('');
        
        if (!email?.trim() || !password?.trim() || !displayName?.trim()) {
            setError('Please fill in all fields');
            return false;
        }

        if (password.length !== 13) {
            setError('Password must be exactly 13 characters long');
            return false;
        }

        try {
            // Demo registration (replace with Firebase)
            const userData = {
                uid: Date.now().toString(),
                email: email,
                displayName: displayName,
                photoURL: 'https://randomuser.me/api/portraits/men/1.jpg'
            };
            setCurrentUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (error) {
            setError(error.message);
            return false;
        }
    };

    const handleLogout = async () => {
        try {
            setCurrentUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('user');
        } catch (error) {
            setError(error.message);
        }
    };

    const increaseLoginAttempts = () => {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 5) {
            setIsLocked(true);
            setLockTimeRemaining(30);
            setError('Too many failed login attempts. Account locked for 30 seconds.');
            
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

    // Check for existing session
    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
                setIsAuthenticated(true);
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        error,
        setError,
        handleLogin,
        handleRegister,
        handleLogout,
        loginAttempts,
        isLocked,
        lockTimeRemaining
    };

    return React.createElement(AuthContext.Provider, { value }, children);
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

window.AuthProvider = AuthProvider;
window.useAuth = useAuth;
