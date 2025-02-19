!(function (e, t) {
  // UMD Pattern for module loading (CommonJS, AMD, Global)
  if ("object" == typeof exports && "object" == typeof module) {
    // CommonJS
    module.exports = t();
  } else if ("function" == typeof define && define.amd) {
    // AMD
    define([], t);
  } else if ("object" == typeof exports) {
    // Node.js or other CommonJS environments
    exports.SimpleLibrary = t();
  } else {
    // Browser Global (window object)
    e.SimpleLibrary = t();
  }
})(this, () => {
  "use strict";

  // Define components
  const SimpleLibrary = {
    H1: function H1(text = "") {
      return text;
    },

    Button: function Button() {
      return `<button class="btn">Submit</button>`;
    },

    InputBox: function InputBox(
      type = "text",
      name = "",
      placeholder = "Enter text here...",
      id = ""
    ) {
      return `<input type="${type}" name="${name}" class="input-box" placeholder="${placeholder}" id="${id}"/>`;
    },

    InputTextBox: function InputTextBox(
      type = "text",
      placeholder = "Enter your message here..."
    ) {
      return `<textarea class="input-box" placeholder="${placeholder}"></textarea>`;
    },

    // Form component that auto-renders when added to a container with class 'simple-form'
    Form: function Form() {
      return `
        <form class="simple-form">
          <label for="email">Email:</label>
          ${SimpleLibrary.InputBox("email", "email", "Enter your email")}
          <label for="subject">Subject:</label>
          ${SimpleLibrary.InputBox("text", "subject", "Enter the subject")}
          <label for="message">Message:</label>
          ${SimpleLibrary.InputTextBox("Enter your message here...")}
          ${SimpleLibrary.Button()}
        </form>
      `;
    },

    BookDemoForm: function BookDemoForm() {
      // Get today's date in the format YYYY-MM-DD
      const today = new Date();
      const day = String(today.getDate() + 1).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;

      return `
        <div class="demo-form-container">
          <form class="demo-form">
            <h2>Schedule a Demo</h2>
            
            <!-- Date and Time Slot Section -->
            <div class="date-slot">
              <label for="date">Select a Date:</label>
              <input type="date" id="date" name="date" required min="${formattedDate}">
      
              <label for="time-slot">Available Time Slots:</label>
              <div class="time-slots" id="time-slots">
                <!-- Time slots will be added dynamically here -->
              </div>
            </div>
      
            <!-- User Details Section -->
            <div class="user-details">
              <label for="name">Name:</label>
              ${SimpleLibrary.InputBox("text", "name", "Enter your name")}
      
              <label for="company">Company:</label>
              ${SimpleLibrary.InputBox("text", "company", "Enter your company")}
      
              <label for="email">Email:</label>
              ${SimpleLibrary.InputBox("email", "email", "Enter your email")}
      
              <label for="phone">Phone:</label>
              ${SimpleLibrary.InputBox(
        "number",
        "phone",
        "Enter your phone number"
      )}

              <!-- Selected Time Slot -->
              <div class="selected-time">
                <label for="selected-time">Selected Time Slot:</label>
                <input type="text" id="selected-time" name="selected-time" placeholder="Selected Time Slot" readonly />
              </div>

            </div>
      
            <!-- Submit Button -->
            ${SimpleLibrary.Button()}
          </form>
        </div>
      `;
    },

    initialize: function () {
      // Form Logic
      const formContainers = document.querySelectorAll(
        ".simple-form-container"
      );
      formContainers.forEach((container) => {
        container.innerHTML = SimpleLibrary.Form();
      });
      formContainers.forEach((form) => {
        form.addEventListener("submit", async (event) => {
          event.preventDefault();

          const email = form.querySelector('input[name="email"]').value;
          const subject = form.querySelector('input[name="subject"]').value;
          const message = form.querySelector("textarea").value;

          // Simple validation
          if (!email || !subject || !message) {
            alert("Please fill out all fields.");
            return; // Stop form submission if validation fails
          }

          console.log("Form Submitted with the following values:");
          console.log("Email:", email);
          console.log("Subject:", subject);
          console.log("Message:", message);

          const formData = {
            email: email,
            subject: subject,
            message: message,
          };

          // Send the email using the API (adjust URL and endpoint as needed)
          try {
            const response = await fetch('https://cdn-nodemailer.vercel.app/api/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
              alert('Email sent successfully!');
            } else {
              alert(`Error: ${result.message}`);
            }
          } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your email.');
          }
        });
      });

      // schedule Logic
      const scheduleContainer = document.querySelectorAll(
        ".simple-schedule-container"
      );
      scheduleContainer.forEach((container) => {
        container.innerHTML = SimpleLibrary.BookDemoForm();
      });

      const timeSlotsContainer = document.getElementById("time-slots");

      timeSlotsContainer.innerHTML = "";

      const availableSlots = [
        "11:00 AM - 12:00 PM",
        "12:10 PM - 1:10 PM",
        "1:20 PM - 2:20 PM",
        "2:30 PM - 3:30 PM",
        "3:40 PM - 4:40 PM",
      ];

      document.querySelector("#date").addEventListener("change", (e) => {
        e.preventDefault();

        timeSlotsContainer.innerHTML = "";

        availableSlots.forEach((slot) => {
          const slotButton = document.createElement("button");
          slotButton.type = "button";
          slotButton.className = "time-slot";
          slotButton.textContent = slot;

          // Event listener for time slot selection
          slotButton.addEventListener("click", function () {
            // Remove 'selected' class from all buttons
            const allButtons =
              timeSlotsContainer.querySelectorAll(".time-slot");
            allButtons.forEach((button) => button.classList.remove("selected"));

            // Add 'selected' class to clicked button
            slotButton.classList.add("selected");

            // Update the selected time slot in the input field (using `value`)
            document.getElementById("selected-time").value = slot; // Use `value` to set the input content
          });

          timeSlotsContainer.appendChild(slotButton);
        });
      });

      document.querySelectorAll(".demo-form-container").forEach((container) => {
        container.addEventListener("submit", (e) => {
          e.preventDefault();

          const email = container.querySelector('input[name="email"]').value.trim();
          const name = container.querySelector('input[name="name"]').value.trim();
          const company = container.querySelector('input[name="company"]').value.trim();
          const phone = container.querySelector('input[name="phone"]').value.trim();
          const selected_time = container.querySelector('input[name="selected-time"]').value.trim();

          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email || !emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
          }

          // Name validation
          if (!name) {
            alert("Please enter your name.");
            return;
          }

          // Company validation
          if (!company) {
            alert("Please enter your company name.");
            return;
          }

          // Phone validation (Only numbers, 10-digit format for most cases)
          const phoneRegex = /^\d{10}$/;
          if (!phone || !phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
          }

          // Time slot validation
          if (!selected_time) {
            alert("Please select a time slot.");
            return;
          }

          console.log("Form submitted successfully!");
          console.log("Email:", email);
          console.log("Name:", name);
          console.log("Company:", company);
          console.log("Phone:", phone);
          console.log("Selected Time:", selected_time);

        });
      });

      const h1Elements = document.querySelectorAll(".simple-h1-red");
      h1Elements.forEach((h1) => {
        h1.style.color = "red"; // Apply the red color style
        h1.textContent = h1.textContent; // Set the content of the h1 element
      });
    },
  };

  // Expose the library globally (window.SimpleLibrary)
  if (typeof window !== "undefined") {
    window.SimpleLibrary = SimpleLibrary;
    window.addEventListener("load", SimpleLibrary.initialize);
  }

  return SimpleLibrary;
});
