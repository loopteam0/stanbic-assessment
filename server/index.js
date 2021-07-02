const express = require('express')
const faker = require('faker');
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send({
        auth: 'to sign in with crentials: GET / POST',
        students: 'get available data: GET'
    })
})

app.post('/auth', async (req, res) => {

    setTimeout(() => {
        res.status(201).send(JSON.stringify(req.body))
    }, 5000);
})

app.get('/auth', async (req, res) => {
    setTimeout(() => {
        res.status(200).send(JSON.stringify(req.body))
    }, 2000);
})


app.get('/students', async (req, res) => {
    let students = [];

    setTimeout(() => {
        while (students.length != 20) {
            students.push(generateData());
        }

        res.status(200).send(JSON.stringify(students));
    }, 2000)
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

function generateData() {
    return {
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        fees: Math.random() * 1000,
        paid: false,
    }
}