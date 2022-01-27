const field = document.querySelector('.container .field');
const results = document.querySelector('.container .results');
const searchBtn = document.querySelector('.search');

searchBtn.addEventListener('click', async (e) => {

  try {
    // fetching data from the dictionary api
    const data = await getData(field.value);
    
    // error handling
    if(data.length < 1) return;
    
    // inserting the element via innerHTML
    results.innerHTML = `
      <div class="audio">
      <div class="word">${data[0].word}</div>
        <div class="type"><span class="bold">${data[0].meanings[0].partOfSpeech}</span> ${data[0].phonetic}</div>
        <div class="btn-wrapper">
          <div class="enableAudio" data-audio="${data[0].phonetics[0].audio}"></div>
        </div>
      </div>
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
    
    const audioBtn = document.querySelector('.enableAudio');
    
    //adding event listener to audio button
    audioBtn.addEventListener('click', async (e) => {
      const audio = new Audio(e.target.dataset.audio);
      await audio.play();
      
      //interval for checking if audio is playing or not
      const interval = setInterval(() => {
        if(!audio.paused){
          e.target.classList.add('disable');
        }else{
          e.target.classList.remove('disable');
          clearInterval(interval);
        }
      }, 100);
    });
    
  } catch (err) {
    console.error(err);
  }

});


// fetching function
function getData(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}