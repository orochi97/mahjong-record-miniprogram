import * as echarts from '../../ec-canvas/echarts'

function initChart(canvas, width, height, dpr) {
  let data = wx.getStorageSync('gameData')
  if(!data) {
    return
  }
  const { players, count } = JSON.parse(data)
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart)

  var option = {
    title: {
      text: '分数走势图',
      left: 'center'
    },
    color: ["#00FFFF", "red", "gold", 'black'],
    legend: {
      data: [players[0].name, players[1].name, players[2].name, players[3].name],
      top: 25,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: new Array(count).fill(0).map((_, idx) => { return idx + 1 })
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: players[0].name,
      type: 'line',
      data: players[0].score
    }, {
      name: players[1].name,
      type: 'line',
      data: players[1].score
    }, {
      name: players[2].name,
      type: 'line',
      data: players[2].score
    }, {
      name: players[3].name,
      type: 'line',
      data: players[3].score
    }]
  }
  chart.setOption(option)
  return chart
}

Page({
  data: {
    type: 'line',
    game: {
      players: [],
      winner: []
    },
    ec: {
      onInit: initChart
    }
  },
  onLoad() {
    let data = wx.getStorageSync('gameData')
    if (data) {
      data = JSON.parse(data)
      this.setData({
        game: data
      })
    }
  },
  change(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  }
})
