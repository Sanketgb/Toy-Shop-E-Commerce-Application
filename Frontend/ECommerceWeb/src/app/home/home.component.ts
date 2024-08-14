import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  HideHomeContent = false;
  imagePath = 'assets/images/toy-shop-homepage.jpg';
  ironman = 'assets/images/ironman.jpg';
  naruto = 'assets/images/naruto.jpg';
  teddyBear = 'assets/images/teddyBear.jpg';
  deadpool = 'assets/images/action-toy.jpg';
  elephant = 'assets/images/elephant.jpg';
  minions = 'assets/images/minions.jpg';
  musictoy = 'assets/images/musical-toy.jpg';


  constructor() { }

  ngOnInit(): void {
  }

  hideHomeContent(){ this.HideHomeContent = true;}
  homeContent() {this.HideHomeContent = false;}

}
