import { NgRedux } from 'ng2-redux';
import { Navigation } from './state/navigation';
import { Injectable } from '@angular/core';

export interface IAppState {
  navigation: Navigation;
}

@Injectable()
export class AppRedux extends NgRedux<IAppState> {
  
}