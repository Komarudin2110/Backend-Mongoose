const bcrypt = require('bcrypt')

const password = "inibukanpassword"
const hash = '$2b$08$9eO9QbE9.dAtBRB5JgptrOCgBO52.8DQSYyDZbx3y8yOGUa5U8lvq'


// Proses Hashing
bcrypt.hash(password, 8)
.then(res => {
    console.log({password, res});
})


// Proses Compare
bcrypt.compare(password, hash)
    .then(res => {
        console.log(res); // Menghasilkan True dan False
    })