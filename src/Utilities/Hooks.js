import { useRef, useEffect } from 'react';
import { smallScreenMax } from '../StyleExports.module.scss';

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