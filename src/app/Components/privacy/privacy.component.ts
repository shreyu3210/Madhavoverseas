import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void => *', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('expandCollapse', [
      state('void', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', [
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void <=> *', [
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s {{delay}}ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })),
      ], { params: { delay: 0 } })
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.5s {{delay}}ms ease-out', 
          style({ opacity: 1, transform: 'translateX(0)' })),
      ], { params: { delay: 0 } })
    ])
  ]
})
export class PrivacyComponent implements OnInit {
  @ViewChild('shareUrlInput')shareUrlInput!: ElementRef;
  
  // Table of Contents
  tocSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'interpretation', title: 'Interpretation and Definitions' },
    { 
      id: 'personal-data', 
      title: 'Collecting and Using Your Personal Data',
      subsections: [
        { id: 'types-data', title: 'Types of Data Collected' },
        { id: 'third-party', title: 'Third-Party Social Media' },
        { id: 'tracking', title: 'Tracking Technologies' },
        { id: 'use-data', title: 'Use of Your Personal Data' }
      ]
    },
    { id: 'data-management', title: 'Data Management' },
    { id: 'additional-info', title: 'Additional Information' },
    { id: 'contact', title: 'Contact Us' }
  ];

  // Section expansion state
  expandedSections = {
    interpretation: true,
    personalData: true,
    dataManagement: false,
    additionalInfo: false
  };

  // Info cards expansion state
  expandedInfoCards = {
    children: false,
    links: false,
    changes: false
  };

  // Social media services
  socialMediaServices = ['Google', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn'];

  // Cookie types
  cookieTypes = [
    {
      title: 'Necessary / Essential Cookies',
      type: 'Session Cookies',
      admin: 'Us',
      purpose: 'These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts.'
    },
    {
      title: 'Cookies Policy / Notice Acceptance Cookies',
      type: 'Persistent Cookies',
      admin: 'Us',
      purpose: 'These Cookies identify if users have accepted the use of cookies on the Website.'
    },
    {
      title: 'Functionality Cookies',
      type: 'Persistent Cookies',
      admin: 'Us',
      purpose: 'These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference.'
    }
  ];

  // Data uses
  dataUses = [
    {
      title: 'To provide and maintain our Service',
      description: 'including to monitor the usage of our Service.'
    },
    {
      title: 'To manage Your Account',
      description: 'to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.'
    },
    {
      title: 'For the performance of a contract',
      description: 'the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.'
    },
    {
      title: 'To contact You',
      description: 'To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.'
    },
    {
      title: 'To provide You',
      description: 'with news, special offers and general information about other goods, services and events which we offer.'
    }
  ];

  // UI state
  showBackToTop = false;
  isSticky = false;
  showCookieConsent = true;
  showCookieDetails = false;
  shareUrl = 'https://madhavoverseas.co.in/#/privacy-policy';
  copied = false;
  toastMessage = '';
  currentYear = new Date().getFullYear();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Check if cookies were already accepted
    this.checkCookieConsent();
    
    // Initialize animations for sections that should be visible on load
    setTimeout(() => {
      this.observeSections();
    }, 100);

    // Initialize Bootstrap components
    this.initializeBootstrapComponents();
  }

  // Check if cookies were already accepted
  private checkCookieConsent(): void {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      this.showCookieConsent = false;
    }
  }

  // Initialize Bootstrap components (would normally be done with proper imports)
  private initializeBootstrapComponents(): void {
    // This is a placeholder - in a real Angular app, you would import the Bootstrap JS
    console.log('Bootstrap components would be initialized here');
  }

  // Toggle section expansion
  toggleSection(section: string): void {
    // this.expandedSections[section] = !this.expandedSections[section];
  }

  // Toggle info card expansion
  toggleInfoCard(card: string): void {
    // this.expandedInfoCards[card] = ! this.expandedInfoCards[card];
  }

  // Scroll to section
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll to top
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Accept cookies
  acceptCookies(): void {
    this.showCookieConsent = false;
    localStorage.setItem('cookiesAccepted', 'true');
    this.showToast('Cookie preferences saved successfully!');
  }

  // Reject cookies
  rejectCookies(): void {
    this.showCookieConsent = false;
    localStorage.setItem('cookiesAccepted', 'false');
    this.showToast('Cookies rejected. Some features may be limited.');
  }

  // Reset cookie preferences
  resetCookiePreferences(): void {
    localStorage.removeItem('cookiesAccepted');
    this.showCookieConsent = true;
    this.showToast('Cookie preferences reset. Please choose your preference.');
  }

  // Print privacy policy
  printPrivacyPolicy(): void {
    window.print();
  }

  // Download privacy policy as PDF
  downloadPrivacyPolicy(): void {
    // In a real implementation, this would generate a PDF
    this.showToast('Privacy Policy PDF downloaded successfully!');
  }

  // Share privacy policy
  sharePrivacyPolicy(): void {
    // In a real implementation, this would open a modal
    this.showToast('Opening share options...');
    // Simulate opening a modal
    const modal = document.getElementById('shareModal');
    // In a real app, you would use Bootstrap's modal methods
    console.log('Modal would be shown here', modal);
  }

  // Share via specific platform
  shareVia(platform: string): void {
    // In a real implementation, this would share via the platform
    this.showToast(`Shared via ${platform} successfully!`);
  }

  // Copy share URL
  copyShareUrl(input: HTMLInputElement): void {
    input.select();
    document.execCommand('copy');
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
    this.showToast('URL copied to clipboard!');
  }

  // Submit contact form
  submitContactForm(): void {
    // In a real implementation, this would submit the form
    this.showToast('Your message has been sent successfully!');
  }

  // Log form interaction
  logFormInteraction(action: string): void {
    console.log('Form interaction:', action);
  }

  // Show toast message
  showToast(message: string): void {
    this.toastMessage = message;
    // In a real app, you would use Bootstrap's toast methods
    console.log('Toast would be shown with message:', message);
  }

  // Observe sections for animation
  private observeSections(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.section-animate');
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Listen for scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show/hide back to top button
    this.showBackToTop = window.pageYOffset > 300;
    
    // Make TOC sticky
    this.isSticky = window.pageYOffset > 100;
  }
}