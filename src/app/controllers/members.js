const Member = require('../models/members.dao');
const { age, date, typeBlood } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Member.getAll(members => {
            res.render("members/index", { membersList: members });
        });

    },
    create(req, res) {
        return res.render("members/create");
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }

        let { avatar_url, name, email, birth, gender, blood, weight, height } = req.body;

        const data = [
            avatar_url,
            name,
            email,
            birth = date(birth).iso,
            gender,
            blood,
            weight,
            height,
            created_at = date(Date.now()).iso
        ]

        Member.save(data, member => {
            return res.redirect(`/members/${member.id}`);
        });

    },
    show(req, res) {
        const { id } = req.params;

        Member.get(id, member => {

            const inst = {
                ...member,
                birth: `${age(member.birth)} anos`,
                type_blood: typeBlood(member.blood),
                created_at: date(member.created_at).br
            }
            return res.render("members/show", { member: inst });
        });
    },
    update(req, res) {
        const { id } = req.params;

        Member.get(id, member => {

            const inst = {
                ...member,
                birth: date(member.birth).iso,
                type_blood: typeBlood(member.blood)
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

        let { id, avatar_url, name, email, birth, gender, blood, weight, height } = req.body;

        const data = [
            id,
            avatar_url,
            name,
            email,
            birth = date(birth).iso,
            gender,
            blood,
            weight,
            height
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