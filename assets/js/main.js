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

  // Calendario verggg
  // Declarar la variable picker fuera del evento DOMContentLoaded
  var picker;


  document.addEventListener("DOMContentLoaded", function () {
    // Configurar Pikaday
    picker = new Pikaday({
      field: document.getElementById('Pikaday'),
      format: 'DD/MM/YYYY', // formato de fecha deseado
      onSelect: function (selectedDate) {
        // Pikaday manejará la actualización del campo automáticamente
        // También puedes realizar acciones adicionales con la fecha seleccionada si es necesario
      }
    });
  });

  // Script para enviar mensaje por WhatsApp
  function sendWhatsAppMessage() {
    var name = document.getElementById('name').value;
    // Obtener la fecha seleccionada por Pikaday
    var date = picker.toString('DD/MM/YYYY');
    var people = document.getElementById('people').value;
    var time = document.getElementById('time').value;

  // Construct the WhatsApp message with reservation information
  var whatsappMessage = "Reservation: " + "\nName: " + name + "\nDate: " + date + "\nPeople: " + people + "\nTime: " + time;

  // Reemplazar caracteres especiales
  whatsappMessage = encodeURIComponent(whatsappMessage).replace(/%0A/g, '%0D%0A');

  // Create the WhatsApp link
  var whatsappLink = "https://wa.me/542216062309/?text=" + whatsappMessage;


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
