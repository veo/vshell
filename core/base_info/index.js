"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class BaseInfo extends Base {
  createForm(cell) {
    let str = LANG["core"]["base_info"]["msg"];
    this.safeHTML(this.cellA, str);
  }
  exploit() {
    let self=this;
    self.core = this.top.core;
    let data = {};
    data["_"] = "A";
    self.core
      .request(data)
      .then((_ret) => {
        let res = antSword.unxss(_ret["text"], false);
        if (res.indexOf("ERROR://") > -1) {
          throw res;
        }
        if (res === "") {
          res = "output is empty.";
        }
        this.editor.session.setValue(res);
        this.editor.setReadOnly(true);
        toastr.success(LANG["success"], LANG_T["success"]);
      })
      .catch((e) => {
        console.log(e);
        toastr.error(e.constructor === Object?JSON.stringify(e):e, "Error");
      });
  }

}
module.exports = BaseInfo;
