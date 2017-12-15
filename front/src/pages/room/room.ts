import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';

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
    msg: any;
    lasted: Lasted;
    constructor(public params:NavParams, private http: HttpClient, private sanitizer: DomSanitizer){ ///step1
        this.title= this.params.get('name'); //step2
        this.lasted = new Lasted('', [], '');
    }
    ngOnInit() {
      this.http.get('http://42.51.44.131:3000/users/article')
      .subscribe(data => {
        this.msg = this.sanitizer.bypassSecurityTrustHtml(data['msg']);
      })
    }
}