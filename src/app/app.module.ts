import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { LanguagerequirementComponent } from './languagerequirement/languagerequirement.component';
import { PrivacyComponent } from './Components/privacy/privacy.component';
import { CountriesComponent } from './Components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    HomeComponent,
    ContactComponent,
    LanguagerequirementComponent,
    PrivacyComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
