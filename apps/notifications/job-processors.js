const nodemailer = require("nodemailer");

async function sendMailUsingTestAccount(message) {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log("Test account created:", testAccount.user);

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw new Error("Error sending email");
  }
}

async function main() {
  try {
    const message = {
        from: 'abdulshakeer47@gmail.com',
        to: 'abdulshakeer47@gmail.com',
        subject: 'Testing Nodemailer with AWS SES ✔',
        text: 'Hello from Nodemailer with AWS SES!',
        html: '<p><b>Hello</b> from Nodemailer with AWS SES!</p>'
    };
    const result = await sendMailUsingTestAccount(message);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}

module.exports = { sendMailUsingTestAccount };
// main().catch(console.error);
