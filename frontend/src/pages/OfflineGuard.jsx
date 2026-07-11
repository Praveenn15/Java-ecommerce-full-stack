import React, {useState, useEffect} from 'react';
import { DotLottie,DotLottieReact } from '@lottiefiles/dotlottie-react';
import catanimation from '../assets/errorcat (1).json';
//

function OfflineGuard({children}) {
    const [isOffline, setIsOffline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        const handleGlobalClick = (e) => {
            if (!navigator.onLine) {
                e.preventDefault();
                e.stopPropagation();
                setIsOffline(true);
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline',handleOffline);
        window.addEventListener('click',handleGlobalClick,true);

        return () => {
            window.removeEventListener('online',handleOnline);
            window.removeEventListener('offline',handleOffline);
            window.removeEventListener('click',handleGlobalClick,true);
        };
    }, []);

    if(isOffline) {
        return (
            <div className="offline-container">
                <div className="error-card">
                    <DotLottie 
                    animationData = {catanimation}
                    loop={true}
                    
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