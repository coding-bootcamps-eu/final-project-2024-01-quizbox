<template>
  <div>
    <h1>Quizbox</h1>
    <button @click="getQuestions">Show Questions</button>
    <hr />
    <div v-if="questions.length > 0">
      <!--Wenn question grösser als 0 dann render-->
      <div v-for="q in questions" :key="q.id">
        <!--v-for Schleife für categorie-->
        <button @click="showQuestion(q.title)">{{ q.title }}</button>
        <!--Button für categorie auswahl-->
      </div>
    </div>
    <div v-if="basicJSQuestions.length > 0">
      <h2>Basic JS Questions</h2>
      <div v-for="q in basicJSQuestions" :key="q.id">
        <button @click="BasicJS(q.title)">{{ q.title }}</button>
      </div>
    </div>
    <div v-if="basicHTMLCSSQuestions.length > 0">
      <h2>Basic HTML & CSS Questions</h2>
      <div v-for="q in basicHTMLCSSQuestions" :key="q.id">
        <button @click="BasicHTMLandCSS(q.title)">{{ q.title }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      basicJSQuestions: [],
      basicHTMLCSSQuestions: []
    }
  },
  methods: {
    async getQuestions() {
      // async function für Categorie
      try {
        const response = await fetch('http://localhost:3000/groups')

        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        this.questions = data

        console.log('Basic Questions fetched:', data)

        // Fetch die anderen API's nachdem erste API erfolgreich war.
        await this.fetchBasicHTMLCSSQuestions()
        await this.fetchBasicJSQuestions()
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    },
    async fetchBasicHTMLCSSQuestions() {
      // async function für HTML und CSS categorie
      try {
        const basicHTMLCSSResponse = await fetch(
          'http://localhost:3000/quiz/collection?group=c76668d0-ce3a-48a7-acd5-0f54ad6818e1'
        )

        if (!basicHTMLCSSResponse.ok) {
          throw new Error('Failed to fetch Basic HTML & CSS questions')
        }
        const basicHTMLCSSData = await basicHTMLCSSResponse.json()
        this.basicHTMLCSSQuestions = basicHTMLCSSData

        console.log('Basic HTML & CSS Questions fetched:', basicHTMLCSSData)
      } catch (error) {
        console.error('Error fetching Basic HTML & CSS questions:', error)
      }
    },
    async fetchBasicJSQuestions() {
      // async function für JS category
      try {
        const basicJSResponse = await fetch(
          'http://localhost:3000/quiz/collection?group=c76668d0-ce3a-48a7-acd5-0f54ad6818e1&group=9d5ae045-ef9a-4068-bc6c-1b102bda5f55'
        )

        if (!basicJSResponse.ok) {
          throw new Error('Failed to fetch Basic JS questions')
        }
        const basicJSData = await basicJSResponse.json()
        this.basicJSQuestions = basicJSData

        console.log('Basic JS Questions fetched:', basicJSData)
      } catch (error) {
        console.error('Error fetching Basic JS questions:', error)
      }
    },
    showQuestion(title) {
      // Zeige frage basierend auf title
      console.log('Showing question:', title)
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
