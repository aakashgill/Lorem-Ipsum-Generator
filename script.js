import { words } from './words.js';

function getAllElements() {
  return {
    switchInput: document.querySelector('.toggle-theme input'),
    form: document.querySelector('.form'),
    results: document.querySelector('.results'),
    copy: document.querySelector('#copy'),
    copied: document.querySelector('.copied')
  }
}

function switchTheme() {
  const input = getAllElements().switchInput;
  if(input.checked) {
    document.body.classList.add('dark-theme')
    localStorage.setItem('theme', 'dark');
  }
  else {
    document.body.classList.remove('dark-theme')
    localStorage.setItem('theme', 'light');
  }
}

function getTheme() {
  const input = getAllElements().switchInput;
  if(localStorage.getItem('theme') == 'dark') {
    input.checked = true;
    document.body.classList.add('dark-theme')
  }
  if(localStorage.getItem('theme') == 'light') {
    input.checked = false;
    document.body.classList.remove('dark-theme')
  }
}

function getRandomSentence(language) {
  let result = '';
  for(let i = 0; i < 30; i++) {
    result = result + ' ' + words[language][Math.floor(Math.random() * words[language].length - 1)]
  }
  return result;
}

function generateText(e) {
  e.preventDefault();
  let finalStr = '';
  const form = getAllElements().form;
  const results = getAllElements().results;
  const formData = new FormData(form);
  const isLorem = formData.get('isLorem');
  let paragraphCount = formData.get('paragraphs') || 1;
  if(paragraphCount > 1000) {
    alert("I can't count that much. Showing result 1000 times.")
    paragraphCount = 1000;
  }
  if(paragraphCount <= 0) {
    alert("Why enter negative or is it 0?. Showing result 10 times.")
    paragraphCount = 10;
  }
  const language = formData.get('language');
  const startsWith = isLorem && language != "hindi" ? "Lorem Ipsum" : "";
  for(let i = 0; i < paragraphCount; i++){
    finalStr += `<p>${startsWith}${getRandomSentence(language)}</p>`
  }
  results.innerHTML = finalStr;
}

function init() {
  let finalStr = ''
  const results = getAllElements().results;
  for(let i = 0; i < 2; i++){
    finalStr += `<p>Lorem Ipsum ${getRandomSentence("latin")}</p>`
  }
  results.innerHTML = finalStr;
}

function CopyClassText() {
  const copyBtn = getAllElements().copy;
  const textToCopy = getAllElements().results;;
  let currentRange;
  if(document.getSelection().rangeCount > 0) {
    currentRange = document.getSelection().getRangeAt(0);
    window.getSelection().removeRange(currentRange);
  }
  else {
    currentRange = false;
  }
  const CopyRange = document.createRange();
  CopyRange.selectNode(textToCopy);
  window.getSelection().addRange(CopyRange);
  document.execCommand("copy");
  window.getSelection().removeRange(CopyRange);
  if(currentRange) {
    window.getSelection().addRange(currentRange);
  }
  copyTransition();
}

function copyTransition() {
  const copiedText = getAllElements().copied;
  copiedText.style.opacity = 1;
  setTimeout(function() {
    copiedText.style.opacity = 0;
  }, 2000)
}

getTheme();
init();
// Event Listeners
getAllElements().form.addEventListener('submit', generateText);
getAllElements().switchInput.addEventListener('click', switchTheme);
getAllElements().copy.addEventListener('click', CopyClassText);