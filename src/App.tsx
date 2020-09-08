import React, { useCallback, useState } from 'react'
import { TextMetadataCue } from 'amazon-ivs-player'
import { Container, Input, Button, Field, Control } from 'trunx'
import AmazonIVSPlayer from './AmazonIVSPlayer'
import Survey, { SurveyProps } from './Survey'

const START = 'start:'
const END = 'end:'

function App() {
  const [surveyInfo, setSurveyInfo] = useState<SurveyProps[]>([])

  const handlePlayerTextMetadataQue = useCallback((cue: TextMetadataCue) => {
    console.log('Timed metadata', cue.text)
    if (cue.text.startsWith(START)) {
      const id = cue.text.substring(START.length)
      setSurveyInfo((info) => [
        { surveyId: id, isActive: true, start: new Date() },
        ...info.filter((s) => s.surveyId !== id),
      ])
    } else if (cue.text.startsWith(END)) {
      const id = cue.text.substring(END.length)
      setSurveyInfo((info) =>
        info.map((s) => (s.surveyId === id ? { ...s, isActive: false } : s))
      )
    }
  }, [])

  let debugControl: React.ReactNode | undefined
  if (process.env.NODE_ENV === 'development') {
    const putMetadata = (key: string) => {
      const test = document.getElementById('test')
      if (test) {
        const id = (test as HTMLInputElement).value
        handlePlayerTextMetadataQue({
          text: key + id,
        } as TextMetadataCue)
      }
    }
    debugControl = (
      <Container>
        <Field hasAddons>
          <Control>
            <Input id="test" size={10} type="text" defaultValue="test" />
          </Control>
          <Control>
            <Button isInfo onClick={() => putMetadata(START)}>
              start
            </Button>
          </Control>
          <Control>
            <Button isDanger onClick={() => putMetadata(END)}>
              end
            </Button>
          </Control>
        </Field>
      </Container>
    )
  }

  return (
    <div>
      <AmazonIVSPlayer
        width="100%"
        onPlayerTextMetadataQue={handlePlayerTextMetadataQue}
        stream={process.env.REACT_APP_IVS_STREAM!}
      />
      {debugControl}
      {surveyInfo.map((s) => (
        <Survey
          key={s.surveyId}
          surveyId={s.surveyId}
          isActive={s.isActive}
          start={s.start}
        />
      ))}
    </div>
  )
}

export default App
