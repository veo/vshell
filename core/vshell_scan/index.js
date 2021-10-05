"use strict";

const Base = require("../base");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class Exploit extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["vshell_scan"]["support"],
      },
      {
        type: "input",
        name: "ip",
        label: "IP",
        labelWidth: 100,
        value: "127.0.0.1",
        labelAlign:"center",
        inputWidth: 300,
        required: true,
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
        case "MS17010":
          try {
            self.ExploitMS17010();
          } catch (e) {
            toastr.error(
              e.constructor === Object ? JSON.stringify(e) : e,
              LANG_T["error"]
            );
          }
          break;
        case "smbGhost":
          try {
            self.ExploitsmbGhostScan();
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
      '<toolbar><item type="button" id="MS17010" text="MS17010" img="" /><item type="button" id="smbGhost" text="SmbGhost" img="" /><item type="separator" id="separator" /></toolbar>',
      function () {}
    );
  }
  ExploitMS17010() {
    let self = this;
    self.core = this.top.core;
    let ip = this.form.getItemValue("ip");
    let data = {
      _: "MS17010scan",
      "z1" : ip
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
  ExploitsmbGhostScan() {
    let self = this;
    self.core = this.top.core;
    let ip = this.form.getItemValue("ip");
    let data = {
      _: "smbGhostScan",
      "z1" : ip
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
