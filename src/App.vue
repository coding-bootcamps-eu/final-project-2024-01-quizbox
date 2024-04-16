<template>
  <div>
    <h1>Quizbox</h1>
    <button @click="getQuestions">Show Questions</button>
    <hr />
    <div v-if="questions.length > 0">
      <!--Wenn question grösser als 0 dann render-->
      <div v-for="(q, index) in questions" :key="q.id">
        <!--v-for Schleife für categorie-->
        <button @click="showQuestion(index, q.title)">{{ q.title }}</button>
        <!--Button für categorie auswahl-->
      </div>
    </div>
    <div v-if="basicJSQuestions && basicJSQuestions.length > 0">
      <h2>Basic JS Questions</h2>
      <div v-for="(q, index) in basicJSQuestions" :key="q.id">
        <button @click="basicJSQuestion(index, q.question)">{{ q.question }}</button>
      </div>
    </div>
    <div v-if="basicHTMLCSSQuestions && basicHTMLCSSQuestions.length > 0">
      <h2>Basic HTML & CSS Questions</h2>
      <div v-for="(q, index) in basicHTMLCSSQuestions" :key="q.id">
        <button @click="basicHTMLCSSQuestion(index, q.question)">{{ q.question }}</button>
      </div>
    </div>
    <p v-if="basicHTMLCSSQuestions">{{ basicHTMLCSSQuestions?.data[index].question }}</p>
    <button @click="index = index - 1">Previous Question</button>
    <button @click="index = index + 1">Next Question</button>
  </div>
  <section>
    <div>
      <p v-if="basicJSQuestions">{{ basicJSQuestions?.data[index].question }}</p>
      <button @click="index = index - 1">Previous Question</button>
      <button @click="index = index + 1">Next Question</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      basicJSQuestions: null,
      basicHTMLCSSQuestions: null, // data property Komponente für API fragen
      index: 0
    }
  },
  created() {
    this.getQuestions()
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
      } catch (error) {
        console.error('Error fetching Basic HTML & CSS questions:', error)
      }
    },
    async fetchBasicJSQuestions() {
      // async function für JS categorie
      try {
        const basicJSResponse = await fetch(
          'http://localhost:3000/quiz/collection?group=c76668d0-ce3a-48a7-acd5-0f54ad6818e1&group=9d5ae045-ef9a-4068-bc6c-1b102bda5f55'
        )
        if (!basicJSResponse.ok) {
          throw new Error('Failed to fetch Basic JS questions')
        }
        const basicJSData = await basicJSResponse.json()
        this.basicJSQuestions = basicJSData
      } catch (error) {
        console.error('Error fetching Basic JS questions:', error)
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
