<template>
  <main>
    <h1>QuizBox</h1>
    <div class="top">Quiz-Boxes</div>
    <div class="category">Category</div>
    <div class="category" id="webDev">Web Dev Foundation</div>
    <div class="category" id="coding">Coding Foundation</div>
    <div class="category" id="webApp">Web Apps Foundation</div>
    <div class="category" id="backends">Restful Backends</div>
    <div class="category" id="vue">Web Apps with VueJS</div>
    <button class="begin">Start!</button>
  </main>
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
  background-color: black;
  color: whitesmoke;
}
</style>
