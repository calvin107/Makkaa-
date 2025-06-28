
// RegisterPage React component
function RegisterPage({ onRegister, onBackToLogin, isLoading, error }) {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoading && onRegister) {
            onRegister(username, email, password, confirmPassword);
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
                React.createElement('h1', { className: 'text-4xl font-bold text-white mb-2' }, 'Join Makkaa'),
                React.createElement('p', { className: 'text-gray-300' }, 'Create your account to get started')
            ),
            
            React.createElement(
                'div',
                { className: 'bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700' },
                React.createElement(
                    'form',
                    { onSubmit: handleSubmit },
                    
                    // Username input
                    React.createElement(
                        'div',
                        { className: 'mb-4 relative' },
                        React.createElement('input', {
                            type: 'text',
                            placeholder: 'Username',
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
                    
                    // Email input
                    React.createElement(
                        'div',
                        { className: 'mb-4 relative' },
                        React.createElement('input', {
                            type: 'email',
                            placeholder: 'Email',
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            className: 'w-full py-3 pl-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
                            required: true,
                            disabled: isLoading
                        }),
                        React.createElement(
                            'span',
                            { className: 'absolute right-4 top-3 text-gray-400' },
                            React.createElement('i', { className: 'fas fa-envelope' })
                        )
                    ),
                    
                    // Password input
                    React.createElement(
                        'div',
                        { className: 'mb-4 relative' },
                        React.createElement('input', {
                            type: 'password',
                            placeholder: 'Password (13 characters)',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            className: 'w-full py-3 pl-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
                            required: true,
                            disabled: isLoading,
                            maxLength: 13
                        }),
                        React.createElement(
                            'span',
                            { className: 'absolute right-4 top-3 text-gray-400' },
                            React.createElement('i', { className: 'fas fa-lock' })
                        )
                    ),
                    
                    // Confirm Password input
                    React.createElement(
                        'div',
                        { className: 'mb-6 relative' },
                        React.createElement('input', {
                            type: 'password',
                            placeholder: 'Confirm Password (13 characters)',
                            value: confirmPassword,
                            onChange: (e) => setConfirmPassword(e.target.value),
                            className: 'w-full py-3 pl-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
                            required: true,
                            disabled: isLoading,
                            maxLength: 13
                        }),
                        React.createElement(
                            'span',
                            { className: 'absolute right-4 top-3 text-gray-400' },
                            React.createElement('i', { className: 'fas fa-lock' })
                        )
                    ),
                    
                    // Error message
                    error && React.createElement(
                        'div',
                        { className: 'mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-500 rounded-lg text-red-300 text-sm' },
                        error
                    ),
                    
                    // Register button
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
                        isLoading ? 'Creating Account...' : 'Create Account'
                    )
                ),
                
                // Back to login link
                React.createElement(
                    'div',
                    { className: 'text-center text-sm text-gray-300 mt-6' },
                    'Already have an account? ',
                    React.createElement(
                        'button',
                        { 
                            type: 'button',
                            onClick: onBackToLogin,
                            className: 'text-white font-semibold hover:underline bg-transparent border-none cursor-pointer',
                            disabled: isLoading
                        },
                        'Sign In'
                    )
                )
            )
        )
    );
}

// Make the component available globally
window.RegisterPage = RegisterPage;
