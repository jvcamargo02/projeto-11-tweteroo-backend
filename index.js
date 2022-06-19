import express from 'express'
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

let users = []

const tweets = []

app.post("/sign-up", (req, res) => {

    users.push(req.body)
    
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    const username = req.headers.user
    let tweet;

    users.find((user) => {
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