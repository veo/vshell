module.exports = {
  title: "vshell 使用蚁剑控制台远程管理主机",
  success: "执行成功",
  error: "执行失败",
  no_mode: "请点击上方按钮,选择模式",
  form_not_comp: "请填写完整",
  result_title: "输出结果",
  toolbar: {
    start: "开始",
    select_mode: "选择模式",
  },
  precheck: {
    only_linux: "仅支持Linux操作系统",
    only_win: "仅支持Windows操作系统",
    require_func: (func) => `${func} 函数不可用`,
    not_support: `不支持当前类型`,
  },
  core: {
    base_info: {
      title: "基本信息",
      toolbar: {
        get: "获取",
      },
      msg: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style type="text/css">
          p {
              font-family:Microsoft YaHei; 
          }
      </style>
      <p>vshell 使用蚁剑控制台远程管理主机</p>
      <p>具体使用请参考 https://github.com/veo/vshell</p>
      <p>author: veo</p>
      
      <p>blog: https://veo.pub/</p>
      
      <p>github: https://github.com/veo/</p>
      
      <p><b>注意事项</b></p>
  
      <p><b>本项目仅供合法授权的渗透测试、攻防演习以及爱好者参考学习，请勿用于非法用途，否则自行承担相关责任。</b></p>
      `,
    },
    av_list: {
      support : "支持系统: Windows",
      title: "杀软识别",
      toolbar: {
        get: "获取",
        auto: "自动获取",
        manual: "手动输入tasklist",
        method: "选择获取方式",
      },
    },
    vshell_service: {
      support : "支持系统: Windows,Linux,Darwin",
      title: "开机启动",
      form: {
        name: "服务名称",
        description: "服务描述",
      },
      toolbar: {
        install: "安装",
        remove: "卸载",
      },
      msg: "<p>1.Windows 如果有杀毒软件有可能会弹框拦截，谨慎使用</p><p>2.Linux 下放心使用</p>",
    },
    vshell_screenshot: {
      support : "支持系统: Windows,Linux,Darwin",
      title: "屏幕截屏",
      form: {
        width: "像素宽度",
      },
      toolbar: {
        screenshot: "截屏",
      },
      msg : "<p>1.分辨率宽度越大，图片越清晰，图片过大会导致连接不稳定</p><p>2.超过1200左右即使数据正常返回，蚁剑也渲染不出来了</p>",
    },
    vshell_procdump: {
      support : "Support: Windows",
      title: "Procdump",
      form: {
        pid: "PID",
        path: "Path",
      },
      toolbar: {
        getpid: "获取PID列表",
        run: "执行",
      },
      msg : '<p>1.解决获取密码使用mimikatz有可能不成功的问题</p><p>2.点击获取PID列表找到 lsass.exe 的PID，填入后导出文件后下载到本地</p><p>本地执行命令：mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonPasswords full" exit</p>',
    },
    vshell_monitor: {
      support: "支持系统: 所有",
      title: "主机列表",
      form: {
        port: "Monitor 端口",
        pwd: "Monitor 密码",
      },
      toolbar: {
        get: "获取",
      },
      msg: "查看上线主机情况",
    },
    vshell_browserdata: {
      support : "支持系统: Windows,Linux,Darwin",
      title: "浏览器",
      form: {
        path: "客户端路径",
      },
      toolbar: {
        getdata: "导出浏览器数据",
      },
      msg: "<p>1.如果不填路径则生成在当前路径</p><p>2.目录不存在则会创建目录</p><p>3.没有获取成功或没有数据则不会生成文件</p><p>浏览器支持情况及详情见：https://github.com/moonD4rk/HackBrowserData</p>",
    },
    vshell_socks5: {
      support : "支持系统: 所有",
      title: "Proxy",
      msga: "<p>上线即代理</p>",
      msgb: "<p><b>socks5 代理需要设置账号密码进行连接，账号密码都是：",
    },
    vshell_scan: {
      title: "漏洞测试",
    },
    vshell_shellcode: {
      support : "支持系统: 所有",
      title: "内存运行",
      form: {
        args: "参数",
      },
      toolbar: {
        method: "运行方式",
        run: "运行",
        runexe: "运行exe",
        runshellcode: "运行ShellCode",
      },
      msga: "<span>如 mimikatz 获取密码参数为：privilege::Debug sekurlsa::logonpasswords exit</br></span>",
      msgb: "<span>注意：</br>1.运行shellcode也会带上参数，如没有参数请先清空参数内容</br>2.shellcode 运行请输入base64编码后的shellcode（注意是base64编码，不是hex编码）</span>",
    },
  },
};
