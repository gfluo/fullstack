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
    lasted: Lasted;
    article: string;
    constructor(public params:NavParams, private http: HttpClient){ //step1
        this.title= this.params.get('name'); //step2
        this.lasted = new Lasted('', [], '');
        this.article = '';
    }

    postArticle(){
        console.log(this.article);
    };
    ngOnInit(){
        tinymce.init({
            selector: 'textarea',
            height: 500,
            
            theme: 'modern',
            plugins: [
            'advlist autolink lists link image charmap hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars fullscreen',
            'insertdatetime media nonbreaking save contextmenu directionality',
            'emoticons paste textcolor colorpicker textpattern imagetools image '
            ],
            
            ///toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | fontsizeselect',
            toolbar1: 'insert | alignleft aligncenter alignright alignjustify | image media',
            ///toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
        
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            image_advtab: true,
            file_picker_types: 'file image media',
            images_upload_url: 'http://localhost:3000/users/uploadFile',
            images_upload_base_path: 'http://localhost:3000/uploads',
            ///images_upload_credentials: true,
            /*
            images_upload_handler: function (blobInfo, success, failure) {
                var xhr, formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', 'http://localhost:3000/users/uploadFile');
                ///var token = $('[name="csrf-token"]').prop('content');
                ///xhr.setRequestHeader("X-CSRF-Token", token);
                xhr.onload = function() {
                    var json;
                    if (xhr.status != 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }
                    json = JSON.parse(xhr.responseText);
        
                    if (!json || typeof json.location != 'string') {
                        failure('Invalid JSON: ' + xhr.responseText);
                        return;
                    }
                    success(json.location);
                };
                formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            },
            */
            file_picker_callback: function(cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/* audio/* video/*');
                input.onchange = function() {
                    var file = this['files'][0];
        
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
        
                        // call the callback and populate the Title field with the file name
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                };
        
                input.click();
            }
        });
      };
      ngOnDestroy() {
        tinymce.remove(this['editor']);
      }
}