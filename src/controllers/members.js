const fs = require('fs');
const data = require('../../data.json');
const { age, date, typeBlood } = require('../utils');

// INDEX
exports.index = (req, res) => {
    let membersList = [];
    let temp = [];
    temp = data.members;

    for (const i in data.members) {
        membersList[i] = {
            ...temp[i],
            link: `/members/${temp[i].id}`
        }
    }
    res.render("members/index", { membersList });
};

// CREATE
exports.create = (req, res) => {
    return res.render("members/create");
}

// POST
exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    }

    let id = 0;

    if (!data.members) {
        data.members = [];

        id = 1;
    }
    else {
        id = data.members.length + 1;
    }

    let {
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height
    } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();

    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        return err ? res.send("File write error!") : res.redirect("/members");
    });
}

// SHOW
exports.show = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find(member => {
        return member.id == id;
    });

    if (!foundMember) return res.send("Member not found!");

    const member = {
        ...foundMember,
        birth: `${age(foundMember.birth)} anos`,
        type_blood: typeBlood(foundMember.blood),
        created_at: date(foundMember.created_at).br
    }

    // return res.send(foundMember);
    return res.render("members/show", { member });
}

// UPDATE
exports.update = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find(member => {
        return member.id == id;
    });

    if (!foundMember) return res.send("Member not found!");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
        type_blood: typeBlood(foundMember.blood)
    }
    return res.render("members/update", { member });
}

// PUT
exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundMember = data.members.find((member, foundIndex) => {
        if (member.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundMember) res.send("Member not found!");

    const member = {
        ...foundMember,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth),
    };

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        return err ? res.send("File write error!") : res.redirect(`/members/${id}`);
    });
}

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredMember = data.members.filter(member => {
        return member.id != id;
    });

    if (!filteredMember) return res.send("Search error!");

    data.members = filteredMember;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        return err ? res.send("File write error!") : res.redirect("/members");
    });
}