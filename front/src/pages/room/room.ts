import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular'

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    title:string; //step2
    
    constructor(public params:NavParams){ //step1
        this.title=this.params.get('name'); //step2
    }
}