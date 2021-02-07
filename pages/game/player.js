class Player {
  constructor ({ role, name, score = [], base, win = 0 }) {
    this.name = name
    this.role = role
    this.win = win
    this.score = score
    this.base = base
    this.value = 0
  }
}

module.exports = Player
