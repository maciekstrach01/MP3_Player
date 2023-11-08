//initial reference        
let musicImage = document.querySelector('.container .image-box img');
let songName = document.querySelector('.container .pre-container .song-name');
let artistName = document.querySelector('.container .pre-container .artist-name');
let playPauseBtn = document.querySelector('.container .btns .play-pause-btn');
let prevSongBtn = document.querySelector('.container .btns .fa-backward-step');
let nextSongBtn = document.querySelector('.container .btns .fa-forward-step');
let progressArea = document.querySelector('.container .pre-container .progress-area');
let progressBar = document.querySelector('.container .pre-container .progress-area .progress-bar');
let currTime = document.querySelector('.container  .pre-container .progress-area .curr-time');
let totalTime = document.querySelector('.container  .pre-container .progress-area .total-time');
let playIcon = document.querySelector('.container .btns .play-pause-btn .fa-play');
let pauseIcon = document.querySelector('.container .btns .play-pause-btn .fa-pause');
let music = document.querySelector('#music');


// Add an event listener for the song list items
const songList = document.querySelectorAll('.song-list li');
songList.forEach((songItem) => {
    songItem.addEventListener('click', () => {
        const selectedIndex = songItem.getAttribute('data-index');
        loadMusic(selectedIndex);
    });
});





// Dodaj funkcję obsługującą kliknięcie na element li w liście piosenek
songList.forEach((songItem, index) => {
  songItem.addEventListener('click', () => {
      // Odtwórz wybraną piosenkę
      playSelectedSong(index);
  });
});

// Funkcja do odtwarzania wybranej piosenki na liście
function playSelectedSong(index) {
  // Aktualizuj indeks piosenki i załaduj ją
  musicIndex = index + 1; // Dodaj 1 do indeksu, aby uwzględnić numerację od 1
  loadMusic(musicIndex);
  // Odtwórz piosenkę
  music.play();
  // Zaktualizuj wygląd przycisku play/pause
  pauseIcon.style.display = 'block';
  playIcon.style.display = 'none';
  playPauseBtn.classList.remove('play');
}



let musicIndex = 1;
let loadMusic =(musicIndex)=>{
 musicImage.src = `${allmusic[musicIndex - 1].img}.jpg`;    
 music.src = `${allmusic[musicIndex - 1].src}.mp3`;
 songName.innerHTML = `${allmusic[musicIndex - 1].name}`;
 artistName.innerHTML = `${allmusic[musicIndex - 1].artist}`;
}

//play pause audio
playPauseBtn.addEventListener('click',()=>{
if(playPauseBtn.classList.contains('play')){
 playIcon.style.display = 'none';
 pauseIcon.style.display = 'block';
 playPauseBtn.classList.remove('play');
 music.play();
}else{
 pauseIcon.style.display = 'none';
 playIcon.style.display = 'block';
 playPauseBtn.classList.add('play');
 music.pause();        
}    
})

//next music
nextSongBtn.addEventListener('click',()=>{
 musicIndex++;
 musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
 progressBar.style.width = '0px';
 if(playPauseBtn.classList.contains('play')){
   playPauseBtn.classList.remove('play');
   pauseIcon.style.display = 'block';
   playIcon.style.display = 'none';
 }
 loadMusic(musicIndex);
  music.play();
})

// prev music
prevSongBtn.addEventListener('click',()=>{
  musicIndex--;
  musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
  progressBar.style.width = '0px';
  if(playPauseBtn.classList.contains('play')) {
    playPauseBtn.classList.remove('play');
    pauseIcon.style.display = 'block';
    playIcon.style.display = 'none';
  }  
  loadMusic(musicIndex);
  music.play();
})

//curr Time & total Time
music.addEventListener('timeupdate',(e)=>{
 let currDuration = e.target.currentTime;
 let totalDuration = e.target.duration;
 
 //curr Time
 let currMin = Math.floor(currDuration / 60);
 let currSec = Math.floor(currDuration % 60);
 if(currSec < 10){
   currSec = '0' + currSec;      
 }
  currTime.innerHTML = `${currMin}:${currSec}`;
  
  //total time
 music.addEventListener('loadeddata',(e)=>{
  let audioDuration = e.target.duration;
  
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec =Math.floor(audioDuration % 60);
  if(totalSec < 10){
    totalSec = '0' + totalSec;      
  }
  totalTime.innerHTML = `${totalMin}:${totalSec}`;
 })
 
 //Progress width
 let progressWidth = (currDuration / totalDuration) * 100;
 progressBar.style.width = `${progressWidth}%`;
 //music progress change on click
 progressArea.addEventListener('click', (e) => {
     let progressWidth = progressArea.clientWidth;
     let clickedOffsetX = e.offsetX;
     let songDuration = music.duration;
     music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
      music.play();
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
      playPauseBtn.classList.remove('play');
 })
})


/*
// Pobierz referencje do przycisku i kontenera z listą piosenek
const toggleLayoutButton = document.getElementById('toggleLayoutButton');
const songListContainer = document.querySelector('.song-list');
const playerContainer = document.querySelector('.container');
const imageBox = document.querySelector('.image-box');

// Dodaj obsługę kliknięcia przycisku zmiany układu
let isListVisible = true; // Początkowo lista jest widoczna
let isPlayerExpanded = false; // Początkowo odtwarzacz nie jest rozszerzony
let isImageVisible = false; // Początkowo zdjęcie artysty jest ukryte

toggleLayoutButton.addEventListener('click', () => {
    if (isListVisible) {
        // Rozszerz odtwarzacz na cały ekran i ukryj listę
        playerContainer.style.width = '100%';
        isPlayerExpanded = true;
        songListContainer.style.display = 'none';
        isListVisible = false;

        const container = document.querySelector('.container');
        if (container) {
            container.style.left = '50%';
        }


        // Sprawdź, czy zdjęcie jest widoczne i zachowaj stan
        if (isImageVisible) {
            imageBox.style.display = 'block';
        }
    } else {
        // Wróć do stanu początkowego
        container = document.querySelector('.container');
        if (container) {
            container.style.left = '65%';
        }
        playerContainer.style.width = '45%';
        isPlayerExpanded = false;
        songListContainer.style.display = 'block';
        isListVisible = true;

        // Zachowaj stan zdjęcia artysty
        if (isImageVisible) {
            imageBox.style.display = 'block';
        }
    }
    
    // Zaktualizuj stan zdjęcia artysty
    isImageVisible = !isImageVisible;
});

*/








// Pobierz referencje do przycisku i kontenera z listą piosenek
const toggleLayoutButton = document.getElementById('toggleLayoutButton');
const songListContainer = document.querySelector('.song-list');
const playerContainer = document.querySelector('.container');
const imageBox = document.querySelector('.image-box');

// Dodaj obsługę kliknięcia przycisku zmiany układu
let isListVisible = true; // Początkowo lista jest widoczna
let isPlayerExpanded = false; // Początkowo odtwarzacz nie jest rozszerzony
let isImageVisible = false; // Początkowo zdjęcie artysty jest ukryte




/*
function handleToggleLayout() {
    if (isListVisible) {
        // Rozszerz odtwarzacz na cały ekran i ukryj listę
        playerContainer.style.width = '100%';
        isPlayerExpanded = true;
        songListContainer.style.display = 'none';
        isListVisible = false;

        const container = document.querySelector('.container');
        if (container) {
            container.style.left = '50%';
        }

        // Sprawdź, czy zdjęcie jest widoczne i zachowaj stan
        if (isImageVisible) {
            imageBox.style.display = 'block';
        }
    } else {
        // Wróć do stanu początkowego
        container = document.querySelector('.container');
        if (container) {
            container.style.left = '65%';
        }
        playerContainer.style.width = '45%';
        isPlayerExpanded = false;
        songListContainer.style.display = 'block';
        isListVisible = true;

        // Zachowaj stan zdjęcia artysty
        if (isImageVisible) {
            imageBox.style.display = 'block';
        }
    }

    // Zaktualizuj stan zdjęcia artysty
    isImageVisible = !isImageVisible;
}

toggleLayoutButton.addEventListener('click', handleToggleLayout);

*/



// Dodaj obsługę zmiany rozdzielczości
/*
const mediaQuery = window.matchMedia('(max-width: 768px)');
mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        // Tutaj dodaj kod, który ma działać tylko dla rozdzielczości 768px i mniejszych
        // Możesz wywołać funkcję handleToggleLayout lub dodać inny kod, który ma działać tylko w tej sytuacji
    }
    
});
*/



function handleToggleLayout() {
  if (window.innerWidth <= 768) {
    if (isListVisible) {
      // Rozszerz odtwarzacz na cały ekran i ukryj listę
      playerContainer.style.width = "100%";
      isPlayerExpanded = true;
      songListContainer.style.display = "none";
      isListVisible = false;

      const container = document.querySelector(".container");
      if (container) {
        container.style.left = "50%";
      }

      // Sprawdź, czy zdjęcie jest widoczne i zachowaj stan
      if (isImageVisible) {
        imageBox.style.display = "block";
      }
    } else {
      // Wróć do stanu początkowego
      container = document.querySelector(".container");
      if (container) {
        container.style.left = "65%";
      }
      playerContainer.style.width = "45%";
      isPlayerExpanded = false;
      songListContainer.style.display = "block";
      isListVisible = true;

      // Zachowaj stan zdjęcia artysty
      if (isImageVisible) {
        imageBox.style.display = "block";
      }
    }
    // Zaktualizuj stan zdjęcia artysty
    isImageVisible = !isImageVisible;
  } else {
    // Warunek dla większych rozdzielczości (brak ograniczenia)
    if (isPlayerExpanded) {
      // Jeśli odtwarzacz jest rozszerzony, zmniejsz go do 35%
      playerContainer.style.width = "25%";
      isPlayerExpanded = false;
      songListContainer.style.display = "block";
      
    } else {
      // Jeśli odtwarzacz nie jest rozszerzony, rozszerz go do 100%
      playerContainer.style.width = "50%";
      isPlayerExpanded = true;
      songListContainer.style.display = "none";
      

      const container = document.querySelector(".container");
      if (container) {
        container.style.left = "50%";
      }

      // Sprawdź, czy zdjęcie jest widoczne i zachowaj stan
      if (isImageVisible) {
        imageBox.style.display = "block";
      }
    }
  }
}

toggleLayoutButton.addEventListener("click", handleToggleLayout);




loadMusic(musicIndex);










