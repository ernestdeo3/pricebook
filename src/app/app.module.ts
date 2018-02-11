import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { DbServicesService } from './services/db-services.service';
import { PriceEntryComponent } from './forms/price-entry/price-entry.component';
import { AuthService } from './services/auth.service';
import { AuthLoginComponent } from './forms/auth-login/auth-login.component';
import { AuthguardService } from './authguard-service';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'price', component: PriceEntryComponent, canActivate: [AuthguardService] },
  { path: 'login',component:AuthLoginComponent},
  { path: '',   redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PriceEntryComponent,
    AuthLoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DbServicesService,AuthService,AuthguardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
