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
      name = '',
      placeholder = "Enter text here..."
    ) {
      return `<input type="${type}" name="${name}" class="input-box" placeholder="${placeholder}" />`;
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

    initialize: function () {
      const formContainers = document.querySelectorAll(
        ".simple-form-container"
      );
      formContainers.forEach((container) => {
        container.innerHTML = SimpleLibrary.Form();
      });
      formContainers.forEach((form) => {
        form.addEventListener("submit", (event) => {
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

          alert(
            `Form Submitted!\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
          );
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
