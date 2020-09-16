// CREATE
exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (const key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields!");
        }
    }

    return res.send(req.body);
}

// SHOW

// UPDATE

// DELETE