const { age, date } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        res.render("instructors/index", { instructorsList });
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
    },
    show(req, res) {
        return res.render("instructors/show", { instructor });
    },
    update(req, res) {
        return res.render("instructors/update", { instructor });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
    },
    delete(req, res) { }
}