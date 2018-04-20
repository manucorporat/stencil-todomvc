/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/todomvc-app-css/index.css",
    "revision": "abb7080e40da2bc059e7762b30555969"
  },
  {
    "url": "assets/todomvc-common/base.css",
    "revision": "fdb11056de60b06dc72e652dd8cb0027"
  },
  {
    "url": "assets/todomvc-common/base.js",
    "revision": "1dbe6e0677bea55c067e7ef6115d40e8"
  },
  {
    "url": "build/todo.js",
    "revision": "2118daef7ebd25d09bb1fc6c04f81c0e"
  },
  {
    "url": "build/todo/todo.1vs4wwsg.js",
    "revision": "bf0df2e245e919fa1ecb07f29f20d89c"
  },
  {
    "url": "build/todo/todo.7dvsugtq.js",
    "revision": "5e1779d874c599f78069a850baa638df"
  },
  {
    "url": "build/todo/wnrsyqgf.es5.js",
    "revision": "76d4ff7e6284a476edb4c8663672a00c"
  },
  {
    "url": "build/todo/wnrsyqgf.js",
    "revision": "99d664b56eb341df09d3a737565ff51d"
  },
  {
    "url": "index.html",
    "revision": "fc7ee89886a014fabaef70f30c3f6654"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
