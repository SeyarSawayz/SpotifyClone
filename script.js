let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterPlay = document.querySelector("#masterPlay");
let progressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let masterSongName = document.querySelector("#masterSongName");

let listPlay = Array.from(document.getElementsByClassName("listPlay"));

let songs = [
  {
    songName: "Khairiyat ",
    filePath: "./songs/1.mp3",
    coverPath: "./covers/1.jpg",
  },
  {
    songName: "Apna Bana Le",
    filePath: "./songs/2.mp3",
    coverPath: "./covers/2.jpg",
  },
  {
    songName: "Chaleya  ",
    filePath: "./songs/3.mp3",
    coverPath: "./covers/3.jpg",
  },
  {
    songName: "Heeriye ",
    filePath: "./songs/4.mp3",
    coverPath: "./covers/4.jpg",
  },
  {
    songName: "Chale Aana",
    filePath: "./songs/5.mp3",
    coverPath: "./covers/5.jpg",
  },
  {
    songName: "Bekhayali",
    filePath: "./songs/6.mp3",
    coverPath: "./covers/6.jpg",
  },
  {
    songName: "Bol Do na Zara",
    filePath: "./songs/7.mp3",
    coverPath: "./covers/7.jpg",
  },
  {
    songName: "Tumse Bhi Zyada",
    filePath: "./songs/8.mp3",
    coverPath: "./covers/8.jpg",
  },
  {
    songName: "Bandeya",
    filePath: "./songs/9.mp3",
    coverPath: "./covers/9.jpg",
  },
  {
    songName: "Ayat",
    filePath: "./songs/1.mp3",
    coverPath: "./covers/10.jpg",
  },
];

const playPause = function (buttonName) {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    buttonName.classList.remove("fa-play-circle");
    buttonName.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    buttonName.classList.remove("fa-pause-circle");
    buttonName.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
};
masterPlay.addEventListener("click", () => {
  playPause(masterPlay);
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

songItem.forEach((elem, i) => {
  elem.getElementsByTagName("img")[0].src = songs[i].coverPath;
  elem.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const makeAllPlay = () => {
  listPlay.forEach((elem) => {
    elem.classList.add("fa-play-circle");
    elem.classList.remove("fa-pause-circle");
  });
};

listPlay.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    makeAllPlay();

    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    if (audioElement.pause || audioElement.currentTime <= 0) {
      audioElement.play();
      listPlay[songIndex].classList.remove("fa-play-circle");
      listPlay[songIndex].classList.add("fa-pause-circle");
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      listPlay[songIndex].classList.remove("fa-pause-circle");
      listPlay[songIndex].classList.add("fa-play-circle");
      gif.style.opacity = 1;
    }
    // audioElement.play();

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  });
});

document.querySelector("#next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;

  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.querySelector("#prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

audioElement.addEventListener("ended", () => {
  songIndex += 1;
  if (songIndex > songs.length - 1) {
    songIndex = 0; //
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
});
