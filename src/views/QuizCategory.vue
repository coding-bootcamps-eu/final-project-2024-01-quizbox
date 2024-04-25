<template>
  <div>
    <h1>Select a Category</h1>
    <!-- Display a loading message when state.loading is true, otherwise progress -->
    <div v-if="state.loading">Loading...</div>
    <div v-else>
      <!-- Dropdown menu for selecting category/title -->
      <select v-model="selectedTitle" @change="selectTitle(selectedTitle)">
        <option disabled value="">Please select a category</option>
        <option v-for="title in state.titles" :key="title.id" :value="title.id">
          {{ title.title }}
        </option>
      </select>
    </div>
    <hr v-if="!state.loading && state.questions.length > 0" />
    <div v-if="!state.loading && state.questions.length > 0">
      <!-- If error occurs -->
      <div v-if="state.error">{{ state.error }}</div>
      <!-- If questions are available -->
      <div v-else>
        <!-- If currentQuestion is not null -->
        <div v-if="currentQuestion !== null">
          <!-- Show the progress -->
          <p>Question {{ currentQuestion + 1 }} of {{ state.questions.length }}</p>
          <!-- Show the current question -->
          <h2>{{ state.questions[currentQuestion].question }}</h2>
          <ul>
            <!-- Display answers (clickable) -->
            <li v-for="answer in state.questions[currentQuestion].answers" :key="answer.id">
              <button @click="selectAnswer(state.questions[currentQuestion].id, answer.id)">
                {{ answer.text }}
              </button>
            </li>
          </ul>
        </div>
        <!-- If currentQuestion is null (Quiz completed) -->
        <div v-else>
          <h2>You have finished the quiz!</h2>
          <!-- Reset button -->
          <button @click="resetQuiz">Reset Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'

export default {
  setup() {
    const state = reactive({
      loading: false,
      titles: [], // Initialize titles as an empty array
      selectedTitle: null,
      questions: [],
      error: null
    })

    const currentQuestion = ref(null)

    const fetchTitles = async () => {
      state.loading = true
      try {
        const response = await fetch('http://localhost:3000/groups')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        state.titles = data
      } catch (error) {
        console.error('Error fetching categories:', error)
        state.error = 'Failed to fetch categories'
      } finally {
        state.loading = false
      }
    }

    const selectTitle = async (titleId) => {
      state.loading = true
      try {
        let groupIds
        if (titleId === 'c76668d0-ce3a-48a7-acd5-0f54ad6818e1') {
          // Fetch questions for "Basic HTML and CSS"
          groupIds = 'c76668d0-ce3a-48a7-acd5-0f54ad6818e1'
          // Call fetchData function to get questions and answers for Basic HTML and CSS
          await fetchData(groupIds)
        } else if (titleId === '9d5ae045-ef9a-4068-bc6c-1b102bda5f55') {
          // Fetch questions for "Basic JS"
          groupIds = '9d5ae045-ef9a-4068-bc6c-1b102bda5f55'
          // Call fetchData function to get questions and answers for Basic JS
          await fetchData(groupIds)
        } else {
          throw new Error('Invalid titleId')
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
        state.error = 'Failed to fetch questions'
      } finally {
        state.loading = false
      }
    }

    const fetchData = async (groupIds) => {
      state.loading = true
      try {
        const response = await fetch(`http://localhost:3000/quiz/collection?group=${groupIds}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        state.questions = data.data
        currentQuestion.value = 0 // Set current question index to 0
      } catch (error) {
        console.error('Error fetching data:', error)
        state.error = 'Failed to fetch data'
      } finally {
        state.loading = false
      }
    }

    const selectAnswer = (questionId, answerId) => {
      console.log(`Selected answer for question ${questionId}: ${answerId}`)
      // Progress to the next question
      if (currentQuestion.value < state.questions.length - 1) {
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
      fetchTitles()
    }

    onMounted(() => {
      fetchTitles()
    })

    return {
      state,
      selectTitle,
      selectAnswer,
      currentQuestion,
      resetQuiz
    }
  }
}
</script>
