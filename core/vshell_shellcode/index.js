"use strict";

const Base = require("../base");
const fs = require('fs');
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class AVList extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["vshell_shellcode"]["support"],
      },
      {
        type: "input",
        name: "args",
        label: LANG["core"]["vshell_shellcode"]["form"]["args"],
        labelWidth: 100,
        value: "",
        labelAlign:"center",
        inputWidth: 300,
        required: true,
      },
      {
        type: "label",
        label: LANG["core"]["vshell_shellcode"]["msga"],
      },
      {
        type: "label",
        label: LANG["core"]["vshell_shellcode"]["msgb"],
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
            if (self.exptype == "pe") {
              self.ExploitPE();
            } else {
              self.Exploitshellcode();
            }
          } catch (e) {
            toastr.error(e, LANG_T["error"]);
          }
          break;
        case "pe":
          self.exptype = "pe";
          self.toolbar.enableItem("exploit");
          break;
        case "shellcode":
          self.exptype = "shellcode";
          let editor = null;
          // 初始化编辑器
          editor = ace.edit(self.cellA.cell.lastChild);
          editor.$blockScrolling = Infinity;
          editor.setTheme("ace/theme/tomorrow");
          editor.session.setUseWrapMode(true);
          editor.session.setWrapLimitRange(null, null);
      
          editor.setOptions({
            fontSize: "14px",
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
          });
          editor.setValue("")
          const inter = setInterval(editor.resize.bind(editor), 200);
          self.win.win.attachEvent("onClose", () => {
            clearInterval(inter);
            return true;
          });
          self.editor2=editor;
          self.toolbar.enableItem("exploit");
          break;
        default:
          break;
      }
    });
    toolbar.loadStruct(
      '<toolbar><item type="button" id="exploit" text="'+LANG["core"]["vshell_shellcode"]["toolbar"]["run"]+'" img="" /><item type="separator" id="separator" /><item type="buttonSelect" id="method" text="'+LANG["core"]["vshell_shellcode"]["toolbar"]["method"]+'" ><item type="button" id="pe" text="'+LANG["core"]["vshell_shellcode"]["toolbar"]["runexe"]+'" image="" /><item type="button" id="shellcode" text="'+LANG["core"]["vshell_shellcode"]["toolbar"]["runshellcode"]+'" /></item></toolbar>',
      function () {}
    );
    toolbar.disableItem("exploit");
  }

  ExploitPE() {
    let self = this;
    self.core = this.top.core;
    let args = this.form.getItemValue("args");
    const { dialog } = require("electron").remote;
    var base64data = fs.readFileSync(dialog.showOpenDialog()[0], 'base64');
    let data = {
      _: "shellcode",
      "z0" : "pe",
      "z1" : base64data,
      "z2" : args,
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
  Exploitshellcode() {
    let self = this;
    self.core = this.top.core;
    let args = this.form.getItemValue("args");
    let base64data = self.editor2.session.getValue();
    let data = {
      _: "shellcode",
      "z0" : "shellcode",
      "z1" : base64data,
      "z2" : args,
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
module.exports = AVList;
