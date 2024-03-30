const { ownerWelcomeMailTemplate } = require("../../notifications/notification-template/template");
const { sendMailUsingTestAccount } = require("../job-processors");

exports.ownerWelcomeMail = async(email,password) => {
    const emailTemplate = ownerWelcomeMailTemplate(email,password);
    await sendMailUsingTestAccount({
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html
    });
}
