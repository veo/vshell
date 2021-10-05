"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class Exploit extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["vshell_service"]["support"],
      },
      {
        type: "input",
        name: "name",
        label: LANG["core"]["vshell_service"]["form"]["name"],
        value: "name",
        labelWidth: 100,
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "input",
        name: "description",
        label: LANG["core"]["vshell_service"]["form"]["description"],
        value: "description",
        labelWidth: 100,
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "label",
        label: LANG["core"]["vshell_service"]["msg"],
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
        case "install":
          try {
            self.installExploit();
          } catch (e) {
            toastr.error(
              e.constructor === Object ? JSON.stringify(e) : e,
              LANG_T["error"]
            );
          }
          break;
        case "remove":
          try {
            self.removeExploit();
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
      '<toolbar><item type="button" id="install" text="'+LANG["core"]["vshell_service"]["toolbar"]["install"]+'" img="" /><item type="button" id="remove" text="'+LANG["core"]["vshell_service"]["toolbar"]["remove"]+'" img="" /><item type="separator" id="separator" /></toolbar>',
      function () {}
    );
  }

  installExploit() {
    let self = this;
    self.core = this.top.core;
    let name = this.form.getItemValue("name");
    let description = this.form.getItemValue("description");
    let data = {
      _: "VI",
      "z1" : name,
      "z2" : description
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
  removeExploit() {
    let self = this;
    self.core = this.top.core;
    let name = this.form.getItemValue("name");
    let description = this.form.getItemValue("description");
    let data = {
      _: "VR",
      "z1" : name,
      "z2" : description
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
