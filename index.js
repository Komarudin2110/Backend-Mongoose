const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/userModel')

const app = express()
const port = 2007
const URL = 'mongodb://127.0.0.1:27017/mongoose-backend'

mongoose.connect(URL, {
    // Menggunakan url parser yang baru
    useNewUrlParser: true,
    // Menggunakan method baru 'CreateIndex' untuk membuat index setiap kali input sebuah data
    useCreateIndex: true,
    // Menggunakan method baru untuk proses findOneAndUpdate()
    useFindAndModify: true,
    //  Menggunakan engine mongoDB baru
    useUnifiedTopology: true
})

// Agar API dapat memproses json 
app.use(express.json());

app.listen(port, () => { console.log(`Running at ${port}`) });

// CREATE ONE USER
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => { res.send('Data berhasil di simpan !') })
        .catch((err) => { res.send(err) })
})

// READ ONE USER BY ID
app.get('/users/:byID', async (req, res) => {
    try {
        const resp = await User.findById(req.params.byID)
        res.send(resp)
    } catch (error) {
        res.send(error)
    }
})

// READ ALL USER
app.get('/users', async (req, res) => {
    try {
        const resp = await User.find({})
        res.send(resp)
    } catch (error) {
        res.send(error)
    }
})

// DELETE ONE BY ID
app.get('/users/delete/:byID', async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.params.byID)
        res.send({
            pesan: 'Data berhasil di Delete !'
        })
    } catch (err) {
        res.send(err)
    }
})

// UPDATE BY ID
app.patch('/users/update/:byID', async (req, res) => {
    let { name, username, age, password } = req.body
    try {
        const resp = await User.findByIdAndUpdate(req.params.byID, { username, name, password, age })
        res.send({
            pesan: 'Data berhasil di Update'
        })
    } catch (error) {
        res.send(error)
    }
})