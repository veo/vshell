"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class ScreenShot extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["vshell_screenshot"]["support"],
      },
      {
        type: "input",
        name: "width",
        label: LANG["core"]["vshell_screenshot"]["form"]["width"],
        value: "300",
        labelWidth: 100,
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "label",
        label: LANG["core"]["vshell_screenshot"]["msg"],
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
        case "screenshot":
          try {
            self.screenshot();
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
      '<toolbar><item type="button" id="screenshot" text="'+LANG["core"]["vshell_screenshot"]["toolbar"]["screenshot"]+'" img="" /></toolbar>',
      function () {}
    );
  }

  screenshot() {
    let self = this;
    self.core = this.top.core;
    let data = {};
    data["_"] = "S";
    let width = this.form.getItemValue("width");
    data["z1"] = width
    let cellB = this.layout.cells("b");
    self.core
      .request(data)
      .then((_ret) => {
        let res = antSword.unxss(_ret["text"], false);
        if (res.indexOf("ERROR://") > -1) {
          throw res;
        }
        if (res === "") {
          res = "output is empty.";
          throw res;
        } else {
          res = `<img width="100%" src="data:image/png;base64,${res}">`;
        }
        self.safeHTML(cellB, res);
        toastr.success(LANG["success"], LANG_T["success"]);
      })
      .catch((e) => {
        console.log(e);
        toastr.error(e.constructor === Object?JSON.stringify(e):e, "Error");
      });
  }
}
module.exports = ScreenShot;
