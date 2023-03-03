import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  message?: String[];

  addMessage(message:string){
    this.message?.push(message);
  }
}
