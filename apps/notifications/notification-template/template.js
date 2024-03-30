
exports.ownerWelcomeMailTemplate = (email,password) => {
    const subject = `HMS Login credentials!`;
    const html = `
    <p> Dear Abdul, <br/>

    Welcome to HMS Solutions!<br/><br/>
  

    Your login details are as follows:<br/>
    ● Username: <b>${email}</b><br/>
    ● Password: <b>${password}</b><br/><br/>

    Please login through the application to bring HMS to life!<br/><br/>
    HMS Team
    </p>
    `

    return { subject, html };
}

