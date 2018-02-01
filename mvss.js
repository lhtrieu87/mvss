const fs = require('fs-extra')

module.exports = cpss

function cpss(source, destination) {
  const sourceFiles = fs.readdirSync(source)
  for (let i = 0; i < sourceFiles.length; i++) {
    const fileName = sourceFiles[i]
    if (fileName === '__snapshots__') {
      fs.moveSync(source + '/__snapshots__', destination + '/__snapshots__', { overwrite: true })
    } else {
      const fsStat = fs.statSync(source + '/' + fileName)
      if (fsStat.isDirectory()) {
        cpss(source + '/' + fileName, destination + '/' + fileName)
      }
    }
  }
}
