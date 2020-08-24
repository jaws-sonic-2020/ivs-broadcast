import React, { useCallback, useState } from 'react'
import { Container, Feed } from 'semantic-ui-react'
import WebSocket from 'react-websocket'

import TwitterFeed from './TwitterFeed'

export type TwitterProps = {
  wsUrl: string;
}

function Twitter({ wsUrl }: TwitterProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])

  const handleMessage = useCallback((data: any) => {
    const tweet: Tweet = JSON.parse(data)
    console.log(tweet)
    setTweets([tweet, ...tweets].slice(0, 100))
  }, [tweets])

  return (
    <Container>
      <Feed
        children={tweets.map((tweet) => <TwitterFeed key={tweet.id} tweet={tweet} />)}
      />
      <WebSocket url={wsUrl} onMessage={handleMessage} />
    </Container>
  )
}

export default Twitter
