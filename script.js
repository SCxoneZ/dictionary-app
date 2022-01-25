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
          <div class="enableAudio" data-audio="${data[0].phonetics[0].audio}"></div>
        </div>
      </div> 
      `;
      const audioBtn = document.querySelector('.enableAudio');
      const audio = new Audio(audioBtn.dataset.audio);
      console.log(data[0].phonetics[0].audio);
      console.log(audioBtn);
      console.log(audio);
      console.log(audioBtn.dataset.audio)
      
      audioBtn.addEventListener('click', async function(){
        await audio.play();
      }) 
      
      // const interval = setInterval(() => {
      //   if(!audio.paused){
      //     removeEventListener('click', audioBtn);
      //   }else{
      //     audioBtn.addEventListener('click', async () => await audio.play());
      //     clearInterval(interval);
      //   }
        
      // }, 100)


      results.innerHTML += `
      <div class="cards">
        <div class="cards-header">Definition</div>
        <div class="cards-content">${data[0].meanings[0].definitions[0].definition}</div>
      </div>
      <div class="cards">
        <div class="cards-header">Example</div>
        <div class="cards-content">${data[0].meanings[0].definitions[0].example}</div>
      </div>
      <div class="cards">
        <div class="cards-header">Origin</div>
        <div class="cards-content">${data[0].origin}</div>
      </div>`;
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
