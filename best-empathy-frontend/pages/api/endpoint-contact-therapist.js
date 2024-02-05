import Mailjet from "node-mailjet";

export default function handler(req, res) {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const { name, email, phoneNumber, message, therapist_email_address } =
    req.body;

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "support@ikemdigital.com",
          Name: `Best Empathy Mail`,
        },
        To: [
          {
            Email: therapist_email_address,
            Name: "Therapist_Name",
          },
        ],
        Subject: `You have a new email from ${name} at ${email}`,
        TextPart: `They wrote to you: ${message}`,
      },
    ],
  });

  request
    .then((result) => {
      if (result.response.status == 200) {
        console.log("Successfully Sent Email");
        res.status(200).json({ message: "Successfully Sent Email" });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(err.statusCode);
      console.log("Something Went Wrong Sending Email");
      res.status(500).json({ message: "Something Went Wrong Sent Email" });
    });
}
