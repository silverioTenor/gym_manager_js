const db = require('../../database/config');

module.exports = {
    get(id, callback) {
        const sql = `SELECT * FROM members WHERE id = $1;`;

        db.query(sql, [id], (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            callback(results.rows[0]);
        });
    },
    getAll(callback) {
        const sql = `
            SELECT id, avatar_url, name, email FROM members 
            ORDER BY id;
        `;

        db.query(sql, null, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            callback(results.rows);
        });
    },
    save(values, callback) {
        const sql = `
            INSERT INTO members (avatar_url, name, email, birth, gender, blood, weight, height, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
        `;

        db.query(sql, values, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return results.rows[0];
        });
    },
    edit(values, callback) {
        const sql = `
            UPDATE members 
            SET avatar_url = $2, name = $3, email = $4, birth = $5, gender = $6, blood = $7, weight = $8, height = $9
            WHERE id = $1 RETURNING id;
        `;

        db.query(sql, values, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows[0]);
        });
    },
    remove(id) {
        const sql = `DELETE FROM members WHERE id = $1`;

        db.query(sql, [id], err => {
            if (err)throw `Unexpected error: ${err}`;
        });
    }
}