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
            SELECT 
                instructors.id, 
                instructors.avatar_url, 
                instructors.name, 
                instructors.services, 
                COUNT(members) AS total_members
            FROM instructors 
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            GROUP BY instructors.id
            ORDER BY instructors.id
        `;

        db.query(sql, null, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows);
        });
    },
    getBy(filter, callback) {
        const sql = `
            SELECT 
                instructors.id, 
                instructors.avatar_url, 
                instructors.name, 
                instructors.services, 
                COUNT(members.*) AS total_members
            FROM instructors 
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            WHERE instructors.name ILIKE '%${filter}%' OR instructors.services ILIKE '%${filter}%'
            GROUP BY instructors.id
            ORDER BY instructors.id
        `;

        db.query(sql, null, (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows);
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
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params;

        let sql = "",
            filterQuery = ``,
            totalQuery = `(
                SELECT count(*) FROM instructors
            ) AS total`;

        if (filter) {
            filterQuery = `
                WHERE instructors.name ILIKE '%${filter}%'
                OR instructors.services ILIKE '%${filter}%'
            `;

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total`;
        }

        sql = `
            SELECT instructors.*, ${totalQuery}, COUNT(members) AS total_members
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            ${filterQuery}
            GROUP BY instructors.id
            ORDER BY instructors.id 
            LIMIT $1 OFFSET $2
        `;

        db.query(sql, [limit, offset], (err, results) => {
            if (err) throw `Unexpected error: ${err}`;

            return callback(results.rows);
        });
    }
}