import React, { useCallback, createRef } from 'react';
import { Container, Grid, Header, Icon, Ref, Sticky, Menu } from 'semantic-ui-react';
import { TextMetadataCue } from 'amazon-ivs-player';
import AmazonIVSPlayer from './AmazonIVSPlayer';
import Twitter from './Twitter';

function App() {
  const handlePlayerTextMetadataQue = useCallback((cue: TextMetadataCue) => {
    console.log('Timed metadata', cue.text);
  }, [])

  const contextRef = createRef<HTMLElement>()

  return (
    <div>
      <Ref innerRef={contextRef}>
        <Grid>
          <Grid.Column width={12}>
            <Sticky context={contextRef}>
              <AmazonIVSPlayer
                width="100%"
                onPlayerTextMetadataQue={handlePlayerTextMetadataQue}
                stream={process.env['REACT_APP_IVS_STREAM']!}
              />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={4} style={{ paddingLeft: 0 }}>
            <Container style={{ paddingTop: '1em', paddingRight: '1em' }}>
              <Header as="h3" textAlign="center" block>
                <Icon name="twitter square" /> #jawssonic2020
              </Header>
              <Twitter wsUrl={process.env['REACT_APP_WS_URL']!} />
            </Container>
          </Grid.Column>
        </Grid>
      </Ref>
    </div>
  );
}

export default App;
