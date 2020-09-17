const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');

// INDEX
exports.index = (req, res) => {
    res.render("instructors/index");
};

// CREATE
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
        created_at: date(foundInstructor.created_at)
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
        birth: "",
        services: foundInstructor.services.replace()
    }
    return res.render("instructors/update", { instructor });
}

// DELETE