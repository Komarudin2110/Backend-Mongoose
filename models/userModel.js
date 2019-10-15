const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Wajib diisi oleh user
        set: (val) => { return val.replace(/ /g, '') }, // val = data dari user, menghapus semua whitespace
        validate(val) {
            val = parseInt(val)
            // Akan bernilai true jika inputan dari user merupakan sebuah angka
            if (!isNaN(val)) {
                throw new Error('Username harus merupakan sebuah string')
            }
        }
    },
    name: {
        type: String,
        required: true, 
        trim: true, // Menghapus whitespace di awal dan akhir kalimat
        validate(val) {
            val = parseInt(val)
            if (!isNaN(val)) {
                throw new Error('Name harus merupakan sebuah string')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8, // Minimal 8 karakter
    },
    age: {
        type: Number,
        set: val => parseInt(val),
        default: 0 
    }

})

const User = mongoose.model('User', userSchema)
module.exports = User