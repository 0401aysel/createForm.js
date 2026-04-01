# CreateForm.js

A lightweight JavaScript module to dynamically generate and validate forms, including text, email, and phone inputs with prefixes.

## Installation

Simply include the module in your project. For example, if using npm:

```bash
npm install createform-js

Usage

1. Add a container in your HTML

<div id="registerForm"></div>


2. Import and use the module in your JS file

For example, in main.js:

import CreateForm from 'createForm-js';

(async () => {
  try {
    // Initialize the form
    let formData = await CreateForm({
      target: "#registerForm",
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "surname", label: "Surname", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "phone",
          label: "Phone",
          type: "phone",
          prefix: "+994",
          options: ["50", "51", "55", "70", "77"],
          default: "51",
          required: true
        }
      ]
    });

    console.log("Form submitted successfully:", formData);

    // Example API call
    let response = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

  } catch (err) {
    console.log("Form validation failed or API error", err);
  }
})();
```

## Features

Dynamic form generation
Phone input with selectable prefix
Email and text validation
Returns a Promise with form data on successful submission

## Notes

You can customize the fields array to add more inputs.
Ensure the container ID in your HTML matches the target selector.
Handles validation automatically and returns an object with the input values.
