const db = require('../../database/config');

module.exports = {
    get(id, callback) {
        const sql = `SELECT members.*, instructors.name AS instructor FROM members
        INNER JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = $1;`;

        db.query(sql, [id], (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            callback(results.rows[0]);
        });
    },
    getAll(callback) {
        const sql = `
            SELECT 
                members.id, 
                members.avatar_url, 
                members.name, 
                members.email,
                instructors.name AS instructor
            FROM members 
            INNER JOIN instructors ON (members.instructor_id = instructors.id)
            ORDER BY members.id;
        `;

        db.query(sql, null, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            callback(results.rows);
        });
    },
    getInstructors(callback) {
        const sql = `SELECT id, name FROM instructors`;

        db.query(sql, null, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows);
        });
    },
    save(values, callback) {
        const sql = `
            INSERT INTO members (avatar_url, name, email, birth, gender, blood, weight, height, instructor_id, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;
        `;

        db.query(sql, values, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows[0]);
        });
    },
    edit(values, callback) {
        const sql = `
            UPDATE members 
            SET 
            avatar_url = $2, 
            name = $3, 
            email = $4, 
            birth = $5, 
            gender = $6, 
            blood = $7, 
            weight = $8, 
            height = $9,
            instructor_id = $10
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