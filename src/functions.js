const db = require('quick.db');

/**
 * @param {String} userId
 * @param {Number} highScore
 */
const setHScore = (userId, highScore) => 
    db.set(`user_${userId}`, highScore)

/**
 * @param {string} userId
 * @param {string} highScore
 * @returns {Promise}
 */
const getHScore = (userId) =>
  db.fetch(`user_${userId}`);

module.exports = {
    setHScore,
    getHScore
}