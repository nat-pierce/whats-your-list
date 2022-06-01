import { useRef, useEffect } from 'react';
import { smallScreenMax } from '../StyleExports.module.scss';
import { ServiceWorkerUpdateListener } from '../ServiceWorkerUpdateListener.js';

export function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

export function useKeypress(key, action) {
    useEffect(() => {
        function onKeyup(e) {
            if (e.key === key) action()
        }

        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
    }, [key, action]);
}

export function useScrollToBottom(isScrolledThreshold, movies, containerRef) {
    const prevNumMovies = useRef();

    useEffect(() => {
        if (!isScrolledThreshold && (movies.length > prevNumMovies.current)) {
            if (window.innerWidth > parseInt(smallScreenMax)) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            } else {
                containerRef.current.scrollIntoView(false);
            }
        }

        prevNumMovies.current = movies.length;
    }, [movies, containerRef, isScrolledThreshold])
}

// https://dev.to/noconsulate/react-pwa-with-workbox-6dl
export function useServiceWorkerListener(
    setIsUpdateWaiting,
    setRegistration,
    setSwListener
) {
    useEffect(() => {
        let listener;
        if (process.env.NODE_ENV !== "development") {
            listener = new ServiceWorkerUpdateListener();
            setSwListener(listener);
            listener.onupdateinstalling = (installingEvent) => {
                console.log("SW installed", installingEvent);
            };

            listener.onupdatewaiting = (waitingEvent) => {
                console.log("new update waiting", waitingEvent);
                setIsUpdateWaiting(true);
            };

            listener.onupdateready = (event) => {
                console.log("updateready event");
                window.location.reload();
            };

            navigator.serviceWorker.getRegistration().then((reg) => {
                listener.addRegistration(reg);
                setRegistration(reg);
            });
        }
    
        return () => listener?.removeEventListener();
    }, [setIsUpdateWaiting, setRegistration, setSwListener])
}