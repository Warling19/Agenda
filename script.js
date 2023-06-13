document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contact-form");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const telefonoInput = document.getElementById("telefono");

  fetchContactList();

  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const telefono = telefonoInput.value;

    const nuevoContacto = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono
    };

    saveContact(nuevoContacto);

    nombreInput.value = "";
    apellidoInput.value = "";
    telefonoInput.value = "";
  });

  function fetchContactList() {
    fetch("https://railway-node-express-production-3b13.up.railway.app/scrape", {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        displayContactList(data);
      })
      .catch(function(error) {
        console.log("Error de red: ", error);
      });
  }

  function displayContactList(contacts) {
    const contactsList = document.getElementById("contacts");
    contactsList.innerHTML = "";

    contacts.forEach(function(contact) {
      const listItem = document.createElement("li");
      listItem.textContent = contact.nombre + " " + contact.apellido + " - " + contact.telefono;
      contactsList.appendChild(listItem);
    });
  }

  function saveContact(contact) {
    fetch("https://railway-node-express-production-3b13.up.railway.app/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    })
      .then(function(response) {
        if (response.ok) {
          fetchContactList();
        } else {
          console.log("Error al guardar el contacto");
        }
      })
      .catch(function(error) {
        console.log("Error de red: ", error);
      });
  }
});