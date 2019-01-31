import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
const specialStyle: string = 'background: black; color: white; font-size: 1.2em; padding: 2px 0 2px 0;';
export class MessageService {
  constructor() { }

  sendSpecial(message: string) {
    console.log('%c' + message, specialStyle);
  }
}
