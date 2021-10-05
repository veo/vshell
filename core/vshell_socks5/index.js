"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
class Socks5 extends Base {
  createForm(cell) {
    let str = `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><style type="text/css">p{font-family:Microsoft YaHei;}</style>`+LANG["core"]["vshell_socks5"]["support"]+LANG["core"]["vshell_socks5"]["msga"]+LANG["core"]["vshell_socks5"]["msgb"]+`${this.opt["pwd"]}</b></p><p><b>socks5://${this.opt["pwd"]}:${this.opt["pwd"]}@${this.opt["url"].replace("http://","")}</b></p>`;
    this.safeHTML(this.cellA, str);
  }
}
module.exports = Socks5;
