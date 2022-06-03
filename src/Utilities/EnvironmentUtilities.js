import { LOCAL_STORAGE_PWA_CHROME_POPUP, LOCAL_STORAGE_PWA_SAFARI_POPUP } from "../Constants";

function getIsIos() {
    const ua = window.navigator.userAgent;

    return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
}

function getIsSafari() {
    const ua = window.navigator.userAgent;

    return !!ua.match(/WebKit/i);
}

export function getIsChromeIos() {
    const ua = window.navigator.userAgent;
    const isIos = getIsIos();

    return isIos && !!ua.match(/CriOS/i);
}

export function getIsSafariIos() {
    const isIos = getIsIos();
    const isSafari = getIsSafari();
    const isChromeIos = getIsChromeIos();
    
    return isIos && isSafari && !isChromeIos;
}

export function getIsStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches;
}

export function getIsOnline() {
    return window.navigator.onLine;
}

export function getCanShowSafariPwaPopup() {
    const hasSeenPopup = localStorage.getItem(LOCAL_STORAGE_PWA_SAFARI_POPUP);
    const isSafariIos = getIsSafariIos();
    const isStandalone = getIsStandalone();

    return !hasSeenPopup && isSafariIos && !isStandalone;
}

export function getCanShowChromePwaPopup() {
    const hasSeenPopup = localStorage.getItem(LOCAL_STORAGE_PWA_CHROME_POPUP);
    const isChromeIos = getIsChromeIos();
    const isStandalone = getIsStandalone();

    return !hasSeenPopup && isChromeIos && !isStandalone;
}