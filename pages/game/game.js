const Game = require('./_game')

Page({
  data: {
    bg: '',
    role_zh: {
      east: '东风',
      south: '南风',
      west: '西风',
      north: '北风'
    },
    winner: null,
    game: {
      winner: [],
    },
    players: []
  },
  bindKeyInput(e) {
    const idx = e.currentTarget.dataset.index
    const player = this.data.players[idx]
    this.setData({
      [`players[${idx}].value`]: e.detail.value
    })
  },
  minus(e) {
    const idx = e.currentTarget.dataset.index
    const player = this.data.players[idx]
    if (player.value > 0) {
      this.setData({
        [`players[${idx}].value`]: player.value * -1
      })
    }
  },
  add(e) {
    const idx = e.currentTarget.dataset.index
    const player = this.data.players[idx]
    if (player.value < 0) {
      this.setData({
        [`players[${idx}].value`]: player.value * -1
      })
    }
  },
  onLoad() {
    wx.showToast({
      title: '新的一局又开始',
      icon: 'success',
      duration: 1000
    })
    let data = wx.getStorageSync('newGame')
    if (data) {
      const game = new Game(null, JSON.parse(data))
      this.setData({
        game,
        players: game.players
      })
      return
    }
    data = wx.getStorageSync('gameData')
    if (data) {      
      const game = new Game(JSON.parse(data))
      this.setData({
        game,
        players: game.players
      })
      return
    }
    wx.redirectTo({
      url: '../home/home'
    })
  },
  home() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  detail() {
    wx.navigateTo({
      url: '../show/show'
    })
  },
  end() {
    const winner = this.getWinnerIndex()
    const winPlayer = this.data.players[winner]
    let str = `胜者：${winPlayer.name}`
    let total = 0
    this.data.players.forEach((item) => {
      const val = parseInt(item.value)
      total += val
      str += `\n${item.name}：${val}`
    })
    if (total !== 0) {
      wx.showToast({
        title: '分数和不为0',
        icon: 'error',
        duration: 1000
      })
      return
    }
    wx.showModal({
      title: '打完了吗',
      content: str,
      success: (res) => {
        if (res.confirm) {
          this.processData(winner, winPlayer)
        }
      }
    })
  },
  reset() {
    this.setData({
      [`players[0].value`]: 0,
      [`players[1].value`]: 0,
      [`players[2].value`]: 0,
      [`players[3].value`]: 0
    })
  },
  choose(e) {
    const idx = e.currentTarget.dataset.index
    const player = this.data.players[idx]
    const { role, name } = player
    this.setData({
      winner: idx
    })
    wx.showToast({
      title: `胜者: ${name}`,
      icon: 'success',
      duration: 1000
    })
  },
  getWinnerIndex() {
    let winner = this.data.winner
    if (winner !== null) {
      return winner
    }
    const values = this.data.players.map(item => parseInt(item.value))
    const max = Math.max.apply(null, values)
    winner = values.findIndex(item => item === max)
    return winner
  },
  processData(winner, winPlayer) {
    const { players, game } = this.data
    console.log(players, game)
    const values = players.map(item => parseInt(item.value))
    game.winner.push(winPlayer.name)
    players[0].score.push(values[0])
    players[1].score.push(values[1])
    players[2].score.push(values[2])
    players[3].score.push(values[3])
    this.setData({
      ['game.winner']: game.winner,
      ['game.count']: game.count + 1,
      [`players[${winner}].win`]: winPlayer.win + 1,
      [`players[0].score`]: players[0].score,
      [`players[1].score`]: players[1].score,
      [`players[2].score`]: players[2].score,
      [`players[3].score`]: players[3].score,
      [`players[0].value`]: 0,
      [`players[1].value`]: 0,
      [`players[2].value`]: 0,
      [`players[3].value`]: 0,
      winner: null
    })
    this.saveData()
  },
  saveData() {
    wx.setStorageSync('gameData', JSON.stringify(this.data.game))
  }
})
