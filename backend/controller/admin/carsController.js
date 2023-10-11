import carSchema from "../../models/carOwner/car.js";
import { transporter } from "../../utils/utils.js";

export const carList = async (req, res) => {
  try {
    console.log("cars list");
    const data = (await carSchema.find()) ?? [];
    return res.json({ message: "success", carsData: data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const carApproved = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carSchema.updateOne(
      { _id: id },
      { $set: { status: "Approved" } }
    );
    const { ownerId } = await carSchema.findOne({ _id: id }).populate('ownerId') 
    console.log(ownerId.email,'emaillll')
    if (result.modifiedCount > 0) {
      var mailOptions = {
        to: ownerId.email,
        subject: "Car Registration Approval",
        html:
          "<h3>Congratulations! </h3>" +
          "<h1 style='font-weight:bold;'>We are pleased to inform you that your car registration has been approved. Your car is now successfully registered with us. </h1>" +
          "<p>Thank you for choosing our services.</p>" +
          "<p>Best regards,</p>" +
          "<p><a href='http://www.RentMyRide.com'>www.RentMyRide.com</a></p>",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res
            .status(500)
            .json({
              message: "Email sending encountered an error",
              error: true,
            });
        }

        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ message: "Email sent successfully" });
      });
      return res.json({ message: "Success" });
    }
    return res.status(404).json({ message: "Car not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const carRejected = async (req, res) => {
  try {
    const id = req.params.id;
    const message = req.params.message;
    console.log(message, req.params);
    const result = await carSchema.updateOne(
      { _id: id },
      { $set: { status: "Rejected" } }
    );
    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res.status(404).json({ message: "Car not found", error: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
