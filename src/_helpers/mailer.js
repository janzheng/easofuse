

import nodemailer from 'nodemailer'
import { config } from "dotenv"
config() // https://github.com/sveltejs/sapper/issues/122


// const smtpTransport = require('nodemailer-smtp-transport');


// app.use('/mailer', Mailer(smtpTransport({
//   host: app.get('smtp').host,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER, // app.get('smtp').user,
//     pass: process.env.SMTP_PASS, // app.get('smtp').pass
//   }
// })));



var transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  secure: true,
  auth: {
    user: process.env.PDSEM_SMTP_USER, // app.get('smtp').user,
    pass: process.env.PDSEM_SMTP_PASS, // app.get('smtp').pass
  }
});

var mailOptions = {
  from: "\"Seminar Signup\" <seminars@mail.phage.directory>",
  'reply-to': "\"Support\" <support@phage.directory>",
  to: 'seminars@phage.directory',
  subject: 'Sending Email using Node.js',
  html: "<h1>That was easy!</h1>",
  text: 'That was easy!'
};



export async function automailer(mailer) {

	const mailData = mailer || mailOptions

	console.log(' >>>>>> sending email w/ data >>>', process.env.PDSEM_SMTP_USER, process.env.PDSEM_SMTP_PASS)
	console.log(' >>>>>> sending email to >>>', mailData)


	transporter.sendMail(mailData, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});

	// mg.messages.create('automail.phage.directory', {
	//    from: mailOptions.from,
	//    to: ["janeazy@gmail.com"],
	//    subject: "Hello",
	//    text: "Testing some Mailgun awesomness!",
	//    html: "<h1>Testing some Mailgun awesomness!</h1>"
	//  })
	//  .then(msg => {
	//  	console.log(msg)
	// 	return Promise.resolve('a-ok!')
	//  }) // logs response data
	//  .catch(err => {
	//  	console.log(err)
	// 	return Promise.reject(err)
	//  }); // logs any error

}


