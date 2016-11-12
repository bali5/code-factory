///<reference path="../typings/index.d.ts"/>

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './../aot/src/com/cae/oreo/emu/app/app.module.ngfactory';

enableProdMode();

setTimeout(() => platformBrowser().bootstrapModuleFactory(AppModuleNgFactory));