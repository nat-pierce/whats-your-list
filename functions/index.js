const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true}); // TODO replace origin true with actual domain
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

            snapshot.forEach(f => friends.push({ uid: f.id, ...f.data() }));
        }

        res.json({ friends });
    });
});
