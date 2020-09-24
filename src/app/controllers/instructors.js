const Instructor = require('../models/instructor.dao');
const { age, date } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Instructor.getAll(instructors => {
            const instructorsList = [];

            for (const i in instructors) {
                instructorsList[i] = {
                    ...instructors[i],
                    services: instructors[i].services.split(",")
                }
            }

            res.render("instructors/index", { instructorsList });
        });

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

        const id = Instructor.save(data);

        return res.redirect(`/instructors/${id}`);
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