import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, fcm: FCM) {
    platform.ready().then(() => {
      //웹 UI 확인 하려면 FCM 부분을 주석 처리해야 한다.
      //또는 브레이크 걸고 ionic cordova run android --device  로 확인
      //Notifications
      ///*
      fcm.subscribeToTopic('all');
      fcm.getToken().then(token => {        
        console.log(token);
      })
      
      fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      
      fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      })
      //end notifications
     // */

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
    });
  }
}
