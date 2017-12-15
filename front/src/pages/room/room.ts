import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

import { NavParams } from 'ionic-angular';

import { Lasted } from './lasted';

declare var tinymce: any;
declare var $: any;

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    title: string; //step2
    msg: string;
    lasted: Lasted;
    constructor(public params:NavParams, private http: HttpClient){ //step1
        this.title= this.params.get('name'); //step2
        this.lasted = new Lasted('', [], '');
    }
    ngOnIni() {
      this.http.get('http://localhost:3000/users/article')
      .subscribe(data => {
        this.msg = data['msg'];
      })
    }
}