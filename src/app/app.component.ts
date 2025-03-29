import { HostListener, Component, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { initFacebookPixel } from './facebookpixel';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Madhavoverseas';
  showScrollButton = false;
  
  // Chatbot related properties
  showChatbot = false;
  userMessage = '';
  chatMessages: ChatMessage[] = [];
  @ViewChild('chatMessagesRef') chatMessagesContainer!: ElementRef;
  
  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Initialize with a welcome message
    this.chatMessages.push({
      text: 'Hello! How can I help you with Madhav Overseas today?',
      sender: 'bot'
    });
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200; // Show button after scrolling 200px
  }

  scrollToTop() {
    this.smoothScrollToTop();
  }

  private smoothScrollToTop() {
    const duration = 500; // Duration of the scroll animation in milliseconds
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
  
  // Chatbot methods
  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }
  
  sendMessage() {
    if (!this.userMessage.trim()) return;
    
    // Add user message
    this.chatMessages.push({
      text: this.userMessage,
      sender: 'user'
    });
    
    const userQuery = this.userMessage;
    this.userMessage = ''; // Clear input
    
    // Scroll to bottom of chat
    setTimeout(() => this.scrollToBottom(), 100);
    
    // Call Python API
    this.http.post('http://192.168.0.110:8000/chat', { query: userQuery }, { responseType: 'text' })
      .subscribe(response => {
        if (response) {
          this.chatMessages.push({
            text: response,
            sender: 'bot'
          });
        } else {
          this.chatMessages.push({
            text: 'No response received. Please try again.',
            sender: 'bot'
          });
        }
        setTimeout(() => this.scrollToBottom(), 100);
      }, error => {
        console.error('Error calling chatbot API:', error);
        this.chatMessages.push({
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'bot'
        });
      });
  }

  private scrollToBottom() {
    if (this.chatMessagesContainer) {
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  ngOnInit(): void {
    initFacebookPixel('1333106824560597'); // Your Pixel ID
  }
}
