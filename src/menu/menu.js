const {Menu} = require('electron')
var template = [
  {
    label:'文件',
    submenu:[
      {label: 'hi'},
      {label: 'world'}
    ]
  }
]

var m = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(m)
