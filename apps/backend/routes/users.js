const express = require('express');
const { db } = require('../firebase');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userDoc.data().historyEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load history' });
  }
});

router.post('/history', authenticateToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.userId);
    await userRef.update({
      historyEntries: admin.firestore.FieldValue.arrayUnion(req.body.entry)
    });
    res.status(200).json({ message: 'History updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update history' });
  }
});

router.delete('/history', authenticateToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.userId);
    await userRef.update({ historyEntries: [] });
    res.status(200).json({ message: 'History deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete history' });
  }
});

module.exports = router;
