import MailDev from "maildev";

const maildev = new MailDev({
  smtp: 1025, // SMTP will listen on port 1025
  web: 1080,  // Web interface will be available on port 1080
});

maildev.listen((err: any) => {
  if (err) {
    console.error("Error starting MailDev:", err);
    process.exit(1);
  }
  console.log("MailDev is running! SMTP on port 1025 and web interface on port 1080.");
});
