
// LoginPage React component
function LoginPage({ onLogin, onRegister, isLoading, error }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoading && onLogin) {
            onLogin(username, password);
        }
    };

    return React.createElement(
        'div',
        { className: 'min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4' },
        React.createElement(
            'div',
            { className: 'w-full max-w-md' },
            React.createElement(
                'div',
                { className: 'text-center mb-8' },
                React.createElement('h1', { className: 'text-4xl font-bold text-white mb-2' }, 'Makkaa'),
                React.createElement('p', { className: 'text-gray-300' }, 'Connect with friends and the world')
            ),
            
            React.createElement(
                'div',
                { className: 'bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700' },
                React.createElement(
                    'form',
                    { onSubmit: handleSubmit },
                    
                    // Username/Email input with icon
                    React.createElement(
                        'div',
                        { className: 'mb-4 relative' },
                        React.createElement('input', {
                            type: 'text',
                            placeholder: 'Username or Email',
                            value: username,
                            onChange: (e) => setUsername(e.target.value),
                            className: 'w-full py-3 pl-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
                            required: true,
                            disabled: isLoading
                        }),
                        React.createElement(
                            'span',
                            { className: 'absolute right-4 top-3 text-gray-400' },
                            React.createElement('i', { className: 'fas fa-user' })
                        )
                    ),
                    
                    // Password input with icon
                    React.createElement(
                        'div',
                        { className: 'mb-4 relative' },
                        React.createElement('input', {
                            type: 'password',
                            placeholder: 'Password',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            className: 'w-full py-3 pl-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
                            required: true,
                            disabled: isLoading
                        }),
                        React.createElement(
                            'span',
                            { className: 'absolute right-4 top-3 text-gray-400' },
                            React.createElement('i', { className: 'fas fa-lock' })
                        )
                    ),
                    
                    // Remember me and forgot password
                    React.createElement(
                        'div',
                        { className: 'flex items-center justify-between mb-6 text-sm' },
                        React.createElement(
                            'label',
                            { className: 'flex items-center text-gray-300' },
                            React.createElement('input', {
                                type: 'checkbox',
                                className: 'mr-2 rounded bg-gray-700 border-gray-600 text-indigo-500 focus:ring-indigo-500'
                            }),
                            'Remember me'
                        ),
                        React.createElement(
                            'a',
                            { href: '#', className: 'text-indigo-400 hover:text-indigo-300' },
                            'Forgot password?'
                        )
                    ),
                    
                    // Error message
                    error && React.createElement(
                        'div',
                        { className: 'mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-500 rounded-lg text-red-300 text-sm' },
                        error
                    ),
                    
                    // Login button
                    React.createElement(
                        'button',
                        {
                            type: 'submit',
                            className: `w-full py-3 rounded-full font-semibold transition-all duration-200 ${
                                isLoading 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105'
                            } text-white`,
                            disabled: isLoading
                        },
                        isLoading ? 'Signing In...' : 'Sign In'
                    )
                ),
                
                // Register link
                React.createElement(
                    'div',
                    { className: 'text-center text-sm text-gray-300 mt-6' },
                    "Don't have an account? ",
                    React.createElement(
                        'button',
                        { 
                            type: 'button',
                            onClick: onRegister,
                            className: 'text-white font-semibold hover:underline bg-transparent border-none cursor-pointer',
                            disabled: isLoading
                        },
                        'Register'
                    )
                )
            )
        )
    );
}

// Make the component available globally
window.LoginPage = LoginPage;
