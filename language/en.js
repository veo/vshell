module.exports = {
  title: "vshell Use the Antsword console host",
  success: "Successful execution",
  error: "Execution failed",
  no_mode: "Please click the button above to select a mode",
  form_not_comp: "Please complete",
  result_title: "Output result",
  toolbar: {
    start: "Start",
    select_mode: "Select Mode",
  },
  precheck: {
    only_linux: "Only supports Linux operating system",
    only_win: "Only supports Windows operating system",
    require_func: (func) => `${func} function is not available`,
    not_support: `The current type is not supported`,
  },
  core: {
    base_info: {
      title: "Base Info",
      toolbar: {
        get: "Get",
      },
      msg: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style type="text/css">
          p {
              font-family:Microsoft YaHei; 
          }
      </style>
      <p>vshell, Use the Antsword console host</p>
      <p>For specific use, please refer to https://github.com/veo/vshell</p>
      <p>author: veo</p>
      
      <p>blog: https://veo.pub/</p>
      
      <p>github: https://github.com/veo/</p>
      
      <p><b>matters needing attention</b></p>
  
      <p><b>This project is only for legally authorized penetration testing, attack and defense exercises and enthusiasts' reference and learning. Do not use it for illegal purposes, otherwise you will bear relevant responsibilities.</b></p>
      `,
    },
    av_list: {
      support : "Support: Windows",
      title: "AV Recognition",
      toolbar: {
        get: "Get",
        auto: "Auto Obtain",
        manual: "Manually Obtain",
        method: "Method",
      },
    },
    vshell_service: {
      support : "Support: Windows,Linux,Darwin",
      title: "Daemon manager",
      form: {
        name: "Server name",
        description: "Description",
      },
      toolbar: {
        install: "Install",
        remove: "Remove",
      },
      msg: '<p>1.If windows has anti-virus software, it may be blocked,use with caution</p><p>2.Rest assured to use under Linux</p>',
    },
    vshell_screenshot: {
      support : "Support: Windows,Linux,Darwin",
      title: "Screen Shot",
      form: {
        width: "Pixel width",
      },
      toolbar: {
        screenshot: "Screenshot",
      },
      msg : '<p>1.The larger the resolution width, the clearer the picture. Too large a picture will lead to unstable connection</p><p>2.Over 1200, even if the data returns normally, the ant sword cannot be rendered</p>',
    },
    vshell_procdump: {
      support : "Support: Windows",
      title: "Procdump",
      form: {
        pid: "PID",
        path: "Path",
      },
      toolbar: {
        getpid: "Getpid",
        run: "Run",
      },
      msg : '<p>1.Solve the problem that obtaining password and using mimikatz may not be successful</p><p>2.Click to get the PID list, find the PID of lsass.exe, fill in it, export the file and download it locally</p><p>mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonPasswords full" exit</p>',
    },
    vshell_monitor: {
      support : "Support: ALL",
      title: "Monitor",
      form: {
        port: "Monitor Port",
        pwd: "Monitor Pwd",
      },
      toolbar: {
        get: "Get",
      },
      msg: "View the online host",
    },
    vshell_browserdata: {
      support : "Support: Windows,Linux,Darwin",
      title: "HackBrowserData",
      form: {
        path: "Client Path",
      },
      toolbar: {
        getdata: "Export browser data",
      },
      msg: "<p>1.If the path is not filled in, it will be generated in the current path</p><p>2.If the directory does not exist, it will be created</p><p>3.If there is no success or no data, the file will not be generated</p><p>For browser support and details, see：https://github.com/moonD4rk/HackBrowserData</p>",
    },
    vshell_scan: {
      support : "Support: ALL",
      title: "Scan",
    },
    vshell_shellcode: {
      support : "Support: ALL",
      title: "Memoryrun",
      form: {
        args: "args",
      },
      toolbar: {
        method: "Run Method",
        run: "Run",
        runexe: "Run exe",
        runshellcode: "Run ShellCode",
      },
      msga: "<span>mimikatz get password args is: privilege::Debug sekurlsa::logonpasswords exit</br></span>",
      msgb: "<span>be careful:</br>1.Running shellcode will also bring parameters. If there are no parameters, please clear the parameter content first</br>2.For shellcode operation, please enter the shellcode after Base64 encoding (note that it is Base64 encoding, not hex encoding)</span>",
    },
    vshell_socks5: {
      support : "Support: ALL",
      title: "Proxy",
      msga: "<p>Online is the socsk5</p>",
      msgb: "<p><b>Socks5 needs to set user and password to connect. Both account and password are：",
    },
  },
};
