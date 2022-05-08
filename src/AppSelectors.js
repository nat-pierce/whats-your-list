import { ANONYMOUS_USER_ID } from "./Constants";

export function getIsSignedIn(state) {
    const uid = state.user?.uid;

    return !!uid && (uid !== ANONYMOUS_USER_ID);
}

// This will still return true for anonymous users
export function getHasAttemptedSignIn(state) {
    return !!state.user?.uid;
}