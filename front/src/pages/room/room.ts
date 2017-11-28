import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";


import { NavParams } from 'ionic-angular'

class Gundam {
    issue: string;
    time: string;
  }

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    title: string; //step2
    gundam: Gundam = {
        issue: '1111',
        time: '111'
    };
    constructor(public params:NavParams, private http: HttpClient){ //step1
        this.title=this.params.get('name'); //step2
    }

    ngOnInit(){
        const params = new HttpParams()
        .set('type', this.params.get('id'));

        this.http.get('http://127.0.0.1:3000/users/lasted', {params})
        .subscribe(data => {
          ///this.lasted = data;  
          ///console.log(this.lasted);
        })
    }
}