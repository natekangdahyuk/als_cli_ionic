import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

import * as Hangul from 'hangul-js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  g_arr:string[]=[];
  txt_output:string;  

  style_divBox_j = {
    'z-index': 1
  };


  constructor(public navCtrl: NavController,public platform: Platform, 
      private vibration :Vibration, private nativeAudio: NativeAudio) {
      this.platform.ready().then(() => {
        this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/button_tiny.mp3').then((success)=>{
        //console.log("success");
        },(error)=>{
        //console.log(error);
      });
    });
  }//constructor

  //그룹판 클릭
  btn_group(group_position:string){
    this.vibrate();
    this.play();
    let sel;
    let i = 0;    
    
    //모든 판의 zIndex를 기본으로 변경 후
    sel = document.getElementsByClassName("gridBox") as HTMLCollectionOf<HTMLElement>;
    for (i=0; i< sel.length;i++) {
      sel[i].style.zIndex = "0";
    }
    //클릭 된 판만 노출
    document.getElementById(group_position).style.zIndex = "1";
    
  }

  //마지막 캐릭터 클릭
  btn_last_char(char:string,um:string){
    this.vibrate();
    this.play();
    let sel;
    let i = 0;     

    //모든 판의 zIndex를 기본으로 변경 후
    sel = document.getElementsByClassName("gridBox") as HTMLCollectionOf<HTMLElement>;
    for (i=0; i< sel.length;i++) {
      sel[i].style.zIndex = "0";
    }

    //모음클릭인지, 자음 클릭인지에 따라.
    switch (um) {
      case 'jaum':
        document.getElementById('div_group_moum_top').style.zIndex = "1";        
        break;
      case 'moum':
        document.getElementById('div_group_jaum_top').style.zIndex = "1";
        break;
    }

    this.g_arr.push(char);
    if(this.g_arr.length > 30){
      this.g_arr.shift();
      }

    this.txt_output = Hangul.assemble(this.g_arr).toString();
    console.log("g_arr length_push : " + this.g_arr.length);
    
    
    }
  
  btn_char_del(){
    this.g_arr.pop();    
    this.txt_output = Hangul.assemble(this.g_arr).toString();
    console.log("g_arr length_pop : " + this.g_arr.length);    
  }  
  
  vibrate(){
    this.vibration.vibrate(300);
  }

  play(){    
    this.nativeAudio.play('uniqueId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
  }
  
  
  

  
}//class
