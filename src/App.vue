<template>
  <div>
    <h1>Quizbox</h1>
    <button @click="getQuestions">Show Questions</button>
    <hr />
    <div v-if="questions.length > 0">
      <!--Wenn question grösser als 0 dann render-->
      <div v-for="q in questions" :key="q.id">
        <!--v-for Schleife für questions-->
        <h2>{{ q.title }} - {{ q.question }}</h2>
        <p>{{ q.id }} - {{ q.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: []
    }
  },
  methods: {
    async getQuestions() {
      try {
        const response = await fetch('http://localhost:3000/groups')
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        this.questions = data
        console.log('Questions fetched:', data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
  }
}
</script>

<style>
@import url('@/assets/global.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: monospace;
}

body {
  background-color: green;
  color: whitesmoke;
}
</style>
