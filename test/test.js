/* global describe */
/* global context */
/* global it */
const biliAPI = require('..')

const got = require('got')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert

// test data
// mid: 349991143
// aid: 31779330
// uname: '神楽めあOfficial'
// roomid: 12235923

describe('Bilibili biliAPI', function() {
  this.retries(2)
  this.timeout(5000)
  context('bilibili', function() {
    it('mid -> uname', async function() {
      let { uname } = await biliAPI({ mid: 349991143 }, ['uname'])
      assert.isString(uname)
    })
    it('mid -> follower', async function() {
      let { follower } = await biliAPI({ mid: 349991143 }, ['follower'])
      assert.isNumber(follower)
      assert.isNotNaN(follower)
    })
    it('aid -> list', async function() {
      let object = await biliAPI({ aid: 31779330 }, ['list'])
      assert.isArray(object.list.i.d)
    })
    it('mid -> roomid', async function() {
      let { roomid } = await biliAPI({ mid: 349991143 }, ['roomid'])
      assert.strictEqual(roomid, 12235923)
    })
    it('mid -> guardNum', async function() {
      let { guardNum } = await biliAPI({ mid: 349991143 }, ['guardNum'])
      assert.isNumber(guardNum)
      assert.isNotNaN(guardNum)
    })
    it('uname -> mid', async function() {
      let { mid } = await biliAPI({ uname: '神楽めあOfficial' }, ['mid'])
      assert.strictEqual(mid, 349991143)
    })
    it('aid -> mid', async function() {
      let { mid } = await biliAPI({ aid: 31779330 }, ['mid'])
      assert.strictEqual(mid, 8829972)
    })
    it('mid -> sign', async function() {
      let { sign } = await biliAPI({ mid: 349991143 }, ['sign'])
      assert.isString(sign)
    })
    it('roomid -> mid', async function() {
      let { mid } = await biliAPI({ roomid: 12235923 }, ['mid'])
      assert.strictEqual(mid, 349991143)
    })
    it('roomid -> roomStatus', async function() {
      let { roomStatus } = await biliAPI({ roomid: 12235923 }, ['roomStatus'])
      assert.strictEqual(roomStatus, 1)
      assert.isNumber(roomStatus)
      assert.isNotNaN(roomStatus)
    })
    it('roomid -> roundStatus', async function() {
      let { roundStatus } = await biliAPI({ roomid: 12235923 }, ['roundStatus'])
      assert.isNumber(roundStatus)
      assert.isNotNaN(roundStatus)
    })
    it('roomid -> liveStatus', async function() {
      let { liveStatus } = await biliAPI({ roomid: 12235923 }, ['liveStatus'])
      assert.isNumber(liveStatus)
      assert.isNotNaN(liveStatus)
    })
    it('mid -> coins', async function() {
      let { coins } = await biliAPI({ mid: 349991143 }, ['coins'])
      assert.isNumber(coins)
      assert.isNotNaN(coins)
    })
    it('mid -> video', async function() {
      let { video } = await biliAPI({ mid: 349991143 }, ['video'])
      assert.isNumber(video)
      assert.isNotNaN(video)
    })
    context('Exceptions', function() {
      context('No live room', function() {
        it('mid -> roomStatus -> 0', async function() {
          let { roomStatus } = await biliAPI({ mid: 233 }, ['roomStatus'])
          assert.strictEqual(roomStatus, 0)
        })
        it('mid -> roundStatus -> 0', async function() {
          let { roundStatus } = await biliAPI({ mid: 233 }, ['roundStatus'])
          assert.strictEqual(roundStatus, 0)
        })
        it('mid -> liveStatus -> 0', async function() {
          let { liveStatus } = await biliAPI({ mid: 233 }, ['liveStatus'])
          assert.strictEqual(liveStatus, 0)
        })
        it('mid -> online -> 0', async function() {
          let { online } = await biliAPI({ mid: 233 }, ['online'])
          assert.strictEqual(online, 0)
        })
      })
    })
    it('roomid -> title', async function() {
      let { title } = await biliAPI({ roomid: 12235923 }, ['title'])
      assert.isString(title)
    })
    it('roomid -> online', async function() {
      let { online } = await biliAPI({ roomid: 12235923 }, ['online'])
      assert.isNumber(online)
      assert.isNotNaN(online)
    })
    it('roomid -> online > 0', async function() {
      let roomid = JSON.parse((await got('https://api.live.bilibili.com/room/v1/Area/getListByAreaID?areaId=0&sort=online&pageSize=1')).body).data[0].roomid
      let { online } = await biliAPI({ roomid }, ['online'])
      assert.isNumber(online)
      assert.isNotNaN(online)
      assert.isAbove(online, 0)
    })
    it('mid -> notice', async function() {
      let { notice } = await biliAPI({ mid: 349991143 }, ['notice'])
      assert.isString(notice)
    })
    it('mid -> archiveView', async function() {
      let { archiveView } = await biliAPI({ mid: 349991143 }, ['archiveView'])
      assert.isNumber(archiveView)
      assert.isNotNaN(archiveView)
    })
    it('mid -> articleView', async function() {
      let { articleView } = await biliAPI({ mid: 349991143 }, ['articleView'])
      assert.isNumber(articleView)
      assert.isNotNaN(articleView)
    })
    it('mid -> face', async function() {
      let { face } = await biliAPI({ mid: 349991143 }, ['face'])
      assert.isString(face)
    })
    it('mid -> anchorScore', async function() {
      let { anchorScore } = await biliAPI({ mid: 349991143 }, ['anchorScore'])
      assert.isNumber(anchorScore)
      assert.isNotNaN(anchorScore)
    })
    it('mid -> areaRank', async function() {
      let { areaRank } = await biliAPI({ mid: 349991143 }, ['areaRank'])
      assert.isNumber(areaRank)
      assert.isNotNaN(areaRank)
    })
    it('mid -> areaRank', async function() {
      let { areaRank } = await biliAPI({ mid: 3499295 }, ['areaRank'])
      // ">1000" -> 1000
      assert.isNumber(areaRank)
      assert.isNotNaN(areaRank)
      assert.strictEqual(areaRank, 1000)
    })
  })
  context('Route', function() {
    it('Should reject when no require input', function() {
      return assert.isRejected(biliAPI({}, ['uname']))
    })
    it('API namespace', function() {
      const input = Object.keys(require('../src/api/input'))
      const data = Object.keys(require('../src/api/data'))
      const api = Object.keys(require('../src/api/api.bilibili.com'))
      const live = Object.keys(require('../src/api/api.live.bilibili.com'))
      let array = [...input, ...data, ...api, ...live]
      let check = {}
      for (let i = 0; i < array.length; i++) {
        if (check[array[i]]) throw new Error(`Repeat ${array[i]}`)
        check[array[i]] = true
      }
    })
    // TODO: Correct order of "oneOf" value
  })
  context('Options', function() {
    it('Default parser', async function() {
      let { stat } = await biliAPI({ mid: 349991143 }, ['stat'])
      assert.isObject({ stat })
    })
    it('Optinal parser', async function() {
      let { stat } = await biliAPI({ mid: 349991143 }, ['stat'], { parser: url => url })
      assert.isString(stat)
    })
    it('Optinal wait', async function() {
      this.timeout(20000)
      let wait = 10000
      let start = (new Date()).getTime()
      let { stat } = await biliAPI({ mid: 349991143 }, ['stat'], { wait })
      let end = (new Date()).getTime()
      assert.isAbove(end - start, wait)
      assert.isObject(stat)
    })
  })
})
