import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CountryData, University } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countryData: CountryData | null = null;
  countryCode: string = '';
  activeIndex = 0;
  loading = true;
  error = false;
  isSupportedCountry = false;
  expanded = this.countryData
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.countryCode = params['countryCode'];
      this.isSupportedCountry = this.isCountrySupported(this.countryCode);
      this.loadCountryData();
    });
  }

  isCountrySupported(countryCode: string): boolean {
    return ['uk', 'australia'].includes(countryCode.toLowerCase());
  }

  loadCountryData() {
    this.loading = true;
    this.error = false;
    
    // Get country data for all countries
    this.countryService.getCountryData(this.countryCode).subscribe({
      next: (data) => {
        if (!this.isSupportedCountry) {
          // For unsupported countries, keep the banner images but show coming soon for universities
          this.countryData = {
            ...data,
            universities: [],
            benefits: "We are working on bringing you detailed information about studying in this country. Please check back soon!",
            callToAction: {
              title: "Get in Touch",
              description: "Contact us to learn more about study opportunities in this country"
            }
          };
        } else {
          this.countryData = data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading country data:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  nextSlide() {
    if (this.countryData) {
      this.activeIndex = (this.activeIndex + 1) % this.countryData.bannerImages.length;
    }
  }

  prevSlide() {
    if (this.countryData) {
      this.activeIndex = (this.activeIndex - 1 + this.countryData.bannerImages.length) % this.countryData.bannerImages.length;
    }
  }

  setActiveSlide(index: number) {
    this.activeIndex = index;
  }

  generateAltText(image: any): string {
    return `${this.countryData?.name || 'Country'} - ${image.alt || 'University campus'} - Study abroad with Madhav Overseas`;
  }

  generateStructuredData() {
    if (!this.countryData) return {};
    
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': `Study in ${this.countryData.name} - Madhav Overseas`,
      'description': this.countryData.slogan,
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': this.countryData.name
      }
    };
  }
  toggleDescription(university: University) {
    university.expanded = !university.expanded;
  }
  
}
