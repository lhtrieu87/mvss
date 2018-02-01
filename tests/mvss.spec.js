const mvss = require('../mvss')
const fs = require('fs-extra')
const should = require('should')

describe('mvss', () => {
  beforeEach(() => {
    fs.removeSync('./tests/destination')
    fs.mkdirSync('./tests/destination')
    fs.removeSync('./tests/source')
    fs.mkdirSync('./tests/source')

    fs.copySync('./tests/source_template', './tests/source')
  })

  it('mirrors recursively', () => {
    mvss('./tests/source', './tests/destination')

    const destFiles = fs.readdirSync('./tests/destination/__snapshots__')
    destFiles.length.should.equal(1)
    destFiles[0].should.equal('1')

    const destAFiles = fs.readdirSync('./tests/destination/a/__snapshots__')
    destAFiles.length.should.equal(1)
    destAFiles[0].should.equal('2')

    const sourceFiles = fs.readdirSync('./tests/source')
    sourceFiles.length.should.equal(1)
    sourceFiles[0].should.equal('a')

    const sourceAFiles = fs.readdirSync('./tests/source/a')
    sourceAFiles.length.should.equal(0)
  })
})