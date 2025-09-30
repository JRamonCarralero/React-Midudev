import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'

function App() {
  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage, interchangeLanguages } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      
      <Row>
        <Col>
          <h2>From</h2>
          <LanguageSelector onChange={setFromLanguage} type={SectionType.From} value={fromLanguage} />
        </Col>

        <Col>
          <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => interchangeLanguages()}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <h2>To</h2>
          <LanguageSelector onChange={setToLanguage} type={SectionType.To} value={toLanguage} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
