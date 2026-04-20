(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];
  var yearEl = document.getElementById("year");
  var form = document.getElementById("inquiry-form");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setMenuOpen(open) {
    if (!header || !toggle || !nav) return;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = !header.classList.contains("is-open");
      setMenuOpen(open);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 899px)").matches) {
        setMenuOpen(false);
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header && header.classList.contains("is-open")) {
      setMenuOpen(false);
      if (toggle) toggle.focus();
    }
  });

  function validatePhone(value) {
    var digits = value.replace(/\D/g, "");
    return digits.length >= 10;
  }

  function validateEmail(value) {
    if (!value.trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function setError(id, message) {
    var el = document.getElementById(id);
    if (el) el.textContent = message || "";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var name = document.getElementById("name");
      var phone = document.getElementById("phone");
      var email = document.getElementById("email");

      setError("name-error", "");
      setError("phone-error", "");
      setError("email-error", "");
      if (status) {
        status.textContent = "";
        status.classList.remove("success");
      }

      var ok = true;
      if (!name || !name.value.trim()) {
        setError("name-error", "Please enter your name.");
        ok = false;
      }
      if (!phone || !validatePhone(phone.value)) {
        setError("phone-error", "Enter a valid phone number (at least 10 digits).");
        ok = false;
      }
      if (email && !validateEmail(email.value)) {
        setError("email-error", "Enter a valid email or leave blank.");
        ok = false;
      }

      if (!ok) {
        if (status) status.textContent = "Please fix the fields above.";
        return;
      }

      if (status) {
        status.textContent =
          "Thank you — this is a demo form. Connect your backend or form service to capture leads.";
        status.classList.add("success");
      }
      form.reset();
    });
  }
})();
