import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  carouselImages = [
    { src: "assets/images/c1.jpg", alt: "World Attractions 1" },
    { src: "assets/images/new.png", alt: "World Attractions 2" },
    { src: "assets/images/4.jpg", alt: "World Attractions 3" }
  ];
  showMore = false;
  destinations = [
    // { country: "USA", image: "assets/images/usa.jpg", description: "Studying in the United States is a popular choice for international students due to its world-class universities, diverse academic programs, and cultural opportunities." },
    // { country: "Canada", image: "assets/images/ca-1.png", description: "Studying in Canada is a popular choice for international students due to its high-quality education system, cultural diversity, and beautiful landscapes." },
    { country: "Australia", image: "assets/images/sydney.jpg", description: "Studying in Australia can be a rewarding experience, as the country is known for its high-quality education system, diverse culture, and beautiful landscapes." },
    { country: "UK", image: "assets/images/uk.jpg", description: "Studying in the United Kingdom (UK) is a popular choice for international students due to its prestigious universities, diverse cultural experiences, and the English language of instruction." }
  ];
  reviews = [
    {
      name: "Rohan Patel",
      text: "Excellent service provided by Madhav Overseas. Highly recommended!",
      link: "https://g.page/r/CaB7nanglJ6TEB0/review"
    },
    {
      name: "Himani Vyas",
      text: "Best guidance and support for students going abroad. Thank you!",
      link: "https://g.page/r/CaB7nanglJ6TEB0/review"
    },
    {
      name: "Rishit Modi",
      text: "A fantastic experience! My student visa process was seamless.",
      link: "https://g.page/r/CaB7nanglJ6TEB0/review"
    },
    {
      name: "Hetansh Joshi",
      text: "Great service and consultation for studying abroad. Highly satisfied!",
      link: "https://g.page/r/CaB7nanglJ6TEB0/review"
    }
  ];

  animatedStats: { label: string, value: number, target: number }[] = [];

  stats = [
    { label: "Happy Customers", value: 750 },
    { label: "Collaborations", value: 1680 },
    { label: "Reviews", value: 812 },
    { label: "Awards", value: 100 }
  ];

  ngOnInit() {

    let carousel = document.querySelector('#carouselExample');
    if (carousel) {
      (carousel as any).setAttribute('data-bs-interval', '3000'); 
    }

    this.animateNumbers();
  }

  ngAfterViewInit() {
    this.addSwipeSupport();
  }

  animateNumbers() {
    this.animatedStats = this.stats.map(stat => ({
      label: stat.label,
      value: 0,
      target: stat.value
    }));

    this.animatedStats.forEach((stat, index) => {
      let increment = Math.ceil(stat.target / 100);
      let currentValue = 0;

      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(interval);
        }
        this.animatedStats[index].value = currentValue;
      }, 10);
    });
  }

  toggleReadMore() {
    this.showMore = !this.showMore;
  }

  onSearch() {
    console.log("Search button clicked");
  }

  // ✅ Add swipe support for testimonials
  
  addSwipeSupport() {
    if (!this.carousel) return;

    let startX = 0;
    let endX = 0;
    const threshold = 50; // Minimum swipe distance

    const carouselElement = this.carousel.nativeElement;

    carouselElement.addEventListener('touchstart', (event: TouchEvent) => {
      startX = event.touches[0].clientX;
    });

    carouselElement.addEventListener('touchend', (event: TouchEvent) => {
      endX = event.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  handleSwipe(startX: number, endX: number) {
    const carouselElement = this.carousel.nativeElement;
    if (!carouselElement) return;

    if (startX - endX > 50) {
      (window as any).bootstrap.Carousel.getOrCreateInstance(carouselElement).next();
    } else if (endX - startX > 50) {
      (window as any).bootstrap.Carousel.getOrCreateInstance(carouselElement).prev();
    }
  }
}
