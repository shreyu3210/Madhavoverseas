import { Component } from '@angular/core';

@Component({
  selector: 'app-uk',
  templateUrl: './uk.component.html',
  styleUrls: ['./uk.component.css']
})
export class UkComponent {
 
    carouselImages = [
      { src: 'assets/images/UK/coventry.png', alt: 'Image 1' },
      { src: 'assets/images/UK/carousel_1.png', alt: 'Image 2' },
      { src: 'assets/images/UK/carousel_1.png', alt: 'Image 3' }
    ];
    
    activeIndex = 0;
  
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.carouselImages.length;
    }
  
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    }
  
    setActiveSlide(index: number) {
      this.activeIndex = index;
    }
  }
  

