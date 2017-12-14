import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 

import { RoomPage } from '../room/room';
declare var tinymce: any;
declare var $: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides = [
    {
      image: "assets/imgs/time.jpg",
    },
    {
      image: "assets/imgs/time2.jpg",
    },
    {
      image: "assets/imgs/time3.jpg",
    }
  ];
  article: string;
  RoomPage;
  lotteryList: Object;
  constructor(public navCtrl: NavController, private http: HttpClient) {
  }
  enterRoom(type) {
    let name = type === 1 ? '重庆十分' : '广东十分';
    this.navCtrl.push(RoomPage, {type: type, name: name});
  }

  ngOnInit() {
    tinymce.init({
      selector: 'textarea',  // change this value according to your HTML
      height: 500,
      language: 'zh_CN',
      toolbar1: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | image media',
      file_browser_callback: function(field_name, url, type, win) {
        win.document.getElementById(field_name).value = 'my browser value';
      }
    });
  };

  ngOnDestroy() {
    tinymce.remove(this['editor']);
  }
}
