import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 

import { RoomPage } from '../room/room';

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
      image: "assets/imgs/time.jpg",
    },
    {
      image: "assets/imgs/time.jpg",
    }
  ];
  RoomPage;
  lotteryList: Object;
  constructor(public navCtrl: NavController, private http: HttpClient) {
  }
  enterRoom(roomInfo) {
    this.navCtrl.push(RoomPage, roomInfo);
  }

  ngOnInit() {
    this.http.get('http://172.50.4.102:3000/users/home')
    .subscribe(data => {
      this.RoomPage = RoomPage;
      this.lotteryList = data;
    })
  }
}
