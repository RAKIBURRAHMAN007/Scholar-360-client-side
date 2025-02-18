import React, { useContext, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import icon from "../../assets/img/Contact us-amico.svg";
import { ThemeContext } from "../../provider/ThemeProvider";
const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    to_name: "Recipient Name", // The recipient name (can be dynamic)
    from_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log("Email sending error:", error.text);
          toast.error("Failed to send the message. Please try again.");
        }
      );

    // Clear the form after sending the email
    setFormData({
      to_name: "Recipient Name",
      from_name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-32 space-y-20">
      <h1 className="text-3xl font-semibold text-center text-[#2c3792]  mb-6">
        Contact Us
      </h1>
      <div className="md:flex justify-center items-center gap-10 border-2 w-11/12 mx-auto">
        <div className="md:w-1/3">
          <img src={icon} alt="" />
        </div>

        <div className="md:w-1/2 border-2 border-y-0 space-y-3 border-r-0 p-2 text-center">
          <h1>
            <span className="font-bold ">Name:</span> Rakibur Rahman Ratul
          </h1>
          <h1>
            <span className="font-bold">Email:</span>{" "}
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=new"
              className="underline"
            >
              ratulrakibur5@gmail.com
            </a>
          </h1>
          <h1>
            <span className="font-bold">WhatsApp:</span> 01636352751
          </h1>
          <h1>
            <span className="font-bold">Location:</span> Sylhet, Bangladesh
          </h1>
        </div>
      </div>

      <div
        className={`md:w-1/2 mx-auto shadow-xl ${
          theme === "dark" ? "bg-gray-950 text-white border" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-semibold mt-1 text-[#2c3792]  text-center mb-6">
          Send Email
        </h1>
        <form onSubmit={handleSubmit} className=" p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block ">Your Name</label>
            <input
              type="text"
              name="from_name" // Ensure this matches the placeholder in your template
              value={formData.from_name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              placeholder="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Message</label>
            <textarea
              name="message" // Ensure this matches the placeholder in your template
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              placeholder="message"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="btn bg-[#2c3792] text-white font-semibold border-[#2c3792]  border-0 border-l-2 border-b-8 border-r-4 border-t-2 md:w-48"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
