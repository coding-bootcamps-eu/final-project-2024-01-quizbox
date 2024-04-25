<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/limit">LimitQuiz</router-link>
    <router-link to="/category">Categories</router-link>
    <router-link to="/quiz">QuizApp</router-link>
    <router-link to="/random">Random-Quiz</router-link>
  </nav>
  <router-view />
</template>

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
