import React, { useCallback, useState } from 'react'
import { Container, Feed } from 'semantic-ui-react'
import WebSocket from 'react-websocket'

import TwitterFeed from './TwitterFeed'

export type TwitterProps = {
  wsUrl: string
}

function TwitterPanel({ wsUrl }: TwitterProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])

  const handleMessage = useCallback(
    (data: any) => {
      const tweet: Tweet = JSON.parse(data)
      console.log(tweet)
      setTweets((tw) => [tweet, ...tw].slice(0, 100))
    },
    [setTweets]
  )

  return (
    <Container>
      <Feed
        children={tweets.map((tweet) => (
          <TwitterFeed key={tweet.id} tweet={tweet} />
        ))}
      />
      <WebSocket url={wsUrl} onMessage={handleMessage} />
    </Container>
  )
}

export default TwitterPanel
