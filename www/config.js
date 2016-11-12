System.config({
  transpiler: 'traceur',
  defaultJSExtensions: true,
  paths: {
    "npm:": "node_modules/",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "main": "main.js",
      "defaultExtension": "js"
    },
    "@angular/material": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "rxjs": {
      "defaultExtension": "js"
    },
    "moment": {
      "main": "moment.js",
      "defaultExtension": "js"
    },
    "moment-duration-format": {
      "main": "lib/moment-duration-format.js",
      "defaultExtension": "js"
    },
    "numericjs": {
      "main": "numeric-1.2.6.js",
      "defaultExtension": "js"
    },
    "reflect-metadata": {
      "main": "Reflect.js",
      "defaultExtension": "js"
    },
    "lodash": {
      "main": "lodash.js",
      "defaultExtension": "js"
    },
    "hammerjs": {
      "main": "hammer.js",
      "defaultExtension": "js"
    },
    "typedjson-npm": {
      "main": "js/typed-json.js",
      "defaultExtension": "js"
    },
    "redux": {
      "main": "dist/redux.min.js",
      "defaultExtension": "js"
    },
    "redux-logger": {
      "main": "dist/index.js",
      "defaultExtension": "js"
    },
    "ng2-redux": {
      "main": "lib/index.js",
      "defaultExtension": "js"
    },
    "core-js": {
      "main": "shim.js",
      "defaultExtension": "js"
    },
    "zone.js": {
      "main": "dist/zone.min.js",
      "defaultExtension": "js"
    },
    "traceur": {
      "main": "dist/src/traceur.js",
      "defaultExtension": "js"
    },
    "babel": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/common": {
      "main": "/bundles/common.umd.js",
      "defaultExtension": "js"
    },
    "@angular/compiler": {
      "main": "/bundles/compiler.umd.js",
      "defaultExtension": "js"
    },
    "@angular/core": {
      "main": "/bundles/core.umd.js",
      "defaultExtension": "js"
    },
    "@angular/forms": {
      "main": "/bundles/forms.umd.js",
      "defaultExtension": "js"
    },
    "@angular/http": {
      "main": "/bundles/http.umd.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser": {
      "main": "/bundles/platform-browser.umd.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser-dynamic": {
      "main": "/bundles/platform-browser-dynamic.umd.js",
      "defaultExtension": "js"
    },
    "@angular/router": {
      "main": "/bundles/router.umd.js",
      "defaultExtension": "js"
    },
    "@angular/router-deprecated": {
      "main": "/bundles/router-deprecated.umd.js",
      "defaultExtension": "js"
    },
    "@angular/upgrade": {
      "main": "/bundles/upgrade.umd.js",
      "defaultExtension": "js"
    }
  },

  map: {
    "@angular": "npm:@angular",
    "app": "build/scripts",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "hammerjs": "npm:hammerjs",
    "lodash": "npm:lodash",
    "moment": "npm:moment",
    "moment-duration-format": "npm:moment-duration-format",
    "ng2-redux": "npm:ng2-redux",
    "numericjs": "npm:numericjs",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.17",
    "plugin-babel-runtime": "npm:babel-runtime@5.8.38",
    "redux": "npm:redux",
    "redux-logger": "npm:redux-logger",
    "reflect-metadata": "npm:reflect-metadata",
    "rxjs": "npm:rxjs",
    "systemjs-babel-build": "npm:systemjs-plugin-babel/systemjs-babel-browser.js",
    "traceur": "npm:traceur",
    "typedjson-npm": "npm:typedjson-npm",
    "zone.js": "npm:zone.js",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
