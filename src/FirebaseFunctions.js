export const getFriendsInfo = async (userId) => {
    const isProdEnv = process.env.NODE_ENV === 'production';
    const isLocal = window.location.hostname === 'localhost';
    
    if (isProdEnv && !isLocal) {
        const baseUrl = process.env.NODE_ENV === 'production'
            ? 'https://us-central1-whats-your-list.cloudfunctions.net'
            : 'http://localhost:5001/whats-your-list/us-central1';

        const url = `${baseUrl}/getFriendsInfo?userId=${userId}`;

        return fetch(url, {
            "method": "GET"
        })
        .then(response => response.json())
        .catch(err => {
            console.error(err);
        });
    }
}