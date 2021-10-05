"use strict";

const WIN = require("ui/window"); // 窗口库

const Modules = {
  base_info: ["*"],
  vshell_monitor: ["custom"],
  av_list: ["custom"],
  vshell_service: ["custom"],
  vshell_screenshot: ["custom"],
  vshell_procdump: ["custom"],
  vshell_browserdata: ["custom"],
  vshell_socks5: ["custom"],
  vshell_scan: ["custom"],
  vshell_shellcode: ["custom"],
};
/**
 * 插件类
 */
class Plugin {
  constructor(opt) {
    let self = this;
    self.opt = opt;
    self.core = new antSword["core"][opt["type"]](opt);
    let cores = {};
    for (let _ in Modules) {
      cores[_] = require(`./core/${_}/index`);
    }
    self.cores = cores;
    // 创建一个 window
    let win = new WIN({
      title: `vshell By: veo`,
      height: 650,
      width: 950,
    });
    this.win = win;
    self.main_layout = win.win.attachLayout("1C");
    self.main_cell = self.main_layout.cells("a");
    self.tabbar = self.main_cell.attachTabbar();
    self.tabbar.setAlign("left");
    self.cores_instance = [];
    for (let module in Modules) {
      if (
        Modules[module].includes(self.opt.type) ||
        Modules[module].includes("*")
      ) {
        self.cores_instance[module] = new self.cores[module](self);
        let instance = self.cores_instance[module];
        instance.setName(module);
        instance.createLayout(self.tabbar);
      }
    }
  }
}

module.exports = Plugin;
