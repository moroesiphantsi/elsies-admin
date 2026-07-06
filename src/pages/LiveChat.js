import React, { useState } from "react";
import "./LiveChat.css";

import {
FaRobot,
FaPaperPlane,
FaWhatsapp,
FaBolt,
FaQuoteRight,
FaPrint,
FaTshirt
} from "react-icons/fa";

function LiveChat() {

const [message, setMessage] = useState("");

const [typing, setTyping] = useState(false);

const [messages, setMessages] = useState([
{
text: "👋 Welcome to Elsies Print & Embroidery. I'm your AI Assistant. I can help with quotations, printing, embroidery, branding, delivery information and general enquiries.",
type: "ai",
time: new Date().toLocaleTimeString()
}
]);

const getAIResponse = (text) => {


text = text.toLowerCase();

if (text.includes("quote") || text.includes("price") || text.includes("cost")) {
  return `To prepare a quotation please provide:


• Product Type
• Quantity Required
• Printing or Embroidery
• Design Requirements
• Preferred Delivery Date

You can also request a quotation on WhatsApp.`;
}


if (text.includes("embroidery")) {
  return `Premium Embroidery Services:


✓ Caps
✓ Uniforms
✓ Jackets
✓ Corporate Clothing
✓ School Wear
✓ Custom Logos`;
}


if (text.includes("printing")) {
  return `Professional Printing Services:


✓ T-Shirts
✓ Hoodies
✓ Business Cards
✓ Flyers
✓ Posters
✓ Banners
✓ Promotional Material`;
}


if (text.includes("branding")) {
  return `Corporate Branding Solutions:


✓ Company Clothing
✓ Vehicle Branding
✓ Promotional Products
✓ Logo Design
✓ Business Identity Packages`;
}


if (text.includes("delivery")) {
  return `Delivery depends on location and order size.


For delivery enquiries contact:

+27 82 718 7044`;
}


if (text.includes("hours")) {
  return `Business Hours


Monday - Friday
08:00 - 17:00

Saturday
Closed

Sunday
Closed`;
}


if (text.includes("hello") || text.includes("hi")) {
  return "Hello 👋 Welcome to Elsies Print & Embroidery. How may I assist you today?";
}

return `Thank you for contacting Elsies Print & Embroidery.


I can assist with:

• Quotations
• Embroidery
• Printing
• Branding
• Delivery Information

Please tell me more about your requirements.`;
};

const sendMessage = () => {


if (!message.trim()) return;

const userMessage = {
  text: message,
  type: "user",
  time: new Date().toLocaleTimeString()
};

setMessages(prev => [...prev, userMessage]);

const currentMessage = message;

setMessage("");

setTyping(true);

setTimeout(() => {

  const aiMessage = {
    text: getAIResponse(currentMessage),
    type: "ai",
    time: new Date().toLocaleTimeString()
  };

  setMessages(prev => [...prev, aiMessage]);

  setTyping(false);

}, 1200);


};

return ( <div className="livechat-page">


  <section className="chat-hero">

    <h1>AI Customer Support Center</h1>

    <p>
      Get instant assistance from Elsies Print & Embroidery
    </p>

  </section>

  <div className="chat-stats">

    <div>
      <h3>24/7</h3>
      <p>AI Support</p>
    </div>

    <div>
      <h3>1 Min</h3>
      <p>Response Time</p>
    </div>

    <div>
      <h3>100%</h3>
      <p>Customer Focus</p>
    </div>

  </div>

  <div className="chat-card">

    <div className="chat-top">

      <FaRobot className="robot-icon" />

      <div>

        <h2>Elsies AI Assistant</h2>

        <p>Online • Smart Support</p>

      </div>

    </div>

    <div className="ai-tools">

      <button onClick={() => setMessage("I need a quotation")}>
        <FaQuoteRight />
        Quote
      </button>

      <button onClick={() => setMessage("Embroidery services")}>
        <FaTshirt />
        Embroidery
      </button>

      <button onClick={() => setMessage("Printing services")}>
        <FaPrint />
        Printing
      </button>

      <button onClick={() => setMessage("Corporate branding")}>
        <FaBolt />
        Branding
      </button>

      <button onClick={() => setMessage("Delivery information")}>
        Delivery
      </button>

      <button onClick={() => setMessage("Business hours")}>
        Hours
      </button>

    </div>

    <div className="chat-messages">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={`chat-message ${msg.type}`}
        >

          <p style={{ whiteSpace: "pre-line" }}>
            {msg.text}
          </p>

          <span>{msg.time}</span>

        </div>

      ))}

      {typing && (
        <div className="typing">
          AI Assistant is typing...
        </div>
      )}

    </div>

    <div className="chat-input">

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about printing, embroidery, branding..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />

      <button onClick={sendMessage}>
        <FaPaperPlane />
      </button>

    </div>

    <a
      href="https://wa.me/27827187044"
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp />
      Continue on WhatsApp
    </a>

  </div>

</div>


);
}

export default LiveChat;
