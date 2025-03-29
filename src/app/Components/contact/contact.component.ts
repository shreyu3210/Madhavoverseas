import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  email: string = "shreyu3210@gmail.com";
  phone: string = "+91-7778832033";
  address: string = "201, Sangath Mall-1, Motera, Ahmedabad, Gujarat 382424";

  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  mapUrl: SafeResourceUrl;
  isSubmitting = false;
  formSubmitted = false;
  errorMessage = '';

  constructor(
    private sanitizer: DomSanitizer,
    private emailService: EmailService
  ) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58733.57115788828!2d72.5425265!3d23.0660263!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x63f0e018affc3ea5%3A0x939e94e0a99d7ba0!2sMadhav%20Overseas!5e0!3m2!1sen!2sin!4v1697184834074!5m2!1sen!2sin'
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.formSubmitted = false;
    this.errorMessage = '';
    
    const emailData = {
      ...this.contact,
      recipientEmail: this.email // Send to your business email
    };
    
    this.emailService.sendEmail(emailData).subscribe(
      (response: any) => {
        console.log("Email sent successfully:", response);
        this.isSubmitting = false;
        this.formSubmitted = true;
        this.resetForm();
      },
      (error: any) => {
        console.error("Error sending email:", error);
        this.isSubmitting = false;
        this.errorMessage = "Failed to send email. Please try again later.";
      }
    );
  }
  
  resetForm() {
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
