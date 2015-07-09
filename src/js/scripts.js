/* jshint ignore:start */
let peer = new Peer({key: 'n0ei2j1souk57b9'}),
    //peer = new Peer({host: '52.25.18.170', port: 9000, path: '/myapp'}),
    nameEl = document.getElementById('name-input'),
    setNameButton = document.getElementById('set-name'),
    showHostButton = document.getElementById('show-host'),
    showJoinButton = document.getElementById('show-join'),
    joinHostButton = document.getElementById('join-host'),
    peerId = document.getElementById('friends-peer-id'),
    connectedEl = document.getElementById('connected'),
    gameTile = makeArray(document.getElementsByClassName('tile')),
    gameBoard = makeArray(document.getElementsByClassName('board')),
    game = document.getElementById('game'),
    outputEl = document.getElementById('output'),
    restartButton = document.getElementById('restart'),
    ohCrapButton = document.getElementById('oh-crap'),
    timeEl = document.getElementById('timeTaken'),
    timeStart,
    timeEnd,
    yourMove = true,
    isHost = true,
    playerconnection,
    name,
    opponentName,
    gameMoves = {
      'board1': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board2': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board3': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board4': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board5': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board6': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board7': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board8': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
      'board9': {
        'owned': null,
        'tiles': {
          'tile1': null,
          'tile2': null,
          'tile3': null,
          'tile4': null,
          'tile5': null,
          'tile6': null,
          'tile7': null,
          'tile8': null,
          'tile9': null,
        },
      },
    };


/**
  * Peerjs setup stuff
  */
peer.on('open', function(id) {
  document.getElementById('your-id').innerHTML = `<span>Your id is: <kbd>${id}</kbd></span>`;
});

peer.on('connection', function(playerconnection, name){
  timeStart = performance.now();
  console.log('time started');
  game.dataset.disabled = 'false';
  connectBack(playerconnection.peer);
  playerconnection.on('open', function(){
    renderConnectedTo(playerconnection.peer);

    playerconnection.on('data', function(data){
      if (data.board === 'restart' && data.tile === 'restart' && data.name !== name) {
        restart();
      } else {
        // renderMove(data, 'them');
        receiveData(data, 'them');
      }
    });
  });
  myMove();
});


function renderConnectedTo(peer) {
  connectedEl.innerHTML = `You're connected to <span id="friendID">${peer}</span>`;
  connectedEl.classList.remove('hide');
  document.getElementById('init-wrapper').classList.add('hide');
}

function connectBack(id) {
  // recieve a connection and connect back
  if (typeof playerconnection === 'undefined') {
    // we need to connect back;
    playerconnection = peer.connect(id);
  }
  myMove();
}


/**
  * Setup things (name, join host whatevs)
  */
setNameButton.addEventListener('click', function () {
  setName();
});

nameEl.addEventListener('keydown', function(e) {
  let key = e.which || e.keyCode;
  if (key === 13) { // enter key
    e.preventDefault();
    setName();
  }
});

showHostButton.addEventListener('click', function(){
  document.getElementById('host').classList.toggle('hide');
});

showJoinButton.addEventListener('click', function(){
  document.getElementById('join').classList.toggle('hide');
});

joinHostButton.addEventListener('click', function(){
  yourMove = false;
  isHost = false;
  playerconnection = peer.connect(peerId.value);
  document.getElementById('join').classList.toggle('hide');
});

peerId.addEventListener('keydown', function(e) {
  let key = e.which || e.keyCode;
  if (key === 13) { // enter key
    e.preventDefault();
    yourMove = false;
    isHost = false;
    playerconnection = peer.connect(peerId.value);
    document.getElementById('join').classList.toggle('hide');
  }
});

function setName() {
  let nameInput = document.getElementById('name-input');
  name = nameInput.value;
  nameInput.classList.add('hide');
  setNameButton.classList.add('hide');
  showHostButton.classList.remove('hide');
  showJoinButton.classList.remove('hide');
}


/**
  * Gameplay section
  */
for (let i=0, ii=gameTile.length; i<ii; i++) {
  gameTile[i].addEventListener('click', function(e) {
    if (e.target.dataset.disabled === 'false' && game.dataset.disabled === 'false' && document.getElementById(`board-${e.target.dataset.board}`).dataset.disabled === 'false') {
      sendMove(e.target.dataset);
    }
  });
}

restartButton.addEventListener('click', function(e) {
  e.preventDefault();
  let data = {
    "move": "restart",
    "name": name
  };
  playerconnection.send(data);
  restart();
})

function sendMove(move) {
  yourMove = false;
  renderMove(move, markerMe());
  game.dataset.disabled = 'true';
  let data = {
    "board": move.board,
    "tile": move.tile,
    "name": name
  };
  playerconnection.send(data);
}

function receiveData(data) {
  yourMove = true;
  renderMove(data, markerThem())
  if (document.getElementById('friendID').innerHTML !== data.name) {
    renderConnectedTo(data.name);
  }
  game.dataset.disabled = 'false';
}

function renderMove(data, marker) {
  let tileEl = document.querySelectorAll(`[data-board="${data.board}"][data-tile="${data.tile}"]`);
  tileEl[0].dataset.disabled = 'true';
  tileEl[0].classList.add(marker);
  gameMoves[`board${data.board}`].tiles[`tile${data.tile}`] = marker;
  myMove();
  boardWin(data.board, marker);
  nextMove(data.tile);
}

function nextMove(move) {
  let thisBoard = document.getElementById(`board-${move}`);
  if (thisBoard.dataset.status != 'null') {
    for (let i=0, ii=gameBoard.length; i<ii; i++) {
      if (gameBoard[i].id !== `board-${move}` && gameBoard[i].dataset.status == 'null') {
        gameBoard[i].dataset.disabled = 'false';
      } else {
        gameBoard[i].dataset.disabled = 'true';
      }
    }
  } else {
    for (let i=0, ii=gameBoard.length; i<ii; i++) {
      if (gameBoard[i].id !== `board-${move}` || gameBoard[i].dataset.status != 'null') {
        gameBoard[i].dataset.disabled = 'true';
      } else {
        gameBoard[i].dataset.disabled = 'false';
      }
    }
  }
}

function boardWin(board, marker) {
  let calcMoves = gameMoves[`board${board}`].tiles;
  let tilesWon = [];
  for (var i in calcMoves) {
    if (calcMoves[i] == marker) {
      tilesWon.push(i);
    }
  }
  if (tilesWon.length >= 3) {
    if (winningCalc(tilesWon, 'tile')) {
      let winningBoard = document.getElementById(`board-${board}`);
      winningBoard.dataset.disabled = 'true';
      winningBoard.dataset.status = marker;
      winningBoard.classList.add(marker);
      gameMoves[`board${board}`].owned = marker;
      gameWin(marker);
    }
  }
}

function gameWin(marker) {
  let boardsWon = [];
  for (var i in gameMoves) {
    if (gameMoves[i].owned == marker) {
      boardsWon.push(i);
    }
  }
  if (boardsWon.length >= 3) {
    if (winningCalc(boardsWon, 'board')) {
      restartButton.classList.remove('hide');
      timeEnd = performance.now();
      let timeTakenInMs = (timeEnd - timeStart);
      let timeTaken = msToTime(timeTakenInMs);
      timeEl.innerHTML = `Total game time: ${timeTaken}`;
      timeEl.classList.remove('hide');
      if (isHost) {
        if (marker === 'x') {
          outputEl.innerHTML = 'You Win!';
        } else {
          outputEl.innerHTML = 'You Lost...';
        }
      } else {
        if (marker === 'x') {
          outputEl.innerHTML = 'You Lost...';
        } else {
          outputEl.innerHTML = 'You Win!';
        }
      }
    }
  }
}

function winningCalc(claimedSpaces, space) {
  if (
    (claimedSpaces.indexOf(`${space}1`) > -1 && claimedSpaces.indexOf(`${space}2`) > -1 && claimedSpaces.indexOf(`${space}3`) > -1) ||
    (claimedSpaces.indexOf(`${space}4`) > -1 && claimedSpaces.indexOf(`${space}5`) > -1 && claimedSpaces.indexOf(`${space}6`) > -1) ||
    (claimedSpaces.indexOf(`${space}7`) > -1 && claimedSpaces.indexOf(`${space}8`) > -1 && claimedSpaces.indexOf(`${space}9`) > -1) ||
    (claimedSpaces.indexOf(`${space}1`) > -1 && claimedSpaces.indexOf(`${space}5`) > -1 && claimedSpaces.indexOf(`${space}9`) > -1) ||
    (claimedSpaces.indexOf(`${space}3`) > -1 && claimedSpaces.indexOf(`${space}5`) > -1 && claimedSpaces.indexOf(`${space}7`) > -1) ||
    (claimedSpaces.indexOf(`${space}1`) > -1 && claimedSpaces.indexOf(`${space}4`) > -1 && claimedSpaces.indexOf(`${space}7`) > -1) ||
    (claimedSpaces.indexOf(`${space}2`) > -1 && claimedSpaces.indexOf(`${space}5`) > -1 && claimedSpaces.indexOf(`${space}8`) > -1) ||
    (claimedSpaces.indexOf(`${space}3`) > -1 && claimedSpaces.indexOf(`${space}6`) > -1 && claimedSpaces.indexOf(`${space}9`) > -1)
  ) {
    return true;
  } else {
    return false;
  }
}

function myMove() {
  if (yourMove) {
    outputEl.innerHTML = `${name}'s Move`;
    game.dataset.disabled = 'false';
  } else {
    if (typeof opponentName !== 'undefined') {
      outputEl.innerHTML = `${opponentName}'s Move`;
    } else {
      outputEl.innerHTML = `Opponent's Move`;
    }
    game.dataset.disabled = 'true';
  }
}

function markerMe() {
  if (isHost) {
    return 'x';
  } else {
    return 'o';
  }
}

function markerThem() {
  if (isHost) {
    return 'o';
  } else {
    return 'x';
  }
}

function restart() {
  for (let i=0, ii=gameTile.length; i<ii; i++) {
    gameTile[i].dataset.disabled = 'false';
    gameTile[i].classList.remove('x');
    gameTile[i].classList.remove('o');
  }

  for (let i=0, ii=gameBoard.length; i<ii; i++) {
    gameBoard[i].dataset.disabled = 'false';
    gameBoard[i].dataset.status = 'null';
    gameBoard[i].classList.remove('x');
    gameBoard[i].classList.remove('o');
  }

  for (var i in gameMoves) {
    gameMoves[i].owned = null;

    for (var n in gameMoves[i].tiles) {
      gameMoves[i].tiles[n] = null;
    }
  }

  // disable game for host now
  if (isHost) {
    yourMove = false;
  } else {
    yourMove = true;
  }
  myMove();

  restartButton.classList.add('hide');
  timeEl.classList.add('hide');
}

function msToTime(duration) {
  var seconds = parseInt((duration/1000)%60),
      minutes = parseInt((duration/(1000*60))%60);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;


  return minutes + ":" + seconds;
}

ohCrapButton.addEventListener('click', function(e) {
  e.preventDefault();
  ohCrap();
});

function ohCrap() {
  for (let i=0, ii=gameBoard.length; i<ii; i++) {
    if (gameBoard[i].dataset.status == 'null') {
      gameBoard[i].dataset.disabled = 'false';
    }
  }
}

function ai(marker) {
  let possibleBoards = makeArray(document.querySelectorAll('.board[data-disabled="false"]'));
  let winningBoard = possibleBoards[Math.floor(Math.random() * possibleBoards.length)];
  console.log(winningBoard);

  let possibleTiles = makeArray(winningBoard.querySelectorAll('[data-disabled="false"]'));
  let winningTile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];

  console.log(winningTile);


  let data = {
    "board": winningTile.dataset.board,
    "tile": winningTile.dataset.tile,
    "name": "AI"
  };
  receiveData(data);
}

/**
  * My fancy makeArray helper function
  */
function makeArray(r){return[].slice.call(r,0)}
