import express from 'express'
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

let users = []

const tweets = []


app.post("/sign-up", (req, res) => {

    const user = req.body
    const avatar = user.avatar
    const pattern = /^https:\/\//i;

    if (user.username.length !== 0 && pattern.test(avatar)) {
        users.push(req.body);
        res.status(201).send("OK");
    } else {
        res.status(400).send("Confira se o seu nome está correto e se inseriu um link válido")
    }

})

app.post("/tweets", (req, res) => {

    const username = req.headers.user
    let tweet;

    if (req.body.tweet.length !== 0 && username.length !== 0) {
        users.map((user) => {
            if (user.username === username) {
                tweet = {
                    username,
                    avatar: user.avatar,
                    tweet: req.body.tweet
                }
            }
        })
        tweets.unshift(tweet)
        res.status(201).send("OK");
    } else {
        res.status(400).send("O tweet deve ter algum conteúdo")
    }
})

app.get("/tweets", (req, res) => {

    const tweetsList = []

    tweets.map((tweet, index) => {
        if (index <= 9) {
            tweetsList.push(tweet)
        }
    })

    res.send(
        tweetsList
    )
})

app.listen(5000)