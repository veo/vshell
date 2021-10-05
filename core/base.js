"use strict";

const LANG = require("../language"); // 插件语言库
const LANG_T = antSword["language"]["toastr"]; // 通用通知提示
const path = require("path");
class Base {
  constructor(top) {
    //获取顶层对象
    this.top = top;
    this.opt = this.top.opt;
    this.shelltype = this.top.opt.type;
    this.win = this.top.win;
    this.payloadtype = "default";
    this.parammode = 2; // 1. 替换模式 2.参数模式
    this.precheck();
  }
  precheck() {
    //检查模块是否适用于当前shell类型
    return true;
  }
  //获取payload模板
  getTemplate(shelltype, payloadtype) {
    //从当前目录下payload.js中获取payload
    let payload = require(path.join(__dirname, this.name, "payload"));
    return payload[shelltype][payloadtype];
  }
  //生成payload
  genPayload(args) {
    //从模板中获取payload
    let payload = this.getTemplate(this.shelltype, this.payloadtype);
    let data = {};
    if (this.parammode == 1) {
      //拼接模式，生成payload
      if (this.shelltype == "jsp") {
        //如果是jsp类型就用字节码的方式修改
        for (let i in args) {
          payload = this.replaceClassStringVar(payload, i, args[i]);
        }
      } else {
        //否则直接进行字符串替换
        for (let i in args) {
          payload = payload.replace(new RegExp(i, "g"), args[i]);
        }
      }
    } else if (this.parammode == 2) {
      //参数模式
      data = args;
    }
    data["_"] = payload;
    return data;
  }
  //获取表单参数
  getArgs() {
    //所有表单参数要形成一个字典
    return {};
  }
  //执行
  exploit() {
    // exploit！
    console.log(this.name + " exploit!");
    let self = this;
    self.core = this.top.core;
    let args = this.getArgs(); //获取参数
    let data = this.genPayload(args);

    self.core
      .request(data)
      .then((_ret) => {
        let res = antSword.unxss(_ret["text"], false); //过滤xss
        if (res === "") {
          res = "output is empty.";
        }
        this.editor.session.setValue(res); //回显内容到输出结果
        this.editor.setReadOnly(true);
        toastr.success(LANG["success"], LANG_T["success"]);
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
        toastr.error(e.constructor === Object ? JSON.stringify(e) : e, "Error");
      });
  }
  setName(name) {
    this.name = name; //每个模块实例化之后要有个唯一的名字
  }
  createLayout(tabbar) {
    //创建tab，总布局
    tabbar.addTab(this.name, LANG["core"][this.name]["title"]);
    let tab = tabbar.cells(this.name);
    this.tab = tab;
    if (this.name == "base_info") {
      //把基本信息设为首页
      tab.setActive();
    }
    let layout = tab.attachLayout("2E");
    this.layout = layout;
    let cellA = layout.cells("a");
    this.cellA = cellA;
    cellA.hideHeader();
    let cellB = layout.cells("b");
    cellB.setText(LANG["result_title"]);
    this.cellB = cellB;
    this.createEditor(cellB);
    this.createToolbar(cellA);
    this.createForm(cellA);
  }
  createEditor(cell) {
    //输出结果默认是编辑器的格式，方便复制
    this.editor = null;
    // 初始化编辑器
    this.editor = ace.edit(cell.cell.lastChild);
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme("ace/theme/tomorrow");
    // this.editor.session.setMode(`ace/mode/html`);
    this.editor.session.setUseWrapMode(true);
    this.editor.session.setWrapLimitRange(null, null);

    this.editor.setOptions({
      fontSize: "14px",
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
    // 编辑器快捷键
    this.editor.commands.addCommand({
      name: "import",
      bindKey: {
        win: "Ctrl-S",
        mac: "Command-S",
      },
      exec: () => {
        // this.toolbar.callEvent("onClick", ["import"]);
      },
    });
    const inter = setInterval(this.editor.resize.bind(this.editor), 200);
    this.win.win.attachEvent("onClose", () => {
      clearInterval(inter);
      return true;
    });
  }
  createForm(cell) {
    //edit your code
  }
  createToolbar(cell) {
    // 初始化exploit按钮，监听onClick事件
    let self = this;
    let toolbar = cell.attachToolbar();
    toolbar.attachEvent("onClick", function (id) {
      try {
        self.exploit();
      } catch (e) {
        console.log(e);
        toastr.error(e.constructor === Object ? JSON.stringify(e) : e, "Error");
      }
    });
    toolbar.loadStruct(
      '<toolbar><item type="button" id="exploit" text="'+LANG["core"]["base_info"]["toolbar"]["get"]+'" title="" /></toolbar>',
      function () {}
    );
    if (this.precheck() == false) {
      //如果precheck不通过，按钮将变成灰色。
      toolbar.disableItem("exploit");
    }
    this.toolbar = toolbar;
  }

  replaceClassStringVar(b64code, oldvar, newvar) {
    //字节码修改函数
    let code = Buffer.from(b64code, "base64");
    let hexcode = code.toString("hex");
    let hexoldvar = Buffer.from(oldvar).toString("hex");
    let oldpos = hexcode.indexOf(hexoldvar);
    if (oldpos > -1) {
      let newlength = this.decimalToHex(newvar.length, 4);
      let retcode = `${hexcode.slice(0, oldpos - 4)}${newlength}${Buffer.from(
        newvar
      ).toString("hex")}${hexcode.slice(oldpos + hexoldvar.length)}`;
      return Buffer.from(retcode, "hex").toString("base64");
    }
    // console.log('nonono')
    return b64code;
  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding =
      typeof padding === "undefined" || padding === null
        ? (padding = 2)
        : padding;
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  }
  safeHTML(cell, html = "", sandbox = "") {
    //当渲染html时一定要用此函数处理，否则可能会产生rce
    html =
      `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
    p {
        font-family:Microsoft YaHei; 
    }
</style>` + html;
    let _html = Buffer.from(html).toString("base64");
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox
    let _iframe = `
      <iframe
        sandbox="${sandbox}"
        src="data:text/html;base64,${_html}"
        style="width:100%;height:100%;border:0;padding:0;margin:0;">
      </iframe>
    `;
    cell.attachHTMLString(_iframe);
    return this;
  }
}

module.exports = Base;
