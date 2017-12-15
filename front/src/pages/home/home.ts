import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController) {
    this.article = '';
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
      ///inline: true,
      plugins: "image, media, link, autolink, emoticons, imagetools, save",
      ///file_browser_callback_types: 'file image media',
      file_picker_types: 'file image media',
      media_live_embeds: true,
      ///images_upload_base_path: 'http://192.168.10.154:3000/uploads',
      toolbar1: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | save',
      file_picker_callback: function(cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/* audio/* video/*');
        
        // Note: In modern browsers input[type="file"] is functional without 
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it anymore.
    
        input.onchange = function() {
          var file = this['files'][0];
          
          var reader = new FileReader();
          reader.onload = function () {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
    
            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        
        input.click();
      },
      images_upload_handler: function (blobInfo, success, failure) {
        var xhr, formData;
    
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        ///xhr.open('POST', 'http://42.51.44.131:3000/users/uploadFile');
        xhr.open('POST', 'http://42.51.44.131:3000/users/uploadFile');
        xhr.onload = function() {
          var json;
    
          if (xhr.status !== 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
    
          json = JSON.parse(xhr.responseText);
    
          if (!json || typeof json.location !== 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
    
          success(json.location);
        };
    
        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
    
        xhr.send(formData);
      },
    });
  };

  ngOnDestroy() {
    tinymce.remove(this['editor']);
  }
}
