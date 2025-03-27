import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { FaqComponent } from './faq/faq.component';

import { LanguagerequirementComponent } from './languagerequirement/languagerequirement.component';

import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    HomeComponent,
    ContactComponent,
    FaqComponent,
    
    LanguagerequirementComponent,

    CountriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
