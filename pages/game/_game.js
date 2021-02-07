const Player = require('./player')

class Game {
  constructor (gameData, newGame) {
    if (gameData) {
      const { players, base, winner, count, startTime } = gameData
      const easter = new Player(players[0])
      const souther = new Player(players[1])
      const wester = new Player(players[2])
      const norther = new Player(players[3])
      this.players = [easter, souther, wester, norther]
      this.base = parseInt(base)
      this.winner = winner
      this.count = 0
      this.startTime = startTime
      return
    }
    const { east, west, south, north, base } = newGame
    const easter = new Player({ role: 'east', name: east, base })
    const souther = new Player({ role: 'south', name: south, base })
    const wester = new Player({ role: 'west', name: west, base })
    const norther = new Player({ role: 'north', name: north, base })
    this.players = [easter, souther, wester, norther]
    this.base = parseInt(base)
    this.winner = []
    this.count = 0
    this.startTime = Date.now()
  }
}

module.exports = Game
