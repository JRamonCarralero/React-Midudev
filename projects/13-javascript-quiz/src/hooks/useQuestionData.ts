import { useQuestionsStore } from "../store/questions"

export const UseQuestionData = () => {
  const questions = useQuestionsStore(state => state.questions)
  
    let correct = 0
    let incorrect = 0
    let unanswered = 0
  
    questions.forEach(question => {
      if (!question.usedSelectedAnswer) unanswered++
      else if (question.isCorrectUserAnswer) correct++
      else incorrect++
    })

    return {
      correct,
      incorrect,
      unanswered
    }
}