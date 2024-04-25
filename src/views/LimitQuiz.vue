<template>
  <div>
    <h1>Random Quiz 40</h1>

    <!-- input box for selecting the number of questions -->
    <label for="questionLimit">Number of Questions (10-40): </label>
    <!--v-model to bind the input value to questionLimit-->
    <input type="number" id="questionLimit" v-model="questionLimit" min="10" max="40" />

    <!-- button to start the quiz -->
    <button @click="startQuiz" v-if="!quizStarted">Start Quiz</button>

    <div v-if="quizStarted">
      <!--when load fail, then...error-->
      <div v-if="state.loading">Loading...</div>
      <div v-else-if="state.error">{{ state.error }}</div>
      <div v-else>
        <!--when loading, then quiz begin-->
        <div v-if="currentQuestion !== null">
          <h2>{{ state.data[currentQuestion].question }}</h2>
          <ul>
            <li v-for="answer in state.data[currentQuestion].answers" :key="answer.id">
              <button @click="selectAnswer(state.data[currentQuestion].id, answer.id)">
                {{ answer.text }}
              </button>
            </li>
          </ul>
        </div>
        <!--if finish then finish pic + reset option-->
        <div v-else>
          <h2>You have finished the quiz!</h2>
          <button @click="resetQuiz">Reset Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const state = reactive({
      data: [],
      error: null,
      loading: false
    })

    const currentQuestion = ref(null)
    const questionLimit = ref(10) //default limit 10
    const quizStarted = ref(false) //track if the quiz has started or not

    const fetchData = async () => {
      state.loading = true
      try {
        const questionsPerGroup = Math.floor(questionLimit.value / 2) // Calculate number of questions per group
        const response1 = await fetch(
          `http://localhost:3000/quiz/collection?group=c76668d0-ce3a-48a7-acd5-0f54ad6818e1&limit=${questionsPerGroup}&random=1`
        )
        const response2 = await fetch(
          `http://localhost:3000/quiz/collection?group=9d5ae045-ef9a-4068-bc6c-1b102bda5f55&limit=${questionsPerGroup}&random=1`
        )

        if (!response1.ok || !response2.ok) {
          throw new Error('Failed to fetch data')
        }

        const data1 = await response1.json()
        const data2 = await response2.json()

        //combine data from both groups
        state.data = data1.data.concat(data2.data)

        //mix questions
        state.data.sort(() => Math.random() - 0.5)

        currentQuestion.value = 0 //set the current question index to the first question
      } catch (error) {
        state.error = error.message
      } finally {
        state.loading = false
      }
    }

    const selectAnswer = (questionId, answerId) => {
      console.log(`Selected answer for question ${questionId}: ${answerId}`)
      if (currentQuestion.value < state.data.length - 1) {
        currentQuestion.value++
      } else {
        currentQuestion.value = null
      }
    }

    const resetQuiz = () => {
      state.data = []
      currentQuestion.value = null
      state.error = null
      fetchData()
      quizStarted.value = false //when quiz at start "Start Quiz" appear
    }

    const startQuiz = () => {
      //call fetchData to start the quiz
      fetchData()
      quizStarted.value = true //indicate that the quiz has started
    }

    return {
      state,
      selectAnswer,
      currentQuestion,
      resetQuiz,
      questionLimit,
      startQuiz,
      quizStarted
    }
  }
}
</script>
