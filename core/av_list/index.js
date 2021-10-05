"use strict";

const Base = require("../base");
const avList = require("./avlist");
const LANG = require("../../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
class AVList extends Base {
  createForm(cell) {
    var str = [
      {
        type: "label",
        label: LANG["core"]["av_list"]["support"],
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
            if (self.exptype == "auto") {
              self.autoExploit();
            } else {
              self.manualExploit();
            }
          } catch (e) {
            toastr.error(e, LANG_T["error"]);
          }
          break;
        case "auto":
          self.exptype = "auto";
          self.toolbar.enableItem("exploit");
          break;
        case "manual":
          self.exptype = "manual";
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
      '<toolbar><item type="button" id="exploit" text="'+LANG["core"]["av_list"]["toolbar"]["get"]+'" img="" /><item type="separator" id="separator" /><item type="buttonSelect" id="method" text="'+LANG["core"]["av_list"]["toolbar"]["method"]+'" ><item type="button" id="auto" text="'+LANG["core"]["av_list"]["toolbar"]["auto"]+'" image="" /><item type="button" id="manual" text="'+LANG["core"]["av_list"]["toolbar"]["manual"]+'" /></item></toolbar>',
      function () {}
    );
    toolbar.disableItem("exploit");
  }
  manualExploit() {
    let self = this;
    let text = self.editor2.session.getValue();
    let result = self.getAV(text);
    self.editor.session.setValue(result);
    self.editor.setReadOnly(true);
    toastr.success(LANG["success"], LANG_T["success"]);
  }

  autoExploit() {
    let self = this;
    self.core = this.top.core;
    let data = {};
    data["_"] = "M";
    data["z1"] = "cmd";
    data["z2"] = "tasklist /svc";
    self.core
      .request(data)
      .then((_ret) => {
        let res = antSword.unxss(_ret["text"], false);
        if (res.indexOf("ERROR://") > -1) {
          throw "Not Support Linux";
        }
        if (res === "") {
          res = "output is empty.";
        }
        let result = self.getAV(res);
        this.editor.session.setValue(result);
        this.editor.setReadOnly(true);
        toastr.success(LANG["success"], LANG_T["success"]);
      })
      .catch((e) => {
        console.log(e);
        toastr.error(e.constructor === Object?JSON.stringify(e):e, "Error");
      });
  }
  getAV(text) {
    var re = new RegExp("(.*?).exe", "g");
    var tasks = text.match(re);
    var result = "";
    for (let i = 0; i < Object.keys(avList).length; i++) {
      var taskid = Object.keys(avList)[i];
      for (let x = 0; x < tasks.length; x++) {
        if (taskid.toLowerCase() == tasks[x].toLowerCase()) {
          result += taskid + " <=> " + avList[taskid] + "\n";
        }
      }
    }
    return result;
  }
}
module.exports = AVList;
