declare module 'react-time-ago' {
  import React from 'react'

  interface ReactTimeAgoProps {
    date: Date | number
    locale?: string
    locales?: string[]
    timeStyle?: 'twitter' | 'time' | object
    tooltip?: boolean
    formatVerboseDate?: Function
    verboseDateFormat?: object
    updateInterval?: number
    tick?: boolean
    container?: Function
    style?: object
  }

  class ReactTimeAgo extends React.Component<ReactTimeAgoProps> {}

  export = ReactTimeAgo
}
