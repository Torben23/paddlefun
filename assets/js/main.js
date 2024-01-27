(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };

    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', aos_init);

  // Calendario
  $(document).ready(function() {
    // Configuring the datepicker
    $("#datepicker").datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: function(dateText) {
        // When selecting a date, store it in the hidden field
        $("#date").val(dateText);
      }
    });

  // Script para enviar mensaje por WhatsApp
  function sendWhatsAppMessage() {
    var name = document.getElementById('name').value;
    var date = document.getElementById('date').value;
    var people = document.getElementById('people').value;
    var level = document.getElementById('level').value;

    // Construct the WhatsApp message with reservation information
    var whatsappMessage = "Reservation%0A%0AName: " + name + "%0ADate: " + date + "%0APeople: " + people + "%0ALevel: " + level;

    // Create the WhatsApp link
    var whatsappLink = "https://wa.me/542216062309/?text=" + encodeURIComponent(whatsappMessage);

    // Open the link in a new window/tab
    window.open(whatsappLink, "_blank");
  }

  // Add click event listener to the WhatsApp button
  on('click', '#whatsappLink', function(event) {
    // Prevenir la acción por defecto del botón (enviar el formulario)
    event.preventDefault();
    // Llamar a la función para enviar el mensaje por WhatsApp
    sendWhatsAppMessage();
  });

})();
