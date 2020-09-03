/// <reference types="react-scripts" />

declare var IVSPlayer: any

declare type Tweet = {
  id: number
  id_str: string
  text: string
  retweeted_status?: Tweet
  created_at: string
  timestamp_ms: string
  truncated: boolean
  user: {
    id: number
    id_str: string
    name: string
    screen_name: string
    profile_image_url_https: string
  }
  extended_tweet?: {
    full_text: string
  }
}
