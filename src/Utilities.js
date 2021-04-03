export const getFirstAndLastName = (fullName) => {
    const firstName = fullName.substr(0, fullName.indexOf(' '));
    const lastName = fullName.substr(fullName.indexOf(' ')+1);

    if (!firstName || !firstName.length) {
        return [lastName, null];
    }

    return [firstName, lastName]
}