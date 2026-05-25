export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  console.log("=========================================");
  console.log(`📧 MOCK VERIFICATION EMAIL SENT TO: ${email}`);
  console.log(`Confirmation Link: ${confirmLink}`);
  console.log("=========================================");

  return { success: true };
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;

  console.log("=========================================");
  console.log(`📧 MOCK PASSWORD RESET EMAIL SENT TO: ${email}`);
  console.log(`Reset Link: ${resetLink}`);
  console.log("=========================================");

  return { success: true };
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  console.log("=========================================");
  console.log(`📧 MOCK 2FA CODE EMAIL SENT TO: ${email}`);
  console.log(`2FA Code: ${token}`);
  console.log("=========================================");

  return { success: true };
}

export async function sendEbookEmail(email: string, orderId: string, items: any[]) {
  // In a real production environment, we would use Resend, SendGrid, or AWS SES here
  // e.g., await resend.emails.send({ ... })

  console.log("=========================================");
  console.log(`📧 MOCK EMAIL SENT TO: ${email}`);
  console.log(`Order ID: ${orderId}`);
  console.log("Subject: Your Bems Books E-book Download Links");
  console.log("Body:");
  console.log(`Thank you for your purchase from Bems Books!`);
  console.log(`Here are your secure download links:`);
  
  items.forEach((item, index) => {
    // Generate a secure, signed URL in a real app
    const secureLink = `https://bems-books.com/download/${item.id}?token=mock_secure_token_${Date.now()}`;
    console.log(`${index + 1}. ${item.title} - ${secureLink}`);
  });

  console.log("=========================================");

  return { success: true };
}
