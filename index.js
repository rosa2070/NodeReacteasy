const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 타입의 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 타입의 데이터를 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://jaeeun:981224@boilerplate.nbsovwf.mongodb.net/?retryWrites=true&w=majority', {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!새해 복 많이')
})

app.post('/register', (req, res) => {

    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})