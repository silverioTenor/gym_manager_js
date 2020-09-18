const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');

// INDEX
exports.index = (req, res) => {
    let instructorsList = [];
    let temp = [];
    temp = data.members;

    for (const i in data.members) {
        instructorsList[i] = {
            ...temp[i],
            avatar_url: temp[i].avatar_url,
            name: temp[i].name,
            services: temp[i].services.split(","),
            link: `/members/${temp[i].id}`
        }
    }
    res.render("members/index", { instructorsList });
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
        birth,
        gender,
        services
    } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();

    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        return err ? res.send("File write error!") : res.redirect("/members");
    });
}

// SHOW
exports.show = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.members.find(member => {
        return member.id == id;
    });

    if (!foundInstructor) return res.send("Instructor not found!");

    const member = {
        ...foundInstructor,
        birth: `${age(foundInstructor.birth)} anos`,
        services: foundInstructor.services.split(","),
        created_at: date(foundInstructor.created_at).br
    }

    // return res.send(foundInstructor);
    return res.render("members/show", { member });
}

// UPDATE
exports.update = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.members.find(member => {
        return member.id == id;
    });

    if (!foundInstructor) return res.send("Instructor not found!");

    const member = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso,
        services: foundInstructor.services.replace()
    }
    return res.render("members/update", { member });
}

// PUT
exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundInstructor = data.members.find((member, foundIndex) => {
        if (member.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundInstructor) res.send("Instructor not found!");

    const member = {
        ...foundInstructor,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth)
    };

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        return err ? res.send("File write error!") : res.redirect(`/members/${id}`);
    });
}

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body;

    const filterdInstructor = data.members.filter(member => {
        return member.id != id;
    });

    if (!filterdInstructor) return res.send("Search error!");

    data.members = filterdInstructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        return err ? res.send("File write error!") : res.redirect("/members");
    });
}