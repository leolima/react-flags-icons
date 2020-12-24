const glob = require('glob')
const nodePlop = require('node-plop')
const tools = require('simple-svg-tools')
const plop = nodePlop(`${__dirname}/plopfile.js`)
const buildIcon = plop.getGenerator('buildIcon')
const buildIconIndex = plop.getGenerator('buildIconIndex')
const svgr = require('@svgr/core').default
const { pascalCase } = require('change-case')

function getFileName(filePath) {
  return filePath.substring(
    filePath.lastIndexOf('/') + 1,
    filePath.lastIndexOf('.')
  )
}

function run() {
  glob(`${__dirname}/files/*.svg`, (err, files) => {
    files.forEach((file) => {
      tools
        .ImportSVG(file)
        .then((svg) =>
          svgr(
            svg,
            { icon: true },
            { componentName: pascalCase(getFileName(file)) }
          )
        )
        .then((svg) => {
          buildIcon
            .runActions({
              name: getFileName(file),
              contents: svg
            })
            .then(function (results) {
              console.log(results)
            })
        })
    })

    buildIconIndex
      .runActions({
        icons: files.map(getFileName)
      })
      .then(function (results) {
        console.log(results)
      })
  })
}

run()
