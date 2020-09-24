const db = require('../../database/config');

module.exports = {
    get(id, callback) {
        const sql = `SELECT * FROM instructors WHERE id = $1;`;

        db.query(sql, [id], (err, results) => {
            if (err) return `Unexpected error: ${err}`;
            
            callback(results.rows[0]);
        });
    },
    getAll(callback) {
        const sql = `SELECT id, avatar_url, name, services FROM instructors`;

        db.query(sql, null, (err, results) => {
            if (err) return `Unexpected error: ${err}`;
            
            callback(results.rows);
        });
    },
    save(data) {
        const sql = `
            INSERT INTO instructors (avatar_url, name, birth, gender, services, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
        `;

        db.query(sql, data, (err, results) => {
            if (err) return `Unexpected error: ${err}`;
            
            return results.rows[0].id;
        });
    },
    edit() {},
    remove() {}
}