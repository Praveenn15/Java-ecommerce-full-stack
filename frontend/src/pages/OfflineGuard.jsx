import React, {useState, useEffect} from 'react';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
// import offlineAnimation from '../assets/errorcat.json';

function OfflineGuard({children}) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline',handleOffline);

        return () => {
            window.removeEventListener('online',handleOnline);
            window.removeEventListener('offline',handleOffline);
        };
    }, [])

    if(!isOnline) {
        return (
            <div className="offline-container">
                <div className="error-card">
                    <DotLottie 
                    autoplay={true}
                    loop={true}
                    src="/errorcat.json"
                    style={{height:'200px',width:'200px',margin:'0 auto'}} 
                    />
                    <h2>No Internet Connection</h2>
                    <p>It Looks Like You're offline.Please check your network and try again.</p>
                    <button onClick={() => window.location.reload()} className='retry-btn'>
                        Retry
                    </button>

                </div>
            </div>
        );
    }
    return children;
}
 export default OfflineGuard;