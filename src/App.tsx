import React, { useCallback, useState } from 'react'
import { TextMetadataCue } from 'amazon-ivs-player'
import AmazonIVSPlayer from './AmazonIVSPlayer'
import Survey, { SurveyProps } from './Survey'

const START = 'start:'
const END = 'end:'
const CLEAN = 'clean'

function App() {
  const [surveyInfo, setSurveyInfo] = useState<SurveyProps[]>([])

  const handlePlayerTextMetadataQue = useCallback((cue: TextMetadataCue) => {
    console.log('Timed metadata', cue.text)
    if (cue.text.startsWith(START)) {
      const id = cue.text.substring(START.length)
      setSurveyInfo([{ surveyId: id, isActive: true, start: new Date() }])
    } else if (cue.text.startsWith(END)) {
      const id = cue.text.substring(END.length)
      setSurveyInfo((info) =>
        info.map((s) => (s.surveyId === id ? { ...s, isActive: false } : s))
      )
    } else if (cue.text.startsWith(CLEAN)) {
      setSurveyInfo([])
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
      <div>
        <input id="test" size={10} type="text" defaultValue="test" />
        <button onClick={() => putMetadata(START)}>start</button>
        <button onClick={() => putMetadata(END)}>end</button>
        <button onClick={() => putMetadata(CLEAN)}>clean</button>
      </div>
    )
  }

  return (
    <div>
      <AmazonIVSPlayer
        width="100%"
        onPlayerTextMetadataQue={handlePlayerTextMetadataQue}
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
