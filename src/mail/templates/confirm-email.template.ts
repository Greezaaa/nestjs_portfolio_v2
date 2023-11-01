export function generateConfirmationEmail(confirmationCode: string, emailDomain: string): { text: string; html: string } {
    const text = `Please do not reply to this email. 
  Your confirmation code is: ${confirmationCode}
  
  Thank you for registering with us. Please enter the above code in the provided field on the website to complete your registration.
  
  Best regards,
  The ${emailDomain} Team`;
  
    const html = `<p>Please do not reply to this email.</p>
  <h3>Your confirmation code is: ${confirmationCode}</h3>
  
  <p>Thank you for registering with us. Please enter the above code in the provided field on the website to complete your registration.</p>
  
  <p>Best regards,<br>
  The ${emailDomain} Team</p>`;
  
    return { text, html };
  }
  