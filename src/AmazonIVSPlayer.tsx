import React, { useEffect, useRef } from 'react';
import { PlayerEventType, TextMetadataCue } from 'amazon-ivs-player'

export type AmazonIVSPlayerProps = {
  stream: string,
  width: string | number,
  onPlayerTextMetadataQue: (cue: TextMetadataCue) => void,
}

function AmazonIVSPlayer(props: AmazonIVSPlayerProps) {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js';
    script.async = true;
    document.body.appendChild(script);
    let player: any;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      // @ts-ignore
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        // @ts-ignore
        player = IVSPlayer.create();
        player.attachHTMLVideoElement(document.getElementById('video-player'));
        player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, props.onPlayerTextMetadataQue);
        player.load(props.stream);
        player.play();
      }

      return () => {
        if (player) {
          player.removeEventListener(PlayerEventType.TEXT_METADATA_CUE, props.onPlayerTextMetadataQue);
        }
      }
    }

    return () => {
      document.body.removeChild(script);
    }
  }, [props.stream, props.onPlayerTextMetadataQue]);

  return (
    <video
      id="video-player"
      ref={videoEl}
      playsInline
      autoPlay
      width={props.width}
      controls
    />
  );
}

export default AmazonIVSPlayer;
