
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isopen: boolean = false;
  mobHeight: any;
  mobWidth: any;
  isSmallScreen: boolean;
  title: string;
  isAuthed: boolean;

  constructor(private auth: AuthService,
              private router: Router) {
    this.mobHeight = window.innerHeight;
    this.mobWidth = window.innerWidth;
    if (this.mobWidth < 500) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
    this.auth.getUserState().subscribe(auth=>{
      if (auth){
        this.isAuthed=true;
      }else {
        this.isAuthed = false;
        router.navigate(['/login']);
      }
    });
   
  }

  isLogon: boolean;

  ngOnInit() {
    //this.title = "ERP MOBILE";
    this.isLogon = this.auth.isAuthenticated();
  }

  onLogout() {

    this.auth.logout().then(state=>{
      this.isAuthed = false;
      this.router.navigate(['/login']);
    })
  }
}
