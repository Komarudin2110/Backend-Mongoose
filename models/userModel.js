const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
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
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(val) {
            // Validasi apakah inputan dari user merupakan sebuah email
            let result = validator.isEmail(val)
            if (!result) {
                throw new Error("Format email salah !")
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

// Membuat function yang akan dijalankan sebelum proses user.save()
userSchema.pre('save', async function (next) {
    // Data yang masuk dari inputan user
    let user = this

    // Hashing Password
    user.password = await bcrypt.hash(user.password, 8)

    // Menjalankan save
    next()
})

// Create Login Function
userSchema.statics.login = async(email, password) => {
    // Mencari user bedasarkan email 
    let user = await User.findOne({email}) 
    // Jika user tidak di temukan 
    if (!user) {
        throw new Error("E-mail tidak ditemukan")
    }
    // Membandingkan password inputan dari user dengan dari database, mengeluarkan hasil True or False
    let result = await bcrypt.compare(password, user.password)
    if (!result) {
        throw new Error('Password salah !')
    }
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User