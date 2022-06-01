export function getIsIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export function getIsStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches;
}

export function getIsOnline() {
    return window.navigator.onLine;
}