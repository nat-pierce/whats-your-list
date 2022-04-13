import { HOME_TABS } from "../Constants";

export const getFirstAndLastName = (fullName) => {
    const firstName = fullName.substr(0, fullName.indexOf(' '));
    const lastName = fullName.substr(fullName.indexOf(' ')+1);

    if (!firstName || !firstName.length) {
        return [lastName, null];
    }

    return [firstName, lastName]
}

// Choose state and db property name (matches in both)
export const getCollectionName = (tabType) => {
    return tabType === HOME_TABS.Favorites
        ? 'favoriteMovies'
        : 'watchLaterMovies';
}