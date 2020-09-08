# ivs-broadcast

使い方

## AWS 準備

### DynamoDB

以下のテーブルを作成

| プライマリパーティションキー | プライマリソートキー |
| ---------------------------- | -------------------- |
| id (文字列)                  | answer (数値)        |

### IAM

上記 DynamoDB テーブルに対して以下のアクションを許可したユーザを作成し、アクセスキーを作成する

- dynamodb:Query
- dynamodb:UpdateItem

## 設定ファイル作成

以下の内容で `.env.local` ファイルを作成。

```bash
# 画面用
REACT_APP_IVS_STREAM=https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8
REACT_APP_WS_URL=ws://localhost:8080/
REACT_APP_HASHTAG='#jawssonic2020'
REACT_APP_AWS_REGION=ap-northeast-1
REACT_APP_AWS_ACCESS_KEY_ID=
REACT_APP_AWS_SECRET_ACCESS_KEY=
REACT_APP_SURVEYS_TABLENAME=surveys
# Twitter開発キー
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=
# Twitter検索タグ
HASHTAG=logben
```

## Websocket サーバの準備（ここは API Gateway に変わる予定）

```console
yarn run wss
```

## Twitter 検索結果を Websocket サーバへ送信

```console
yarn run tweets
```

## Web サーバの起動

```console
yarn start
```

http://localhost:3000/ へアクセス。
