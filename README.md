# ivs-broadcast

使い方

## AWS 準備

### DynamoDB

以下のテーブルを作成

| プライマリパーティションキー | プライマリソートキー |
| ---------------------------- | -------------------- |
| id (文字列)                  | answer (数値)        |

### Cognito ID プール

ID プールを作成し、認証されていない ID のロールに、上記 DynamoDB テーブルに対して以下のアクションの権限を付与。

- dynamodb:Query
- dynamodb:UpdateItem

## 設定ファイル作成

以下の内容で `.env.local` ファイルを作成。

```bash
# 画面用
REACT_APP_IVS_STREAM=https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8
REACT_APP_AWS_REGION=ap-northeast-1
REACT_APP_AWS_IDPOOL_ID=
REACT_APP_SURVEYS_TABLENAME=surveys
```

## アンケートの開始/終了

`SURVEY_ID` は任意の文字列

### 開始

```console
aws ivs put-metadata --channel-arn "my_channel" --metadata "start:SURVEY_ID"
```

### 終了

```console
aws ivs put-metadata --channel-arn "my_channel" --metadata "end:SURVEY_ID"
```

## Web サーバの起動

```console
yarn start
```

http://localhost:3000/ へアクセス。
