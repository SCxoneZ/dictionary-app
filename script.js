// https://api.dictionaryapi.dev/api/v2/entries/en/hello
const field = document.querySelector('.container .field');
const results = document.querySelector('.container .results');

field.addEventListener('change', async (e) => {

  try {
    const data = await getWord(e.target.value);
    if (data.length >= 0) {
      results.innerHTML = '';
      results.innerHTML += `
      <div class="audio">
      <div class="word">${data[0].word}</div>
        <div class="type"><span class="bold">${data[0].meanings[0].partOfSpeech}</span> ${data[0].phonetic}</div>
        <div class="btn-wrapper">
          <button class="enableAudio"></button>
        </div>
      </div> 
      `;
      const audioBtn = document.querySelector('.container .results .audio .btn-wrapper .enableAudio');
      const audio = new Audio(data[0].phonetics[0].audio);
      
      audioBtn.addEventListener('click', addAudioListener);
      
      //salah naro interval
      const interval = setInterval(() => {
        if(!audio.paused){
          removeEventListener('click', audioBtn);
        }else{
          audioBtn.addEventListener('click', addAudioListener);
          clearInterval(interval);
        }
      }, 100)
      
      
      results.innerHTML += `
      <div class="cards">
        <div class="cards-header">Definition</div>
        <div class="cards-content">${data[0].meanings[0].definitions[0].definition}</div>
      </div>`
      ;
      
      
      
      
      async function addAudioListener(){
        await audio.play();
      }
      
    }
  } catch (e) {
    console.log(e);
  }

})

function getWord(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err);
}

