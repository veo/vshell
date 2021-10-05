"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class Getall extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["vshell_monitor"]["support"],
      },
      {
        type: "input",
        name: "port",
        label: LANG["core"]["vshell_monitor"]["form"]["port"],
        labelWidth: 100,
        value: "10081",
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "input",
        name: "pwd",
        label: LANG["core"]["vshell_monitor"]["form"]["pwd"],
        labelWidth: 100,
        value: "veo",
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "label",
        label: LANG["core"]["vshell_monitor"]["msg"],
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
        case "getall":
          try {
            self.getall();
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
      '<toolbar><item type="button" id="getall" text="'+LANG["core"]["vshell_monitor"]["toolbar"]["get"]+'" img="" /></toolbar>',
      function () {}
    );
  }

  getall() {
    let self = this;
    self.core = this.top.core;
    let port = this.form.getItemValue("port");
    let pwd = this.form.getItemValue("pwd");
    let oldurl = this.opt["url"];
    let data = {};
    data["_"] = "";
    this.opt["url"] = `http://${this.opt["ip"]}:${port}/${pwd}`;
    
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
    this.opt["url"] = oldurl;
  }
}
module.exports = Getall;
