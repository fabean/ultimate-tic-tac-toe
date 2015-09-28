/* jshint ignore:start */
'use strict';

var //peer = new Peer({key: 'n0ei2j1souk57b9'}),
peer = new Peer({ host: '52.25.18.170', port: 9000, path: '/myapp' }),
    usersOnlineURL = 'http://api.joshfabean.com',
    usersOnlineEl = document.getElementById('usersonline'),
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
    randomGameButton = document.getElementById('random-player'),
    timeEl = document.getElementById('timeTaken'),
    timeStart = undefined,
    timeEnd = undefined,
    yourMove = true,
    isHost = true,
    isLocal = false,
    yourID = undefined,
    playerconnection = undefined,
    otherPlayers = [],
    name = undefined,
    opponentName = undefined,
    gameMoves = {
  'board1': {
    'owned': null,
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
    'disabled': false,
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
},
    gameMovesNew = [{ 'id': 'b1', 'value': null }, { 'id': 'b2', 'value': null }, { 'id': 'b3', 'value': null }, { 'id': 'b4', 'value': null }, { 'id': 'b5', 'value': null }, { 'id': 'b6', 'value': null }, { 'id': 'b7', 'value': null }, { 'id': 'b8', 'value': null }, { 'id': 'b9', 'value': null }, { 'id': '11', 'value': null }, { 'id': '12', 'value': null }, { 'id': '13', 'value': null }, { 'id': '14', 'value': null }, { 'id': '15', 'value': null }, { 'id': '16', 'value': null }, { 'id': '17', 'value': null }, { 'id': '18', 'value': null }, { 'id': '19', 'value': null }, { 'id': '21', 'value': null }, { 'id': '22', 'value': null }, { 'id': '23', 'value': null }, { 'id': '24', 'value': null }, { 'id': '25', 'value': null }, { 'id': '26', 'value': null }, { 'id': '27', 'value': null }, { 'id': '28', 'value': null }, { 'id': '29', 'value': null }, { 'id': '31', 'value': null }, { 'id': '32', 'value': null }, { 'id': '33', 'value': null }, { 'id': '34', 'value': null }, { 'id': '35', 'value': null }, { 'id': '36', 'value': null }, { 'id': '37', 'value': null }, { 'id': '38', 'value': null }, { 'id': '39', 'value': null }, { 'id': '41', 'value': null }, { 'id': '42', 'value': null }, { 'id': '43', 'value': null }, { 'id': '44', 'value': null }, { 'id': '45', 'value': null }, { 'id': '46', 'value': null }, { 'id': '47', 'value': null }, { 'id': '48', 'value': null }, { 'id': '49', 'value': null }, { 'id': '51', 'value': null }, { 'id': '52', 'value': null }, { 'id': '53', 'value': null }, { 'id': '54', 'value': null }, { 'id': '55', 'value': null }, { 'id': '56', 'value': null }, { 'id': '57', 'value': null }, { 'id': '58', 'value': null }, { 'id': '59', 'value': null }, { 'id': '61', 'value': null }, { 'id': '62', 'value': null }, { 'id': '63', 'value': null }, { 'id': '64', 'value': null }, { 'id': '65', 'value': null }, { 'id': '66', 'value': null }, { 'id': '67', 'value': null }, { 'id': '68', 'value': null }, { 'id': '69', 'value': null }, { 'id': '71', 'value': null }, { 'id': '72', 'value': null }, { 'id': '73', 'value': null }, { 'id': '74', 'value': null }, { 'id': '75', 'value': null }, { 'id': '76', 'value': null }, { 'id': '77', 'value': null }, { 'id': '78', 'value': null }, { 'id': '79', 'value': null }, { 'id': '71', 'value': null }, { 'id': '72', 'value': null }, { 'id': '73', 'value': null }, { 'id': '74', 'value': null }, { 'id': '75', 'value': null }, { 'id': '76', 'value': null }, { 'id': '77', 'value': null }, { 'id': '78', 'value': null }, { 'id': '79', 'value': null }, { 'id': '81', 'value': null }, { 'id': '82', 'value': null }, { 'id': '83', 'value': null }, { 'id': '84', 'value': null }, { 'id': '85', 'value': null }, { 'id': '86', 'value': null }, { 'id': '87', 'value': null }, { 'id': '88', 'value': null }, { 'id': '89', 'value': null }, { 'id': '91', 'value': null }, { 'id': '92', 'value': null }, { 'id': '93', 'value': null }, { 'id': '94', 'value': null }, { 'id': '95', 'value': null }, { 'id': '96', 'value': null }, { 'id': '97', 'value': null }, { 'id': '98', 'value': null }, { 'id': '99', 'value': null }];

/**
  * Peerjs setup stuff
  */
peer.on('open', function (id) {
  yourID = id;
  document.getElementById('your-id').innerHTML = '<span>Your id is: <kbd>' + id + '</kbd></span>';
  getOnlineUsers();
});

peer.on('connection', function (playerconnection, name) {
  timeStart = performance.now();
  console.log('time started');
  game.dataset.disabled = 'false';
  connectBack(playerconnection.peer);
  playerconnection.on('open', function () {
    renderConnectedTo(playerconnection.peer);
    notReadyToPlay();
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
  * Other users online
  */
function getOnlineUsers() {
  fetch(usersOnlineURL, {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (j) {
    usersOnlineEl.innerHTML = 'Users online: ' + j.connected.length;
    usersOnlineEl.classList.remove('hide');
    otherPlayers = j.ready;
    // if (j.length > 0) {
    //   console.log('finding random match');
    //   randomMatch(j);
    //   // Math.floor(Math.random() * j.length)
    // }
    console.log(j);
  });
  setTimeout(function () {
    getOnlineUsers();
  }, 10000);
}

function randomMatch() {
  getOnlineUsers();
  console.log('randomMatch');
  console.log(otherPlayers);
  if (otherPlayers && otherPlayers.length > 1) {
    var otherPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
    if (otherPlayer.id !== yourID) {
      // peer.connect(otherPlayer);
      console.log('otherPlayer', otherPlayer);
      playerconnection = peer.connect(otherPlayer.id);
    } else {
      console.log('in else');
      otherPlayers.pop(otherPlayer);
      if (otherPlayers.length > 0) {
        randomMatch();
      } else {
        alert('no one to join');
      }
    }
  } else {
    console.log('empty');
    setTimeout(function () {
      randomMatch();
    }, 1000);
  }
  // let otherPlayer =  otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
  // if (otherPlayers[Math.floor(Math.random() * otherPlayers.length)].id !== yourID) {
  //   // peer.connect(otherPlayer);
  //   console.log('otherPlayer',otherPlayer);
  //   playerconnection = peer.connect(otherPlayer.id);
  // } else {
  //   console.log('in else');
  //   otherPlayers.pop(otherPlayer);
  //   if (otherPlayers.length > 0) {
  //     randomMatch();
  //   } else {
  //     alert('no one to join');
  //   }
  // }
}

function readyToPlay() {
  fetch('http://api.joshfabean.com/add-device', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      id: yourID
    })
  }).then(function (response) {
    return response.json();
  }).then(function (j) {
    console.log(j);
  });
}

function notReadyToPlay() {
  fetch('http://api.joshfabean.com/remove-device', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      id: yourID
    })
  }).then(function (response) {
    return response.json();
  }).then(function (j) {
    console.log(j);
  });
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
  document.getElementById('join').classList.toggle('hide');
});

showJoinButton.addEventListener('click', function () {
  document.getElementById('join').classList.toggle('hide');
  document.getElementById('host').classList.toggle('hide');
});

joinHostButton.addEventListener('click', function () {
  yourMove = false;
  isHost = false;
  playerconnection = peer.connect(peerId.value);
  document.getElementById('join').classList.toggle('hide');
});

randomGameButton.addEventListener('click', function () {
  showHostButton.classList.add('hide');
  showJoinButton.classList.add('hide');
  localJoinButton.classList.add('hide');
  randomGameButton.classList.add('hide');
  document.getElementById('random-player-status').classList.remove('hide');
  readyToPlay();
  getOnlineUsers();
  randomMatch();
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
  randomGameButton.classList.remove('hide');
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
  tileEl[0].dataset.owner = marker;
  gameMoves['board' + data.board].tiles['tile' + data.tile] = marker;
  var foundIt = false;
  var id = data.board + data.tile;
  for (var i = 0, ii = gameMovesNew.length; i < ii && foundIt === false; i++) {
    if (gameMovesNew[i].id === id) {
      gameMovesNew[i].value = marker;
    }
  }
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
        gameMoves['board' + (i + 1)].disabled = false;
      } else {
        gameBoard[i].dataset.disabled = 'true';
        gameMoves['board' + (i + 1)].disabled = true;
      }
    }
  } else {
    for (var i = 0, ii = gameBoard.length; i < ii; i++) {
      if (gameBoard[i].id !== 'board-' + move || gameBoard[i].dataset.status != 'null') {
        gameBoard[i].dataset.disabled = 'true';
        gameMoves['board' + (i + 1)].disabled = true;
      } else {
        gameBoard[i].dataset.disabled = 'false';
        gameMoves['board' + (i + 1)].disabled = false;
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
      winningBoard.dataset.owner = marker;
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
      }, 500);
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
    gameTile[_i].dataset.owner = 'null';
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
  var playableBoards = [];
  for (var i in gameMoves) {
    if (gameMoves[i].disabled === false) {
      console.log(gameMoves[i]);
    }
  }
  var possibleBoards = makeArray(document.querySelectorAll('.board[data-disabled="false"]'));
  var winningBoard = possibleBoards[Math.floor(Math.random() * possibleBoards.length)];
  // console.log(winningBoard);

  var possibleTiles = makeArray(winningBoard.querySelectorAll('[data-disabled="false"]'));
  var winningTile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];

  // console.log(winningTile);

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
