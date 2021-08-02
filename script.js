const jogo = {
  board: ['', '', '', '', '', '', '', '', ''],
  simbols: {
    options: ['X', 'O'],
    turn_index: 0,
    change() {
      this.turn_index = this.turn_index === 0 ? 1 : 0
    }
  },
  container_element: null,
  gameOver: false,
  winningSequence: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],

  make_play(position) {
    if (this.gameOver) {
      return false
    }
    if (this.board[position] === '') {
      this.board[position] = this.simbols.options[this.simbols.turn_index]
      this.draw()
      let winning = this.checkSequence(
        this.simbols.options[this.simbols.turn_index]
      )
      if (winning >= 0) {
        this.gameIsOver()
      } else {
        this.simbols.change()
      }
      return true
    } else {
      return false
    }
  },

  gameIsOver() {
    this.gameOver = true
    console.log('ESPETINHO DE LULA')
  },

  checkSequence(simbol) {
    for (i in this.winningSequence) {
      if (
        this.board[this.winningSequence[i][0]] == simbol &&
        this.board[this.winningSequence[i][1]] == simbol &&
        this.board[this.winningSequence[i][2]] == simbol
      ) {
        return i
      }
    }
    return -1
  },

  init(container) {
    this.container_element = container
  },

  draw() {
    let content = ''

    for (i in this.board) {
      content +=
        '<div onclick = "jogo.make_play(' + i + ')">' + this.board[i] + '</div>'
    }

    this.container_element.innerHTML = content
  },

  start() {
    this.board.fill('')
    this.draw()
    this.gameOver = false
  }
}
