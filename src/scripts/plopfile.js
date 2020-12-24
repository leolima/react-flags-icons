module.exports = function (plop) {
  plop.setGenerator('buildIcon', {
    description: 'New Flag component from a svg file',
    actions: [
      {
        type: 'add',
        path: '../flags/{{ properCase name }}/index.js',
        templateFile: './templates/Icon.hbs',
        force: true
      }
    ]
  })
  plop.setGenerator('buildIconIndex', {
    description: 'Create the export file for Flags',
    actions: [
      {
        type: 'add',
        path: '../flags/index.js',
        templateFile: './templates/index.hbs',
        force: true
      }
    ]
  })
}
