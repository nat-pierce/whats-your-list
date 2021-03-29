const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getFriendsInfo = functions.https.onRequest(async (req, res) => {
    const userId = req.query.userId;
    const querySnapshot = await admin.firestore().collection('users').doc(userId).collection('friends').get();
    const friendRefs = querySnapshot.docs.map(doc => {
        return admin.firestore().collection('publicUserInfo').doc(doc.id);
    });

    const snapshot = await admin.firestore().getAll(...friendRefs);
    const friends = [];

    snapshot.forEach(f => friends.push({ uid: f.id, ...f.data() }));

    res.json({ result: friends });
});
