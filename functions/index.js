const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: process.env.NODE_ENV === 'production'
        ? "https://whatsyourlist.com"
        : "http://localhost:3000"
});
admin.initializeApp();

exports.getFriendsInfo = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const userId = req.query.userId;
        const querySnapshot = await admin.firestore().collection('users').doc(userId).collection('friends').get();
        const friendRefs = querySnapshot.docs.map(doc => {
            return admin.firestore().collection('publicUserInfo').doc(doc.id);
        });

        const friends = [];

        if (friendRefs.length) {
            const snapshot = await admin.firestore().getAll(...friendRefs);

            snapshot.forEach(f => {
                if (f.exists) {
                    friends.push({ uid: f.id, ...f.data() });
                } else {
                    // If account no longer exists, remove from friend list
                    admin.firestore().collection('users').doc(userId).collection('friends').doc(f.id).delete();
                }
            });

            friends.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
        }

        res.json({ friends });
    });
});
