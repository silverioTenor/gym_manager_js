const Instructor = require('../models/instructor.dao');
const { age, date } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query;

        page = page || 1;
        limit = limit || 3;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {
                const instructorsList = [];

                for (const i in instructors) {
                    instructorsList[i] = {
                        ...instructors[i],
                        services: instructors[i].services.split(",")
                    }
                }

                const pagination = { 
                    total: Math.ceil(instructors[0].total / limit), 
                    page 
                }

                res.render("instructors/index", { instructorsList, filter, pagination });
            }
        }

        Instructor.paginate(params);
    },
    create(req, res) {
        return res.render("instructors/create");
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        let { avatar_url, name, gender, services, birth } = req.body;
        let created_at = 0;

        const data = [
            avatar_url,
            name,
            birth = date(birth).iso,
            gender,
            services,
            created_at = date(Date.now()).iso
        ]

        Instructor.save(data, instructor => {
            return res.redirect(`/instructors/${instructor.id}`);
        });
    },
    show(req, res) {
        const { id } = req.params;

        Instructor.get(id, instructor => {

            const inst = {
                ...instructor,
                birth: `${age(instructor.birth)} anos`,
                services: instructor.services.split(","),
                created_at: date(instructor.created_at).br
            }
            return res.render("instructors/show", { instructor: inst });
        });
    },
    update(req, res) {
        const { id } = req.params;

        Instructor.get(id, instructor => {

            const inst = {
                ...instructor,
                birth: date(instructor.birth).iso
            }

            return res.render("instructors/update", { instructor: inst });
        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        let { id, avatar_url, name, gender, services, birth } = req.body;

        const data = [
            id,
            avatar_url,
            name,
            birth = date(birth).iso,
            gender,
            services
        ];

        Instructor.edit(data, instructor => {
            return res.redirect(`/instructors/${instructor.id}`);
        });
    },
    delete(req, res) {
        const { id } = req.body;

        Instructor.remove(id);

        return res.redirect("/instructors");
    }
}