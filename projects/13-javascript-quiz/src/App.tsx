import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './components/JavaScriptLogo'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'
import { Footer } from './components/Footer'

function App() {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <Typography variant="h2" component="h1">
            <JavaScriptLogo />
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

        <Footer />

      </Container>
    </main>
  )
}

export default App
