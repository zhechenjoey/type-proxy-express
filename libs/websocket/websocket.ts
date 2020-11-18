import { Socket } from "socket.io";
const http = require("http");
const httpProxy = require("http-proxy");
const io = require("socket.io");
import express = require("express");
export class ProxyWebsocket {
  static ProxyUpgrade(app: express.Application) {
    var proxy = new httpProxy.createProxyServer({
      target: {
        host: "localhost",
        port: 3002,
      },
    });
    var proxyServer = http.createServer(function (req: any, res: any) {
      proxy.web(req, res); // 代理
    });
    proxyServer.on("upgrade", function (req: any, socket: any, head: any) {
      proxy.ws(req, socket, head);
    });
    proxyServer.listen(3006, () => {
      console.log("proxy-server is ruuning on 3006");
    });
  }
}
