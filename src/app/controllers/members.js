const Member = require('../models/members.dao');
const { age, date, typeBlood } = require('../../lib/utils');

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
            callback(members) {
                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }
                res.render("members/index", { membersList: members, filter, pagination });
            }
        }

        Member.getAll(params);
    },
    create(req, res) {
        Member.getInstructors(instructors => {
            const member = [];
            member.instructors = instructors;
            member.types = typeBlood();

            return res.render("members/create", { member });
        });
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        let {
            avatar_url,
            name,
            email,
            birth,
            gender,
            blood,
            weight,
            height,
            my_instructor
        } = req.body;

        const data = [
            avatar_url,
            name,
            email,
            birth = date(birth).iso,
            gender,
            blood,
            weight,
            height,
            my_instructor,
            created_at = date(Date.now()).iso
        ]

        Member.save(data, member => {
            return res.redirect(`/members/${member.id}`);
        });
    },
    show(req, res) {
        const { id } = req.params;

        Member.get(id, member => {
            // Tratamento do tipo sanguíneo vindo do banco
            const types = typeBlood();
            let type_blood = "";

            for (const t in types) {
                if (types[t].back == member.blood) {
                    type_blood = types[t].front;
                }
            }

            const inst = {
                ...member,
                birth: `${age(member.birth)} anos`,
                type_blood,
                created_at: date(member.created_at).br
            }
            return res.render("members/show", { member: inst });
        });
    },
    update(req, res) {
        const { id } = req.params;

        const inn = []
        Member.getInstructors(instructors => {
            for (const i in instructors) {
                inn[i] = instructors[i];
            }
        });

        Member.get(id, member => {

            const inst = {
                ...member,
                birth: date(member.birth).iso,
                instructors: inn,
                types: typeBlood()
            }

            return res.render("members/update", { member: inst });
        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        let {
            id,
            avatar_url,
            name,
            email,
            birth,
            gender,
            blood,
            weight,
            height,
            my_instructor
        } = req.body;

        const data = [
            id,
            avatar_url,
            name,
            email,
            birth = date(birth).iso,
            gender,
            blood,
            weight,
            height,
            my_instructor
        ];

        Member.edit(data, member => {
            return res.redirect(`/members/${member.id}`);
        });
    },
    delete(req, res) {
        const { id } = req.body;

        Member.remove(id);

        return res.redirect("/members");
    }
}