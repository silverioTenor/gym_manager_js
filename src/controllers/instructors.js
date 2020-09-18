const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');

// INDEX
exports.index = (req, res) => {
    let instructorsList = [];
    let temp = [];
    temp = data.instructors;

    for (const i in data.instructors) {
        instructorsList[i] = {
            ...temp[i],
            avatar_url: temp[i].avatar_url,
            name: temp[i].name,
            services: temp[i].services.split(","),
            link: `/instructors/${temp[i].id}`
        }
    }
    res.render("instructors/index", { instructorsList });
};

// CREATE
exports.create = (req, res) => {
    return res.render("instructors/create");
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

    if (!data.instructors) {
        data.instructors = [];

        id = 1;
    }
    else {
        id = data.instructors.length + 1;
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

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        return err ? res.send("File write error!") : res.redirect("/instructors");
    });
}

// SHOW
exports.show = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(instructor => {
        return instructor.id == id;
    });

    if (!foundInstructor) return res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        birth: `${age(foundInstructor.birth)} anos`,
        services: foundInstructor.services.split(","),
        created_at: date(foundInstructor.created_at).br
    }

    // return res.send(foundInstructor);
    return res.render("instructors/show", { instructor });
}

// UPDATE
exports.update = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(instructor => {
        return instructor.id == id;
    });

    if (!foundInstructor) return res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso,
        services: foundInstructor.services.replace()
    }
    return res.render("instructors/update", { instructor });
}

// PUT
exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if (instructor.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundInstructor) res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth)
    };

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        return err ? res.send("File write error!") : res.redirect(`/instructors/${id}`);
    });
}

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body;

    const filterdInstructor = data.instructors.filter(instructor => {
        return instructor.id != id;
    });

    if (!filterdInstructor) return res.send("Search error!");

    data.instructors = filterdInstructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        return err ? res.send("File write error!") : res.redirect("/instructors");
    });
}