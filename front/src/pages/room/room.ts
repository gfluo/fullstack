import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

import { NavParams } from 'ionic-angular';

import { Lasted } from './lasted';

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    title: string; //step2
    lasted: Lasted;
    constructor(public params:NavParams, private http: HttpClient){ //step1
        this.title= this.params.get('name'); //step2
        this.lasted = new Lasted('', [], '');
    }

    ngOnInit(){
        const params = new HttpParams()
        .set('type', this.params.get('id'));

        this.http.get('http://172.50.4.102:3000/users/lasted', {params})
        .subscribe(data => {
            /*
            if (0 === data.status) {
                let newLasted = data.data;
                this.lasted.issue = newLasted.issue;
                this.lasted.code = newLasted.code;
                this.lasted.time = newLasted.time;
            }
            */
            ///this.lasted = data;  
            ///console.log(this.lasted);
        })
    }
}