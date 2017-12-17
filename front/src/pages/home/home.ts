import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DOCUMENT } from '@angular/platform-browser';

import { RoomPage } from '../room/room';

declare var CKEDITOR: any;

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
  constructor(public navCtrl: NavController, 
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document) {
    this.article = '';
  }
  enterRoom(type) {
    let name = type === 1 ? '重庆十分' : '广东十分';
    this.navCtrl.push(RoomPage, {type: type, name: name});
  }

  ngOnInit() {
    const s = this._renderer2.createElement('script');
    s.text = `{
      CKEDITOR.replace('editor1', {
        ///heigth: 500,
        allowedContent: true,
        extraPlugins: 'html5video,widget,widgetselection,clipboard,lineutils',
        image_previewText: '',
        filebrowserUploadUrl: 'http://localhost:3000/users/uploadFile',
        filebrowserImageUploadUrl: 'http://localhost:3000/users/uploadFile',
        uiColor: '#9AB8F3',
        toolbar: [
          ['Bold', 'Italic'],
          ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
          ['Outdent','Indent'],
          ['Subscript','Superscript'],
          ['Image', 'Html5video']
        ]
      });
    }`
    this._renderer2.appendChild(this._document.body, s);
  };

  ngOnDestroy() {
    
  }
}
