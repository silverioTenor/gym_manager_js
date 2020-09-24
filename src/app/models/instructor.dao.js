const db = require('../../database/config');

module.exports = {
    get(id, callback) {
        const sql = `SELECT * FROM instructors WHERE id = $1;`;

        db.query(sql, [id], (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            callback(results.rows[0]);
        });
    },
    getAll(callback) {
        const sql = `
            SELECT id, avatar_url, name, services FROM instructors 
            ORDER BY id;
        `;

        db.query(sql, null, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            callback(results.rows);
        });
    },
    save(values, callback) {
        const sql = `
            INSERT INTO instructors (avatar_url, name, birth, gender, services, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
        `;

        db.query(sql, values, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows[0]);
        });
    },
    edit(values, callback) {
        const sql = `
            UPDATE instructors SET avatar_url = $2, name = $3, birth = $4, gender = $5, services = $6
            WHERE id = $1 RETURNING id;
        `;

        db.query(sql, values, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows[0]);
        });
    },
    remove(id) {
        const sql = `DELETE FROM instructors WHERE id = $1`;

        db.query(sql, [id], err => {
            if (err) throw `Unexpected error: ${err}`;
        });
    }
}