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
  showTooltip = true;
  
  // Chatbot related properties
  showChatbot = false;
  userMessage = '';
  chatMessages: ChatMessage[] = [];
  showQuickQuestions = true; // Show quick questions by default
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

    // Hide tooltip after 1 minute
    setTimeout(() => {
      this.showTooltip = false;
    }, 60000); // 60000 milliseconds = 1 minute
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
  
  // Method to handle quick question selection
  selectQuickQuestion(question: string) {
    this.userMessage = question;
    this.sendMessage();
    this.showQuickQuestions = false; // Hide quick questions after selection
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
// for production
    // https://madhavoverseas.co.in/ClientSync/chat

    // for local
    // http://localhost:8000/chat

    this.http.post('https://madhavoverseas.co.in/ClientSync/chat', { query: userQuery }, { responseType: 'text' })
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
        setTimeout(() => this.scrollToBottom(), 100);
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
