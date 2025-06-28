
function CreatePost({ onClose, onPostCreated }) {
    const { currentUser } = useAuth();
    const [caption, setCaption] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState('');
    const [isUploading, setIsUploading] = React.useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handlePost = async () => {
        if (!selectedFile || !caption.trim()) return;
        
        setIsUploading(true);
        
        try {
            // In a real app, upload to Firebase Storage or Cloudinary
            const newPost = {
                id: Date.now(),
                user: currentUser,
                caption: caption.trim(),
                imageUrl: previewUrl, // In real app, this would be the uploaded URL
                likes: 0,
                comments: [],
                timestamp: new Date().toISOString()
            };
            
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            onPostCreated(newPost);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return React.createElement(
        'div',
        { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4' },
        React.createElement(
            'div',
            { className: 'bg-gray-800 rounded-lg w-full max-w-md' },
            
            // Header
            React.createElement(
                'div',
                { className: 'flex items-center justify-between p-4 border-b border-gray-700' },
                React.createElement(
                    'button',
                    { onClick: onClose, className: 'text-gray-400 hover:text-white' },
                    'Cancel'
                ),
                React.createElement('h2', { className: 'text-white font-semibold' }, 'Create Post'),
                React.createElement(
                    'button',
                    {
                        onClick: handlePost,
                        disabled: !selectedFile || !caption.trim() || isUploading,
                        className: `text-blue-400 font-semibold ${
                            (!selectedFile || !caption.trim() || isUploading) 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:text-blue-300'
                        }`
                    },
                    isUploading ? 'Posting...' : 'Post'
                )
            ),

            // Content
            React.createElement(
                'div',
                { className: 'p-4' },
                
                // File upload area
                !selectedFile && React.createElement(
                    'label',
                    { className: 'block w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition' },
                    React.createElement('input', {
                        type: 'file',
                        accept: 'image/*,video/*',
                        onChange: handleFileSelect,
                        className: 'hidden'
                    }),
                    React.createElement(
                        'div',
                        { className: 'flex flex-col items-center justify-center h-full text-gray-400' },
                        React.createElement('i', { className: 'fas fa-plus text-4xl mb-4' }),
                        React.createElement('p', null, 'Select photo or video')
                    )
                ),

                // Preview
                selectedFile && React.createElement(
                    'div',
                    { className: 'mb-4' },
                    React.createElement('img', {
                        src: previewUrl,
                        alt: 'Preview',
                        className: 'w-full h-64 object-cover rounded-lg'
                    }),
                    React.createElement(
                        'button',
                        {
                            onClick: () => {
                                setSelectedFile(null);
                                setPreviewUrl('');
                            },
                            className: 'mt-2 text-red-400 hover:text-red-300 text-sm'
                        },
                        'Remove'
                    )
                ),

                // Caption
                React.createElement('textarea', {
                    value: caption,
                    onChange: (e) => setCaption(e.target.value),
                    placeholder: 'Write a caption...',
                    className: 'w-full p-3 bg-gray-700 text-white rounded-lg resize-none',
                    rows: 3,
                    maxLength: 500
                }),
                React.createElement(
                    'div',
                    { className: 'text-right text-sm text-gray-400 mt-1' },
                    `${caption.length}/500`
                )
            )
        )
    );
}

window.CreatePost = CreatePost;
