import React, { useCallback, useState, useEffect } from 'react'
import { Button, Buttons, Container, Tile, Title } from 'trunx'
import { Pie } from 'react-chartjs-2'
import Moment from 'react-moment'
import 'moment-timezone'

import { vote, query } from './vote'

export type SurveyProps = {
  surveyId: string
  isActive: boolean
  start: Date
}

function Survey({ surveyId, isActive, start }: SurveyProps) {
  const [data, setData] = useState<number[]>()
  const [selection, setSelection] = useState<number>()

  const handleClick = useCallback(
    async (n: number) => {
      if (isActive && !selection) {
        try {
          await vote(surveyId, n)
          setSelection(n)
        } catch (err) {
          console.log(err)
        }
      }
    },
    [isActive, selection]
  )

  useEffect(() => {
    if (!data && !isActive) {
      setTimeout(async () => {
        const counts = await query(surveyId)
        setData(counts)
      }, 1000)
    }
  }, [isActive])

  return (
    <Container>
      <Tile.Ancestor>
        <Tile isVertical>
          <Tile isParent>
            <Tile.Child.Box>
              <Title>
                開始時間:{' '}
                <Moment
                  date={start}
                  locale="ja"
                  tz="Asia/Tokyo"
                  format="YYYY/MM/DD h:mm"
                />
                {!isActive && ' (終了)'}
              </Title>
              <Buttons>
                <Button
                  isInfo
                  isLight={(!!selection || !isActive) && selection !== 1}
                  onClick={() => handleClick(1)}
                >
                  1
                </Button>
                <Button
                  isSuccess
                  isLight={(!!selection || !isActive) && selection !== 2}
                  onClick={() => handleClick(2)}
                >
                  2
                </Button>
                <Button
                  isWarning
                  isLight={(!!selection || !isActive) && selection !== 3}
                  onClick={() => handleClick(3)}
                >
                  3
                </Button>
                <Button
                  isDanger
                  isLight={(!!selection || !isActive) && selection !== 4}
                  onClick={() => handleClick(4)}
                >
                  4
                </Button>
              </Buttons>
              {selection && isActive && <p>投票済</p>}
              {!isActive && !data && <p>集計中</p>}
              {data && (
                <Pie
                  data={{
                    datasets: [
                      {
                        data,
                        backgroundColor: [
                          'hsl(204, 86%, 53%)',
                          'hsl(141, 71%, 48%)',
                          'hsl(48, 100%, 67%)',
                          'hsl(348, 100%, 61%)',
                        ],
                      },
                    ],
                    labels: ['1', '2', '3', '4'],
                  }}
                  options={{
                    legend: {
                      display: true,
                      position: 'right',
                      align: 'start',
                    },
                  }}
                />
              )}
            </Tile.Child.Box>
          </Tile>
        </Tile>
      </Tile.Ancestor>
    </Container>
  )
}

export default Survey
