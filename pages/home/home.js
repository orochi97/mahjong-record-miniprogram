
Page({
  data: {
    east: '',
    west: '',
    south: '',
    north: '',
    base: 0
  },
  create() {
    const { east, west, south, north, base } = this.data
    if (east && west && south && north && base) {
      wx.showModal({
        title: '确定创建',
        content: `东风：${east}\n南风：${south}\n西风：${west}\n北风：${north}\n底分：${base}`,
        success (res) {
          if (res.confirm) {
            wx.setStorageSync('newGame', JSON.stringify({ east, west, south, north, base: parseInt(base) }))
            wx.navigateTo({
              url: '../game/game'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '信息均为必填',
        icon: 'error',
        duration: 1000
      })
    }
  },
  reset() {
    this.setData({
      east: '',
      west: '',
      south: '',
      north: '',
      score: 0
    })
  }
})
