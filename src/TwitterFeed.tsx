import React from 'react'
import { Feed } from 'semantic-ui-react'
import ReactTimeAgo from 'react-time-ago'

interface TwitterFeedProps {
  tweet: Tweet
}

function TwitterFeed({ tweet }: TwitterFeedProps) {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src={tweet.user.profile_image_url_https} alt={tweet.user.name} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{tweet.user.name}</Feed.User>
          <Feed.Date>
            @{tweet.user.screen_name}・
            <ReactTimeAgo
              date={parseInt(tweet.timestamp_ms, 10)}
              timeStyle="twitter"
              locale="ja"
            />
          </Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          {tweet.truncated ? tweet.extended_tweet?.full_text : tweet.text}
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  )
}

export default TwitterFeed
