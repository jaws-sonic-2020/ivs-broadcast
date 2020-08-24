# ivs-broadcast

使い方

## 設定ファイル作成

以下の内容で `.env.local` ファイルを作成。

```bash
# 画面用
REACT_APP_IVS_STREAM=https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8
REACT_APP_WS_URL=ws://localhost:8080/
# Twitter開発キー
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=
# Twitter検索タグ
HASHTAG=logben
```

## Websocketサーバの準備（ここはAPI Gatewayに変わる予定）

```console
yarn run wss
```

## Twitter検索結果をWebsocketサーバへ送信

```console
yarn run tweets
```

## Webサーバの起動

```console
yarn start
```

http://localhost:3000/ へアクセス。
