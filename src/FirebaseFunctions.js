export const getFriendsInfo = async (currentUser, userId) => {
    const url = `https://us-central1-whats-your-list.cloudfunctions.net/getFriendsInfo?userId=${userId}`;

    return fetch(url, {
        "method": "GET"
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    });
}