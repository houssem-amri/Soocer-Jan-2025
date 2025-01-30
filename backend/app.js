const express = require('express') // import module express
const bodyParser = require('body-parser') // import module body parser
const mongoose = require('mongoose'); // import module mongoose
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const multer = require('multer')
const path = require('path');
const nodemailer = require('nodemailer');

mongoose.connect('mongodb://127.0.0.1:27017/Soccer');

const axios = require('axios');

//*** Start Import Models *** */
const Match = require('./models/matches')
const User = require('./models/users')
const Team = require('./models/teams')
const Player = require('./models/players')



//*** End Import Models *** */



const app = express() // création application express

const secret_key = 'crococoder'

app.use(session({
    secret: secret_key,
    resave: false,
    saveUninitialized: false,

}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );

    next();
});

app.use('/images', express.static(path.join('backend/images')))





app.post('/matches', (req, res) => {
    // Trait logique add Match
    console.log('here into Add Match', req.session.user);
    const data = new Match({
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo,
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
    })
    data.save().then(() => {
        res.status(200).json({ message: 'match added' })
    })

})

app.get('/matches', (req, res) => {
    // Trait logique get all Matches
    Match.find().then((docs) => {
        res.status(200).json({ data: docs })
    })
})

app.get('/matches/:id', (req, res) => {
    // Trait logique get Match  By Id
    const id = req.params.id
    Match.findOne({ _id: id }).then((findedMatch) => {
        res.status(200).json({ match: findedMatch })
    })
})

app.delete('/matches/:id', (req, res) => {
    // Trait logique delete Match
    const id = req.params.id
    Match.deleteOne({ _id: id }).then(() => {
        res.status(200).json({ message: 'match deleted' })
    })
})

app.put('/matches', (req, res) => {
    // Trait logique update Match
    console.log('here req body', req.body);
    const data = new Match({
        _id: req.body._id,
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo,
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
    })

    Match.updateOne({ _id: req.body._id }, data).then(() => {
        res.status(200).json({ message: 'match updated' })
    })



})


app.post('/api/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            console.log('bcrypt err');
        } else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                role: req.body.role,
                password: hash
            })
            user.save((err, docs) => {
                if (err) {
                    res.status(200).json({ message: '1' })
                } else {
                    // fsjs-crococoder@outllok.fr FSJS123456789
                    const transporter = nodemailer.createTransport({
                        host: "****",
                        port: 587,
                        auth: {
                            user: "",
                            pass: "",
                        }           
                    });

                    const htmlContent = `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                            }
                            .header {
                                background-color: #007bff;
                                color: #fff;
                                text-align: center;
                                padding: 10px;
                            }
                            .content {
                                background-color: #fff;
                                padding: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Congratulations!</h1>
                            </div>
                            <div class="content">
                                <p> ${req.body.firstName}You have been accepted for the position.</p>
                                <p>Visit our website for more details.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;
            

                    const mailOptions = {
                        from: 'here adress email',
                        to: req.body.ema,
                        subject: 'Signup',
                        html: htmlContent

                   };

                    transporter.sendMail(mailOptions, function (error,
                        info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    res.status(200).json({ message: '0' })
                }
            })
        }
    });
})


app.post('/api/login', (req, res) => {
    console.log(req.body);

    User.findOne({ email: req.body.email }).then(async (findedUser) => {
        if (!findedUser) {
            return res.status(200).json({ message: '0' })
        }
        const trustedPwd = await bcrypt.compare(req.body.password, findedUser.password)
        if (!trustedPwd) {
            return res.status(200).json({ message: '1' })
        }

        req.session.regenerate(function (err) {
            if (err) {
                console.log('err 1', err);

            }

            // store user information in session, typically a user id
            req.session.user = { id: findedUser._id, firstName: findedUser.firstName }

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) {
                    console.log('err 2', err);

                } else {
                    console.log('ssesion saved');
                }
            })
        })

        const token = jwt.sign({ user: findedUser }, secret_key, { expiresIn: '1h' });

        return res.status(200).json({ message: '2', user: token })

    })
})


const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
})


app.post('/teams', multer({ storage: storage }).single('image'), (req, res) => {

    let url = req.protocol + '://' + req.get('host');

    let image = url + '/images/' + req.file.filename

    const data = new Team({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        image: image,
    })
    data.save().then(() => {
        res.status(200).json({ message: 'team added' })
    })

})


app.get('/teams', (req, res) => {
    // Trait logique get all Matches
    Team.find().then((docs) => {

        res.status(200).json({ teams: docs })
    })
})

app.get('/teams_with_populate', (req, res) => {
    // Trait logique get all Matches
    Team.find().populate('players').then((docs) => {

        res.status(200).json({ teams: docs })
    })
})




app.post('/players', (req, res) => {
    // Trait logique add Match
    console.log(req.body);

    const data = new Player({
        name: req.body.name,
        post: req.body.post,
        number: req.body.number,
        teamId: req.body.teamId,
    })
    data.save((err, doc) => {
        if (err) {
            console.log(err);

        } else {
            Team.findOne({ _id: req.body.teamId }).then((findedTeam) => {
                if (findedTeam) {
                    findedTeam.players.push(doc._id)
                    Team.updateOne({ _id: req.body.teamId }, findedTeam).then(() => {
                        res.status(200).json({ message: 'player added' })
                    })
                }
            })


        }

    })

})


app.get('/players', (req, res) => {
    // Trait logique get all Matches
    Player.find().populate('teamId').then((docs) => {
        res.status(200).json({ players: docs })
    })
})
app.get('/weather_api', (req, res) => {
    // Trait logique get all Matches
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=36.84&lon=10.19&appid=a49826bbd648b9c508e35851bce57932&units=metric').then((result)=>{

        res.json({data:result.data})
        
    })

   
})










module.exports = app // make app exportable