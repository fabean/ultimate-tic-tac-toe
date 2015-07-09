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
    yourMove = true,
    isHost = true,
    playerconnection,
    name,
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
  game.dataset.disabled = 'false';
  connectBack(playerconnection.peer);
  playerconnection.on('open', function(){
    renderConnectedTo(playerconnection.peer);

    playerconnection.on('data', function(data){
      if (data.board === 'restart' && data.tile === 'restart' && data.name !== name) {
        restart();
      } else {
        renderMove(data, 'them');
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
  let me = markerMe();
  let tileEl = document.querySelectorAll(`[data-board="${move.board}"][data-tile="${move.tile}"]`);
  tileEl[0].classList.add(me);
  tileEl[0].dataset.disabled = 'true';
  game.dataset.disabled = 'true';
  let data = {
    "board": move.board,
    "tile": move.tile,
    "name": name
  };
  playerconnection.send(data);
  gameMoves[`board${data.board}`].tiles[`tile${data.tile}`] = me;

  myMove();
  nextMove(move.tile);
  boardWin(data.board, me);
}

function renderMove(data) {
  yourMove = true;
  let them = markerThem();
  if (document.getElementById('friendID').innerHTML !== data.name) {
    renderConnectedTo(data.name);
  }
  let tileEl = document.querySelectorAll(`[data-board="${data.board}"][data-tile="${data.tile}"]`);
  tileEl[0].dataset.disabled = 'true';
  tileEl[0].classList.add(them);

  game.dataset.disabled = 'false';
  gameMoves[`board${data.board}`].tiles[`tile${data.tile}`] = them;

  myMove();
  nextMove(data.tile);
  boardWin(data.board, them);
}

function nextMove(move) {
  let thisBoard = document.getElementById(`board-${move}`);
  console.log(thisBoard.dataset.status);
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
    if (
      (tilesWon.indexOf('tile1') > -1 && tilesWon.indexOf('tile2') > -1 && tilesWon.indexOf('tile3') > -1) ||
      (tilesWon.indexOf('tile4') > -1 && tilesWon.indexOf('tile5') > -1 && tilesWon.indexOf('tile6') > -1) ||
      (tilesWon.indexOf('tile7') > -1 && tilesWon.indexOf('tile8') > -1 && tilesWon.indexOf('tile9') > -1) ||
      (tilesWon.indexOf('tile1') > -1 && tilesWon.indexOf('tile5') > -1 && tilesWon.indexOf('tile9') > -1) ||
      (tilesWon.indexOf('tile3') > -1 && tilesWon.indexOf('tile5') > -1 && tilesWon.indexOf('tile7') > -1) ||
      (tilesWon.indexOf('tile1') > -1 && tilesWon.indexOf('tile4') > -1 && tilesWon.indexOf('tile7') > -1) ||
      (tilesWon.indexOf('tile2') > -1 && tilesWon.indexOf('tile5') > -1 && tilesWon.indexOf('tile8') > -1) ||
      (tilesWon.indexOf('tile3') > -1 && tilesWon.indexOf('tile6') > -1 && tilesWon.indexOf('tile9') > -1)
    ) {
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
    if (
      (boardsWon.indexOf('board1') > -1 && boardsWon.indexOf('board2') > -1 && boardsWon.indexOf('board3') > -1) ||
      (boardsWon.indexOf('board4') > -1 && boardsWon.indexOf('board5') > -1 && boardsWon.indexOf('board6') > -1) ||
      (boardsWon.indexOf('board7') > -1 && boardsWon.indexOf('board8') > -1 && boardsWon.indexOf('board9') > -1) ||
      (boardsWon.indexOf('board1') > -1 && boardsWon.indexOf('board5') > -1 && boardsWon.indexOf('board9') > -1) ||
      (boardsWon.indexOf('board3') > -1 && boardsWon.indexOf('board5') > -1 && boardsWon.indexOf('board7') > -1) ||
      (boardsWon.indexOf('board1') > -1 && boardsWon.indexOf('board4') > -1 && boardsWon.indexOf('board7') > -1) ||
      (boardsWon.indexOf('board2') > -1 && boardsWon.indexOf('board5') > -1 && boardsWon.indexOf('board8') > -1) ||
      (boardsWon.indexOf('board3') > -1 && boardsWon.indexOf('board6') > -1 && boardsWon.indexOf('board9') > -1)
    ) {
      restartButton.classList.remove('hide');
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

function myMove() {
  if (yourMove) {
    outputEl.innerHTML = 'Your Move';
    game.dataset.disabled = 'false';
  } else {
    outputEl.innerHTML = 'Opponent Move';
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

/**
  * My fancy makeArray helper function
  */
function makeArray(r){return[].slice.call(r,0)}
