import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AboutUsComponent} from './about-us/about-us.component'
import { ContactComponent } from './contact/contact.component';

import { LanguagerequirementComponent } from './languagerequirement/languagerequirement.component';

import { CountriesComponent } from './countries/countries.component';
// import { LanguageRequirementComponent } from './components/language-requirement/language-requirement.component';
// import { BecomePartnerComponent } from './components/become-partner/become-partner.component';
// import { AustraliaComponent } from './components/countries/australia.component';
// import { CanadaComponent } from './components/countries/canada.component';
// import { UKComponent } from './components/countries/uk.component';
// import { USAComponent } from './components/countries/usa.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  
  { path: 'language-requirement', component: LanguagerequirementComponent },
  
  // New dynamic country routes
  { path: 'countries/:countryCode', component: CountriesComponent },
  
  // Keep old routes temporarily for backward compatibility
  { path: 'uk', redirectTo: 'countries/uk', pathMatch: 'full' },
  
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to home
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
