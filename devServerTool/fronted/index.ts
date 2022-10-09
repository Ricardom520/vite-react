class DevServerTool {
  constructor() {
    this.init()
  }

  /** 初始化插件 */
  private init() {
    const dom = document.createElement('div')
    dom.id = 'ricar_tool'

    const temp = function () {
      return `<div class='popver_box'></div>`
    }

    document.body.appendChild(dom)
  }
}

new DevServerTool()
