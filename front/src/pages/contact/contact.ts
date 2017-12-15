import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  msg: string;
  constructor(public navCtrl: NavController, private http: HttpClient) {

  };
  ngOnIni() {
    this.http.get('http://localhost:3000/users/article')
    .subscribe(data => {
      this.msg = data['msg'];
    })
  }
}
