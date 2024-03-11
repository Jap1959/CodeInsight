import { useState, useEffect } from 'react';

export default function StatusBar() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnlineChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineChange);
        window.addEventListener('offline', handleOnlineChange);

        return () => {
            window.removeEventListener('online', handleOnlineChange);
            window.removeEventListener('offline', handleOnlineChange);
        };
    }, []);

    return (
        <div>
            {isOnline ? (
                <p>You are online!</p>
            ) : (
                <p>You are offline.</p>
            )}
        </div>
    );
}
