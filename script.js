const Songs = [
  {
    name: "Till I Collapse",
    artist: "Eminem",
    image: "project assests/The_Eminem_Show.jpg",
    audio: "project assests/Eminem - Till I Collapse [HD].mp3",
    genre:"hip-hop"
  },
  {
    name: "Ninte Mizhimuna Kondente",
    artist: "Jassie Gift",
    image: "project assests/jassie_gift1.jpg",
    audio: "project assests/Ninte Mizhimuna (RaagJatt.com).mp3",
    genre:"pop"
  },
  {
    name: "Highway to Hell",
    artist: "AC/DC",
    image: "project assests/ac-dc.jpg",
    audio: "project assests/acdc - my favorite ac dc - highway to hell.mp3",
    genre:"rock"
  },
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    image: "project assests/Blinding-Lights-English.jpg",
    audio: "project assests/The Weeknd - Blinding Lights.mp3",
    genre:"pop"
  },
  {
    name: "Burning in the skies",
    artist: "Linkin Park",
    image: "project assests/lp.jpg",
    audio: "project assests/Burning in the Skies.mp3",
    genre:"rock"
  },
  {
    name: "Kuthanthram",
    artist: "Vedan, Sushin Shyam",
    image: "project assests/kuthanthram.jpg",
    audio: "project assests/kuthanthram.mp3",
    genre:"hip-hop"
  }
];

let themeSelector = document.getElementById("theme-selector");
let isDark = false;
let songList = document.getElementById("song-list");
let genrefilter = document.getElementById("genre");
let selectedGenre =  document.getElementById("genre").value;
let songImage = document.getElementById("song-image");
let songArtist = document.getElementById("song-artist");
let songTitle = document.getElementById("song-title");
let songAudio = document.getElementById("song-audio");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let playLists =[ {playListName : "myPlayList", songs:[]}];
let createPlayListButton = document.getElementById("create-playlist-button");
let createPlayList = document.getElementById("create-playlist");
let allPlayLists = document.getElementById("all-playlists");
let currentPlayList= document.getElementById("current-playlist");
let addToPlayListButton = document.getElementById("add-to-playlist");
let selectedPlayList='';

// for changing theme
themeSelector.addEventListener("click",()=>{
  isDark=!isDark;
  if(isDark){
    themeSelector.style.justifyContent="end";
    themeSelector.style.backgroundColor="rgb(83,83,83)";
    document.body.style.backgroundColor="rgb(18,18,18)";
    document.getElementById("slider").style.borderColor="rgb(18,18,18)";
    document.getElementById("slider").style.boxShadow="-2px -2px 8px  rgb(18,18,18)";
    let mainPortions=document.getElementsByClassName("mainPortion");
    for(section of mainPortions){
      section.style.backgroundColor = "rgb(33,33,33)";
    }
  }
  else{
    themeSelector.style.justifyContent="start";
    themeSelector.style.backgroundColor="lightcyan";
    document.body.style.backgroundColor="rgb(91, 153, 194)";
    let mainPortions=document.getElementsByClassName("mainPortion");
    for(section of mainPortions){
      section.style.backgroundColor = "rgb(26, 72, 112)";
    }
    document.getElementById("slider").style.borderColor="darkslategrey";
    document.getElementById("slider").style.boxShadow="2px 2px 8px  rgb(33,33,33)";
  }
});

// for showing songs when page is loaded
let filteredSongs=showSongs();
renderSong(filteredSongs[0]);


// filter songs based on genre
genrefilter.addEventListener("change",()=>{
  selectedGenre=genrefilter.value;
  filteredSongs=showSongs();
});

// next button 
nextButton.addEventListener("click",()=>{
  nextSong(filteredSongs,songTitle.innerText);
});

// previous button
prevButton.addEventListener("click",()=>{
  prevSong(filteredSongs,songTitle.innerText);
});

// to create to new playlist
createPlayListButton.addEventListener("click",()=>{

  createPlaylist(createPlayList.value);
});

// to show all playlists when page is loaded
showPlayLists();

// to add songs to playlists
addToPlayListButton.addEventListener("click",()=>{
  addToPlaylist();
});



function showSongs(filteredSongs=[]){
  songList.innerHTML="";
  if(filteredSongs.length===0){
    if(selectedGenre!=="all"){
      filteredSongs=Songs.filter(function(currSong){
        return currSong.genre==selectedGenre;
      });
    }
    else{
      filteredSongs=Songs;
    }
  }
  for(let song of filteredSongs){
    let listItem = document.createElement("div");
    listItem.innerText= song.name;
    songList.appendChild(listItem);
    // to render song details when song is selected
    listItem.addEventListener("click",()=>renderSong(song));
  }
  return filteredSongs;
}

function renderSong(song){
  songImage.setAttribute("src",song.image);
  songArtist.innerText=song.artist;
  songTitle.innerText= song.name;
  songAudio.setAttribute("src",song.audio);
}

function nextSong(songsList,currSongName){
  let n= songsList.length;
  let songNames=songsList.map((song)=>{
    return song.name;
  });
  let idx = songNames.indexOf(currSongName);
  let nextIdx;
  if(idx==n-1){
    nextIdx = 0;
  }
  else{
    nextIdx=idx+1;
  }
  let song=songsList[nextIdx];
  renderSong(song);
}

function prevSong(songsList,currSongName){
  let n= songsList.length;
  let songNames=songsList.map((song)=>{
    return song.name;
  });
  let idx = songNames.indexOf(currSongName);
  let prevIdx;
  if(idx==0){
    prevIdx = n-1;
  }
  else{
    prevIdx=idx-1;
  }
  let song=songsList[prevIdx];
  renderSong(song);
}

function createPlaylist(playListName){
  playLists.push({playListName : playListName, songs:[]});
  showPlayLists();
}

function showPlayLists(){
  allPlayLists.innerHTML="";
  for(let playlist of playLists){
    let playListElement = document.createElement("div");
    playListElement.innerText=playlist.playListName;
    allPlayLists.appendChild(playListElement);

    playListElement.addEventListener("click",()=>{
      selectedPlayList=playListElement.innerText;
      document.getElementById("current-playlist-heading").innerText = `Current Playlist - ${selectedPlayList}`;
      showPlayListSongs(playlist);
    });
  }
}

function addToPlaylist(){
  let playListNames = playLists.map((playlist)=>{
    return playlist.playListName;
  });
  let idx = playListNames.indexOf(selectedPlayList);
  let songToBeAdded = Songs.find((song)=>{
    return song.name == songTitle.innerText;
  });
  if(playLists[idx].songs.indexOf(songToBeAdded)==-1){
    playLists[idx].songs.push(songToBeAdded);
  }
  showPlayListSongs(playLists[idx]);
}

// lists each song of the playlist
function showPlayListSongs(playlist){
  currentPlayList.innerHTML="";
  for(let song of playlist.songs){
    let playListSongElem = document.createElement("div");
    playListSongElem.innerText = song.name;
    currentPlayList.appendChild(playListSongElem);
    playListSongElem.addEventListener("click",()=>{
      filteredSongs=showSongs(playlist.songs)
      renderSong(song);
      genrefilter.value="";
    })
  }
}

