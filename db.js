const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const crypto = require('crypto');

mkdirp.sync('./lib/db');

const db = new sqlite3.Database('./lib/db/jss.db');

db.serialize(function () {
    // create the database schema for the todos app
    db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB \
  )");

    // create an initial user (username: alice, password: letmein)
    const salt = crypto.randomBytes(16);
    db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
        'student',
        crypto.pbkdf2Sync('Student1', salt, 310000, 32, 'sha256'),
        salt
    ]);
});

module.exports = db;