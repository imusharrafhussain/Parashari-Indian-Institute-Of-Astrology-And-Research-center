/* ============================================
   FORM VALIDATION JAVASCRIPT
   ============================================ */

class FormValidator {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.validateForm(e));
    });
  }

  validateForm(e) {
    const form = e.target;
    let isValid = true;

    // Always prevent default to let custom submit handlers (auth.js) take control
    // Without this, the browser does a native GET submit that reloads the page
    e.preventDefault();

    // Get all form inputs
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showError(form, 'Please fill all required fields correctly.');
    } else {
      // Form is valid — dispatch a custom event so auth.js can handle the login
      console.log('Form is valid, dispatching to auth handler');
      form.dispatchEvent(new CustomEvent('validSubmit', { bubbles: true }));
    }
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.getAttribute('type');
    const required = field.hasAttribute('required');
    let isValid = true;

    // Remove previous error styling
    field.classList.remove('error');
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();

    // Check if field is required
    if (required && !value) {
      this.addError(field, 'This field is required');
      isValid = false;
    }

    // Validate based on type
    if (value && type === 'email' && !this.isValidEmail(value)) {
      this.addError(field, 'Please enter a valid email address');
      isValid = false;
    }

    if (value && type === 'tel' && !this.isValidPhone(value)) {
      this.addError(field, 'Please enter a valid phone number');
      isValid = false;
    }

    if (value && type === 'number') {
      if (isNaN(value)) {
        this.addError(field, 'Please enter a valid number');
        isValid = false;
      }
    }

    // Validate password strength if password field
    if (value && field.getAttribute('data-password-check') === 'true') {
      if (value.length < 8) {
        this.addError(field, 'Password must be at least 8 characters');
        isValid = false;
      }
    }

    // Check password match
    if (field.getAttribute('data-match')) {
      const matchFieldId = field.getAttribute('data-match');
      const matchField = document.getElementById(matchFieldId);
      if (value !== matchField.value) {
        this.addError(field, 'Passwords do not match');
        isValid = false;
      }
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  addError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
  }

  showError(form, message) {
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-error';
    errorAlert.textContent = message;
    form.insertBefore(errorAlert, form.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
      errorAlert.remove();
    }, 5000);
  }

  submitForm(form) {
    // Add your form submission logic here
    console.log('Submitting form:', form);
    // Example: Send data via AJAX
    // const formData = new FormData(form);
    // fetch('/api/submit', { method: 'POST', body: formData })
    //   .then(response => response.json())
    //   .then(data => console.log('Success:', data));
  }
}

// Initialize form validator on page load
document.addEventListener('DOMContentLoaded', function () {
  new FormValidator();
});

// Add styling for form errors
const style = document.createElement('style');
style.textContent = `
  .form-control.error {
    border-color: #dc3545;
    background-color: #fff5f5;
  }

  .error-message {
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 4px;
    display: block;
  }

  .alert {
    padding: 12px 16px;
    border-radius: 4px;
    margin-bottom: 16px;
    font-weight: 500;
  }

  .alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .alert-warning {
    background-color: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  }

  .alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }
`;
document.head.appendChild(style);
