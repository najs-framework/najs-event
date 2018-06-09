import 'jest'
import '../../lib/index'
import * as Emittery from 'emittery'

describe('Test', function() {
  it('should work', async function() {
    const ee = new Emittery()

    ee.on('test', function() {
      console.log('1')
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve('one')
          console.log('one')
        }, Math.floor(Math.random() * 5000))
      })
    })
    ee.on('test', function() {
      console.log('2')
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve('two')
          console.log('two')
        }, Math.floor(Math.random() * 5000))
      })
    })
    ee.on('test', function() {
      console.log('3')
      console.log('three')
    })

    await ee.emit('test')
    console.log('done')
  })
})
