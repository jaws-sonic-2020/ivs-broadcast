import AWS from 'aws-sdk'

const TABLENAME = process.env.REACT_APP_SURVEYS_TABLENAME

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

const docClient = new AWS.DynamoDB.DocumentClient()

function vote(surveyId: string, selection: number) {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: TABLENAME!,
    Key: {
      id: surveyId,
      answer: selection,
    },
    UpdateExpression: 'ADD #count :one',
    ExpressionAttributeNames: {
      '#count': 'count',
    },
    ExpressionAttributeValues: {
      ':one': 1,
    },
  }

  return new Promise<void>((resolve, reject) => {
    docClient.update(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function query(surveyId: string) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: TABLENAME!,
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': surveyId,
    },
  }

  return new Promise<number[]>((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const counts = [0, 0, 0, 0]
        if (data.Items) {
          data.Items.forEach((item) => {
            counts[item.answer - 1] = item.count
          })
        }
        resolve(counts)
      }
    })
  })
}

export { vote, query }
