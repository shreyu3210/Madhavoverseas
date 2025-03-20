import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  email: string = "dir.madhavoverseas@gmail.com";
  phone: string = "+91-7778832033";
  address: string = "201, Sangath Mall-1, Motera, Ahmedabad, Gujarat 382424";

  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58733.57115788828!2d72.5425265!3d23.0660263!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x63f0e018affc3ea5%3A0x939e94e0a99d7ba0!2sMadhav%20Overseas!5e0!3m2!1sen!2sin!4v1697184834074!5m2!1sen!2sin'
    );
  }

  submitForm() {
    console.log("Form submitted:", this.contact);
    alert("Thank you for contacting us!");
  }
}
