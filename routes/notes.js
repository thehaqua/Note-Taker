const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) { console.log(err); }
        else { res.json(JSON.parse(data)); }
    });
});

notes.delete("/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            parsedData = JSON.parse(data);
            filterData = parsedData.filter((note) => note.id !== id)
            startData = JSON.stringify(filterData)
            fs.writeFile("./db/db.json", startData, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    fs.readFile("./db/db.json", (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(JSON.parse(data));
                        }
                    });
                }
            });
        }
    });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fs.readFile('./db/db.json', (err, data) => {
            if (err) { console.log(err); }
            else {
                parsedData = JSON.parse(data);
                parsedData.push(newNote);
                startData = JSON.stringify(parsedData);
                fs.writeFile("./db/db.json", startData, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.readFile("./db/db.json", (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json(JSON.parse(data));
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.error("Error, note not saved.");
    }
});



module.exports = notes;