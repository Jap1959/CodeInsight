import React, { useEffect } from 'react';

const MyComponent = () => {
    // Function to log messages with timestamps
    const logMessage = (message) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);

        // Send log message to backend
        sendLogToBackend({ timestamp, message });
    };

    // Function to send log message to backend
    const sendLogToBackend = (logData) => {
        // Replace 'your-backend-url' with the actual URL of your backend endpoint
        console.log(logData);
        // const backendUrl = 'your-backend-url';
        
        // // Make a POST request to send log data to backend
        // fetch(backendUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(logData)
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         console.error('Failed to send log data to backend:', response.statusText);
        //     }
        // })
        // .catch(error => {
        //     console.error('Error sending log data to backend:', error);
        // });
    };
    const handleKeyUp = (event) => {
        // Define the key combinations to detect
        const keyCombinations = {
            'Esc': event.key === 'Escape' // Esc key
            // Add more key combinations as needed
        };
    
        // Check if any of the specified key combinations are pressed
        if (Object.values(keyCombinations).some(combination => combination)) {
            logMessage(`User pressed key combination: ${Object.keys(keyCombinations).filter(key => keyCombinations[key]).join(' + ')}`);
        }
    };
    

    useEffect(() => {
        // Event listener for keydown event
        const handleKeyDown = (event) => {
            // Define the key combinations to detect

            const keyCombinations = {
                'Esc': event.key === 'Escape',
                'F11': event.key==='F11',
                'Tab+Alt': event.altKey && !event.ctrlKey, // Alt + Tab
            };

            // Check if any of the specified key combinations are pressed
            if (Object.values(keyCombinations).some(combination => combination)) {
                logMessage(`User pressed key combination: ${Object.keys(keyCombinations).filter(key => keyCombinations[key]).join(' + ')}`);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Cleanup event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [logMessage]);

    // Function to toggle fullscreen mode
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div>
            <button onClick={toggleFullScreen}>Toggle Fullscreen</button>
            {/* Your component content */}
        </div>
    );
};

export default MyComponent;
