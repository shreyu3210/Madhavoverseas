import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuCollapsed = true;
  currentRoute: string = '/';
  private bsCollapse: any;
  countries: {code: string, name: string}[] = [];
  isDropdownOpen = false;
  
  constructor(private router: Router, private countryService: CountryService) {
    // Subscribe to router events to update active link and close menu
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
      this.closeMenu(); // Close menu on route change
    });
  }

  ngOnInit() {
    // Initialize the collapse after view init
    setTimeout(() => {
      const collapseElement = document.getElementById('navbarTogglerDemo02');
      if (collapseElement) {
        this.bsCollapse = new bootstrap.Collapse(collapseElement, {
          toggle: false
        });
        // Ensure menu is collapsed by default
        this.bsCollapse.hide();
      }
    }, 100);
    
    this.countryService.getAllCountries().subscribe((data: {code: string, name: string}[]) => {
      this.countries = data;
    });
  }
  
  // Check if route is active
  isActive(route: string): boolean {
    if (route === '/' && this.currentRoute === '/') {
      return true;
    }
    return route !== '/' && this.currentRoute.startsWith(route);
  }
  
  // Close the mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    const navbarCollapse = document.getElementById('navbarTogglerDemo02');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const dropdown = document.querySelector('.dropdown-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    // Close dropdown when clicking outside
    if (dropdown && dropdownToggle && 
        !dropdown.contains(event.target) && 
        !dropdownToggle.contains(event.target)) {
      this.isDropdownOpen = false;
    }

    // Existing menu close logic
    if (navbarCollapse && navbarToggler && 
        !navbarCollapse.contains(event.target) && 
        !navbarToggler.contains(event.target) &&
        navbarCollapse.classList.contains('show')) {
      this.closeMenu();
    }
  }
  
  // Close the mobile menu
  closeMenu() {
    const navbarCollapse = document.getElementById('navbarTogglerDemo02');
    if (navbarCollapse?.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler') as HTMLElement;
      if (toggler) {
        toggler.click();
      }
    }
    // Close dropdown when menu closes
    this.isDropdownOpen = false;
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }

  // Toggle menu
  toggleMenu() {
    if (this.bsCollapse) {
      if (document.getElementById('navbarTogglerDemo02')?.classList.contains('show')) {
        this.bsCollapse.hide();
      } else {
        this.bsCollapse.show();
      }
    }
  }

  // Add new method to toggle dropdown
  toggleDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle dropdown state
    this.isDropdownOpen = !this.isDropdownOpen;
    
    // Get dropdown menu element
    const dropdownMenu = (event.target as HTMLElement)
      .closest('.dropdown')
      ?.querySelector('.dropdown-menu');
    
    if (dropdownMenu) {
      if (this.isDropdownOpen) {
        dropdownMenu.classList.add('show');
      } else {
        dropdownMenu.classList.remove('show');
      }
    }
  }

  isCountryEnabled(countryCode: string): boolean {
    return true; // Enable all countries
  }

  handleCountryClick(event: Event, countryCode: string) {
    this.closeMenu();
  }
}
