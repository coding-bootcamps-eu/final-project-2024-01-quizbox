<template>
  <div>
    <h1>Ramdomize Question</h1>
    <div v-if="state.loading">Loading...</div>
    <!--if error then ...-->
    <div v-else-if="state.error">{{ state.error }}</div>
    <div v-else>
      <div v-if="currentQuestion !== null">
        <h2>{{ state.data[currentQuestion].question }}</h2>
        <ul>
          <li v-for="answer in state.data[currentQuestion].answers" :key="answer.id">
            <!--click event to progress-->
            <button @click="selectAnswer(state.data[currentQuestion].id, answer.id)">
              {{ answer.text }}
            </button>
          </li>
        </ul>
      </div>
      <!-- If currentQuestion is null (Quiz completed) -->
      <div v-else>
        <h2>You have finished the quiz!</h2>
        <!-- End-Bild -->

        <!-- Reset button -->
        <button @click="resetQuiz">Reset Quiz</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'

export default {
  setup() {
    const state = reactive({
      data: [],
      error: null,
      loading: false
    })

    const currentQuestion = ref(null)

    const fetchData = async () => {
      state.loading = true
      try {
        const response = await fetch('http://localhost:3000/quiz/collection?random=1')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        state.data = data.data
        currentQuestion.value = 0 // Set the current question index to the first question
      } catch (error) {
        state.error = error.message
      } finally {
        state.loading = false
      }
    }

    const selectAnswer = (questionId, answerId) => {
      //
      console.log(`Selected answer for question ${questionId}: ${answerId}`)
      // Progress to the next question
      if (currentQuestion.value < state.data.length - 1) {
        currentQuestion.value++
      } else {
        currentQuestion.value = null // Quiz completed
      }
    }
    // When Quiz complete then we have "reset-btn"
    const resetQuiz = () => {
      // Reset state and variables
      state.questions = []
      currentQuestion.value = null
      state.error = null
      // Fetch titles again to reset the view
      fetchData()
    }

    onMounted(() => {
      fetchData()
    })

    return {
      state,
      selectAnswer,
      currentQuestion,
      resetQuiz
    }
  }
}
</script>
