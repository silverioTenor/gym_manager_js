const fs = require('fs');
const data = require('../data.json');

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

    let { avatar_url, name, birth, gender, services } = req.body;

    const bodyAll = { id, avatar_url, name, birth, gender, services };

    data.instructors.push(bodyAll);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        return err ? res.send("File write error!") : res.redirect("/instructors");
    });
}

// SHOW

// UPDATE

// DELETE