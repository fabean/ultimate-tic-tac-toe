/* jshint ignore:start */
'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),

//peer = new Peer({host: '52.25.18.170', port: 9000, path: '/myapp'}),
nameEl = document.getElementById('name-input'),
    setNameButton = document.getElementById('set-name'),
    showHostButton = document.getElementById('show-host'),
    showJoinButton = document.getElementById('show-join'),
    joinHostButton = document.getElementById('join-host'),
    localJoinButton = document.getElementById('local-join'),
    peerId = document.getElementById('friends-peer-id'),
    connectedEl = document.getElementById('connected'),
    gameTile = makeArray(document.getElementsByClassName('tile')),
    gameBoard = makeArray(document.getElementsByClassName('board')),
    game = document.getElementById('game'),
    outputEl = document.getElementById('output'),
    restartButton = document.getElementById('restart'),
    ohCrapButton = document.getElementById('oh-crap'),
    timeEl = document.getElementById('timeTaken'),
    timeStart = undefined,
    timeEnd = undefined,
    yourMove = true,
    isHost = true,
    isLocal = false,
    playerconnection = undefined,
    name = undefined,
    opponentName = undefined,
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
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
      'tile9': null
    }
  }
};

/**
  * Peerjs setup stuff
  */
peer.on('open', function (id) {
  document.getElementById('your-id').innerHTML = '<span>Your id is: <kbd>' + id + '</kbd></span>';
});

peer.on('connection', function (playerconnection, name) {
  timeStart = performance.now();
  console.log('time started');
  game.dataset.disabled = 'false';
  connectBack(playerconnection.peer);
  playerconnection.on('open', function () {
    renderConnectedTo(playerconnection.peer);

    playerconnection.on('data', function (data) {
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
  connectedEl.innerHTML = 'You\'re connected to <span id="friendID">' + peer + '</span>';
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

nameEl.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    setName();
  }
});

showHostButton.addEventListener('click', function () {
  document.getElementById('host').classList.toggle('hide');
});

showJoinButton.addEventListener('click', function () {
  document.getElementById('join').classList.toggle('hide');
});

joinHostButton.addEventListener('click', function () {
  yourMove = false;
  isHost = false;
  playerconnection = peer.connect(peerId.value);
  document.getElementById('join').classList.toggle('hide');
});

peerId.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    yourMove = false;
    isHost = false;
    playerconnection = peer.connect(peerId.value);
    document.getElementById('join').classList.toggle('hide');
  }
});

function setName() {
  var nameInput = document.getElementById('name-input');
  name = nameInput.value;
  nameInput.classList.add('hide');
  setNameButton.classList.add('hide');
  showHostButton.classList.remove('hide');
  showJoinButton.classList.remove('hide');
  localJoinButton.classList.remove('hide');
}

localJoinButton.addEventListener('click', function () {
  showHostButton.classList.add('hide');
  showJoinButton.classList.add('hide');
  localJoinButton.classList.add('hide');
  renderConnectedTo('CPU');
  isLocal = true;
  timeStart = performance.now();
  game.dataset.disabled = 'false';
  myMove();
});

/**
  * Gameplay section
  */
for (var i = 0, ii = gameTile.length; i < ii; i++) {
  gameTile[i].addEventListener('click', function (e) {
    if (e.target.dataset.disabled === 'false' && game.dataset.disabled === 'false' && document.getElementById('board-' + e.target.dataset.board).dataset.disabled === 'false') {
      sendMove(e.target.dataset);
    }
  });
}

restartButton.addEventListener('click', function (e) {
  e.preventDefault();
  var data = {
    'move': 'restart',
    'name': name
  };
  playerconnection.send(data);
  restart();
});

function sendMove(move) {
  yourMove = false;
  renderMove(move, markerMe());
  game.dataset.disabled = 'true';
  var data = {
    'board': move.board,
    'tile': move.tile,
    'name': name
  };
  if (!isLocal) {
    playerconnection.send(data);
  }
}

function receiveData(data) {
  yourMove = true;
  renderMove(data, markerThem());
  if (document.getElementById('friendID').innerHTML !== data.name) {
    renderConnectedTo(data.name);
  }
  game.dataset.disabled = 'false';
}

function renderMove(data, marker) {
  var tileEl = document.querySelectorAll('[data-board="' + data.board + '"][data-tile="' + data.tile + '"]');
  tileEl[0].dataset.disabled = 'true';
  tileEl[0].classList.add(marker);
  gameMoves['board' + data.board].tiles['tile' + data.tile] = marker;
  myMove();
  boardWin(data.board, marker);
  nextMove(data.tile);
}

function nextMove(move) {
  var thisBoard = document.getElementById('board-' + move);
  if (thisBoard.dataset.status != 'null') {
    for (var i = 0, ii = gameBoard.length; i < ii; i++) {
      if (gameBoard[i].id !== 'board-' + move && gameBoard[i].dataset.status == 'null') {
        gameBoard[i].dataset.disabled = 'false';
      } else {
        gameBoard[i].dataset.disabled = 'true';
      }
    }
  } else {
    for (var i = 0, ii = gameBoard.length; i < ii; i++) {
      if (gameBoard[i].id !== 'board-' + move || gameBoard[i].dataset.status != 'null') {
        gameBoard[i].dataset.disabled = 'true';
      } else {
        gameBoard[i].dataset.disabled = 'false';
      }
    }
  }
}

function boardWin(board, marker) {
  var calcMoves = gameMoves['board' + board].tiles;
  var tilesWon = [];
  for (var i in calcMoves) {
    if (calcMoves[i] == marker) {
      tilesWon.push(i);
    }
  }
  if (tilesWon.length >= 3) {
    if (winningCalc(tilesWon, 'tile')) {
      var winningBoard = document.getElementById('board-' + board);
      winningBoard.dataset.disabled = 'true';
      winningBoard.dataset.status = marker;
      winningBoard.classList.add(marker);
      gameMoves['board' + board].owned = marker;
      gameWin(marker);
    }
  }
}

function gameWin(marker) {
  var boardsWon = [];
  for (var i in gameMoves) {
    if (gameMoves[i].owned == marker) {
      boardsWon.push(i);
    }
  }
  if (boardsWon.length >= 3) {
    if (winningCalc(boardsWon, 'board')) {
      restartButton.classList.remove('hide');
      timeEnd = performance.now();
      var timeTakenInMs = timeEnd - timeStart;
      var timeTaken = msToTime(timeTakenInMs);
      timeEl.innerHTML = 'Total game time: ' + timeTaken;
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
  if (claimedSpaces.indexOf(space + '1') > -1 && claimedSpaces.indexOf(space + '2') > -1 && claimedSpaces.indexOf(space + '3') > -1 || claimedSpaces.indexOf(space + '4') > -1 && claimedSpaces.indexOf(space + '5') > -1 && claimedSpaces.indexOf(space + '6') > -1 || claimedSpaces.indexOf(space + '7') > -1 && claimedSpaces.indexOf(space + '8') > -1 && claimedSpaces.indexOf(space + '9') > -1 || claimedSpaces.indexOf(space + '1') > -1 && claimedSpaces.indexOf(space + '5') > -1 && claimedSpaces.indexOf(space + '9') > -1 || claimedSpaces.indexOf(space + '3') > -1 && claimedSpaces.indexOf(space + '5') > -1 && claimedSpaces.indexOf(space + '7') > -1 || claimedSpaces.indexOf(space + '1') > -1 && claimedSpaces.indexOf(space + '4') > -1 && claimedSpaces.indexOf(space + '7') > -1 || claimedSpaces.indexOf(space + '2') > -1 && claimedSpaces.indexOf(space + '5') > -1 && claimedSpaces.indexOf(space + '8') > -1 || claimedSpaces.indexOf(space + '3') > -1 && claimedSpaces.indexOf(space + '6') > -1 && claimedSpaces.indexOf(space + '9') > -1) {
    return true;
  } else {
    return false;
  }
}

function myMove() {
  if (yourMove) {
    outputEl.innerHTML = name + '\'s Move';
    game.dataset.disabled = 'false';
  } else {
    if (typeof opponentName !== 'undefined') {
      outputEl.innerHTML = opponentName + '\'s Move';
    } else {
      outputEl.innerHTML = 'Opponent\'s Move';
    }
    if (isLocal) {
      setTimeout(function () {
        ai(markerThem());
      }, 1000);
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
  for (var _i = 0, ii = gameTile.length; _i < ii; _i++) {
    gameTile[_i].dataset.disabled = 'false';
    gameTile[_i].classList.remove('x');
    gameTile[_i].classList.remove('o');
  }

  for (var _i2 = 0, ii = gameBoard.length; _i2 < ii; _i2++) {
    gameBoard[_i2].dataset.disabled = 'false';
    gameBoard[_i2].dataset.status = 'null';
    gameBoard[_i2].classList.remove('x');
    gameBoard[_i2].classList.remove('o');
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
  var seconds = parseInt(duration / 1000 % 60),
      minutes = parseInt(duration / (1000 * 60) % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;
}

ohCrapButton.addEventListener('click', function (e) {
  e.preventDefault();
  ohCrap();
});

function ohCrap() {
  for (var i = 0, ii = gameBoard.length; i < ii; i++) {
    if (gameBoard[i].dataset.status == 'null') {
      gameBoard[i].dataset.disabled = 'false';
    }
  }
}

function ai(marker) {
  var possibleBoards = makeArray(document.querySelectorAll('.board[data-disabled="false"]'));
  var winningBoard = possibleBoards[Math.floor(Math.random() * possibleBoards.length)];
  console.log(winningBoard);

  var possibleTiles = makeArray(winningBoard.querySelectorAll('[data-disabled="false"]'));
  var winningTile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];

  console.log(winningTile);

  var data = {
    'board': winningTile.dataset.board,
    'tile': winningTile.dataset.tile,
    'name': 'AI'
  };
  receiveData(data);
}

/**
  * My fancy makeArray helper function
  */
function makeArray(r) {
  return [].slice.call(r, 0);
}
//# sourceMappingURL=scripts.js.map
