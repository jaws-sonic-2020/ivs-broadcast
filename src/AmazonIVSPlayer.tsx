import React, { useEffect, useRef } from 'react'
import {
  MediaPlayer,
  PlayerEventType,
  TextMetadataCue,
} from 'amazon-ivs-player'

export type AmazonIVSPlayerProps = {
  width: string | number
  onPlayerTextMetadataQue: (cue: TextMetadataCue) => void
}

function AmazonIVSPlayer(props: AmazonIVSPlayerProps) {
  const videoEl = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let player: MediaPlayer
    if (videoEl.current && IVSPlayer.isPlayerSupported) {
      const rootEl = document.getElementById('ivs-player')!
      const stream = rootEl.getAttribute('data-ivs-stream')!

      player = IVSPlayer.create()
      player.attachHTMLVideoElement(videoEl.current)
      player.addEventListener(
        PlayerEventType.TEXT_METADATA_CUE,
        props.onPlayerTextMetadataQue
      )
      player.load(stream)
      player.play()
    }

    return () => {
      if (player) {
        player.removeEventListener(
          PlayerEventType.TEXT_METADATA_CUE,
          props.onPlayerTextMetadataQue
        )
      }
    }
  }, [props.onPlayerTextMetadataQue])

  return (
    <video ref={videoEl} playsInline autoPlay width={props.width} controls />
  )
}

export default AmazonIVSPlayer
