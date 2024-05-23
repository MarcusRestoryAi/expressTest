//Deklararion
const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = new express()
const portNr = 8080
const filePath = "./data.json"

//App skall använda Body-Parser för hantering av Payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Starta servern
app.listen(portNr, () => {
    console.log(`Server ligger nu på ${portNr} och lyssnar!`)
})

app.get("", (req, res) => {
    //res.send("Hello World to everyone!")
    res.sendFile("index.html", {root: __dirname})
})

app.get("/about", (req, res) => {
    res.sendFile("about.html", {root: __dirname})
})

app.post("", (req, res) => {
    //Hämta Payload data från request
    const data = req.body
    const jsonStr = JSON.stringify(data, null, 2)

    //Skriv till fil
    fs.writeFile(filePath, jsonStr, (err) => {
        if (err) console.log(err)
    })

    //Return data to sender
    res.send(jsonStr)
})

app.get("/getData", (req, res) => {
    //Hämta data från fil.
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) console.log(err)

        console.log(data)
        res.send(JSON.stringify(data, null, 2))
    })
})