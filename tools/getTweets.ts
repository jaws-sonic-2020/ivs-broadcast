import Twitter from 'twitter'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { EventEmitter } from 'events'
import WebSocket from 'ws'

const myEnv = dotenv.config({ path: '.env.local' })
dotenvExpand(myEnv)

const client = new Twitter({
  consumer_key: process.env['TWITTER_CONSUMER_KEY']!,
  consumer_secret: process.env['TWITTER_CONSUMER_SECRET']!,
  access_token_key: process.env['TWITTER_ACCESS_TOKEN_KEY']!,
  access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET']!,
})

const ws = new WebSocket(process.env['REACT_APP_WS_URL']!)
const hashtag = process.env['HASHTAG']!.toUpperCase()

ws.on('open', () => {
  console.log('open')
  client.stream(
    'statuses/filter',
    { track: `#${hashtag}` },
    (stream: EventEmitter) => {
      stream.on('data', (tweet: any) => {
        if (!tweet.retweeted_status) {
          const hashtags = tweet.truncated
            ? tweet.extended_tweet.entities.hashtags
            : tweet.entities.hashtags
          if (
            hashtags &&
            hashtags.some((tag: any) => hashtag === tag.text.toUpperCase())
          ) {
            console.log(tweet)
            ws.send(JSON.stringify(tweet))
          }
        }
      })

      stream.on('error', (error: any) => {
        console.log(error)
      })
    }
  )
})
