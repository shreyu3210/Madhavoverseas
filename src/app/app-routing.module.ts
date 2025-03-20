import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AboutUsComponent} from './about-us/about-us.component'
import { ContactComponent } from './contact/contact.component';
import { SoonComponent } from './soon/soon.component';
import { LanguagerequirementComponent } from './languagerequirement/languagerequirement.component';
import { UkComponent } from './uk/uk.component';
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
  { path: 'soon', component: SoonComponent },
  { path: 'language-requirement', component: LanguagerequirementComponent },
  { path: 'uk', component: UkComponent },
  // { path: 'language-requirement', component: LanguageRequirementComponent },
  // { path: 'become-partner', component: BecomePartnerComponent },
  // { path: 'australia', component: AustraliaComponent },
  // { path: 'canada', component: CanadaComponent },
  // { path: 'uk', component: UKComponent },
  // { path: 'usa', component: USAComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to home
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
