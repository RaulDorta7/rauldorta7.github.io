const DOM = {
    formulario: document.getElementById("formulario"),
    username: document.getElementById("NombreUsuario"),
    contraseña: document.getElementById("Contrasena"),
    nombre: document.getElementById("Nombre"),
    apellido: document.getElementById("Apellidos"),
    telefono: document.getElementById("Telefono"),
    codigoPostal: document.getElementById("CodigoPostal"),
    tipodni: document.getElementById("TipoDocumento"),
    añonac: document.getElementById("AnioNacimiento"),
    dni: document.getElementById("DniNie"),
    tipocuenta: document.querySelector('input[name="CuentaComo"]'),
    titulo: document.getElementById("PublicacionTitulo"),
    descripcion: document.getElementById("PublicacionDescripcion"),
    hobbies: document.querySelectorAll('input[name="Aficiones"]'),

    caracteresTitulo: document.getElementById("caracteresTitulo"),
    caracteresDescripcion: document.getElementById("caracteresDescripcion"),
    mostrarPasswordCheckbox: document.getElementById("show-password"),

    mensajesValidacion: document.getElementById("mensajesValidacion"),
    listaMensajes: document.getElementById("listaMensajes")
};

DOM.formulario.addEventListener("submit", (e) => {
    let valid = true;
    listaMensajes.textContent="";

    if (DOM.username.validationMessage !== "") {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.username, "El nombre de usuario es obligatorio");
    } else {
        limpiarError(DOM.username);
        aplicarBordeVerde(DOM.username);
    }

    if (DOM.contraseña.validationMessage !== "") {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.contraseña, "La contraseña es obligatoria");
    } else {
        limpiarError(DOM.contraseña);
        aplicarBordeVerde(DOM.contraseña);
    }
    
    // Validación del campo "Nombre"
    if (DOM.nombre.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.nombre, "El nombre es obligatorio");
    } else if (DOM.nombre.validity.patternMismatch) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.nombre, "Solo se permiten letras");
    } else {
        limpiarError(DOM.nombre);
        aplicarBordeVerde(DOM.nombre);
    }

    // Validación del campo "Apellido"
    if (DOM.apellido.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.apellido, "El apellido es obligatorio");
    } else if (DOM.apellido.validity.patternMismatch) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.apellido, "Solo se permiten letras");
    } else {
        limpiarError(DOM.apellido);
        aplicarBordeVerde(DOM.apellido);
    }

    // Validación del campo "Teléfono"
    if (DOM.telefono.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.telefono, "El teléfono es obligatorio");
    } else if (DOM.telefono.validity.patternMismatch) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.telefono, "Formato de teléfono inválido");
    } else {
        limpiarError(DOM.telefono);
        aplicarBordeVerde(DOM.telefono);
    }

    // Validación del campo "Código Postal"
    if (DOM.codigoPostal.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.codigoPostal, "El código postal es obligatorio");
    } else if (!/^38/.test(DOM.codigoPostal.value)) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.codigoPostal, "El código postal debe comenzar con 38");
    } else {
        limpiarError(DOM.codigoPostal);
        aplicarBordeVerde(DOM.codigoPostal);
    }

    // Validación del campo "Tipo de DNI"
    if (DOM.tipodni.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.tipodni, "El tipo de documento es obligatorio");
    } else {
        limpiarError(DOM.tipodni);
        aplicarBordeVerde(DOM.tipodni);
    }

    // Validación del campo "Año de Nacimiento"
    if (DOM.añonac.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.añonac, "El año de nacimiento es obligatorio");
    } else {
        limpiarError(DOM.añonac);
        aplicarBordeVerde(DOM.añonac);
    }

    // Validación del campo "DNI/NIE"
    if (DOM.dni.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.dni, "El DNI es obligatorio");
    } else if (!validarDniNie()) {
        e.preventDefault();
        valid = false;
    } else {
        limpiarError(DOM.dni);
        aplicarBordeVerde(DOM.dni);
    }
    
    //Validar las aficiones
    if (!validarHobbies()) {
        e.preventDefault();
        valid = false;
    }

    // Validación de otros campos (título, descripción)
    if (DOM.titulo.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.titulo, "El título es obligatorio");
    } else {
        limpiarError(DOM.titulo);
        aplicarBordeVerde(DOM.titulo);
    }

    if (DOM.descripcion.validity.valueMissing) {
        e.preventDefault();
        valid = false;
        mostrarError(DOM.descripcion, "La descripción es obligatoria");
    } else {
        limpiarError(DOM.descripcion);
        aplicarBordeVerde(DOM.descripcion);
    }

    
    
    // Si no el formulario no es válido no se envia
    if (!valid) {
        e.preventDefault();
    }
});

// Función para mostrar el error debajo del campo
export function mostrarError(campo, mensaje) {
    let errorContainer = campo.nextElementSibling;
    if (!errorContainer || !errorContainer.classList.contains('error-message')) {
        errorContainer = document.createElement('span');
        errorContainer.classList.add('error-message');
        campo.parentNode.insertBefore(errorContainer, campo.nextElementSibling);
    }
    errorContainer.textContent = mensaje;

    
    if (listaMensajes) {
        const item = document.createElement('li');
        item.textContent = campo.name + ": " + campo.validationMessage;
        listaMensajes.appendChild(item);
    }
}


// Mostrar contraseña
DOM.mostrarPasswordCheckbox.addEventListener("change", () => {
    DOM.contraseña.type = DOM.mostrarPasswordCheckbox.checked ? "text" : "password";
});

// Contadores de caracteres
DOM.titulo.addEventListener("input", () => {
    let length = DOM.titulo.value.length;
    DOM.caracteresTitulo.textContent = `${length}/15`;
});

DOM.descripcion.addEventListener("input", () => {
    let length = DOM.descripcion.value.length;
    DOM.caracteresDescripcion.textContent = `${length}/120`;
});

// Validar DNI/NIE
export function validarDniNie() {
    const dniNieInput = DOM.dni.value.toUpperCase();
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    let numero = dniNieInput.slice(0, -1);
    const letra = dniNieInput.slice(-1);

    // Convertir NIE a DNI
    if (numero[0] === "X") numero = numero.replace("X", "0");
    else if (numero[0] === "Y") numero = numero.replace("Y", "1");
    else if (numero[0] === "Z") numero = numero.replace("Z", "2");

    // Validar que los números sean válidos
    if (!/^\d+$/.test(numero)) {
        mostrarError(DOM.dni, "El DNI no es válido"); 
        return false;
    }

    // Calcular la letra correspondiente
    const resto = parseInt(numero, 10) % 23;
    const letraCalculada = letras[resto];

    if (letra !== letraCalculada) {
        mostrarError(DOM.dni, "El DNI no es válido"); 
        return false;
    }

    limpiarError(DOM.dni);  
    aplicarBordeVerde(DOM.dni); 
    return true;
}


/// Función para validar los hobbies 
export function validarHobbies() {
    const hobbiesSeleccionados = document.querySelectorAll('input[name="Aficiones"]:checked');
    const campoError = document.getElementById("error-Aficiones");

    // Verifica si se han seleccionado menos de 2 hobbies
    if (hobbiesSeleccionados.length < 2) {
        // Mostrar el mensaje de error
        campoError.classList.add('error-message');
        campoError.textContent = "Debe seleccionar al menos 2 hobbies";

        // Aplicar borde rojo a los checkboxes
        document.querySelectorAll('input[name="Aficiones"]').forEach(input => {
            input.classList.add("error-message");
        });

        return false;
    }

    // Si hay 2 o más hobbies seleccionados, limpia el mensaje de error y aplica borde verde
    campoError.textContent = "";  // Limpiar el mensaje de error
    document.querySelectorAll('input[name="Aficiones"]').forEach(input => {
        input.classList.remove("error-message");
        input.classList.add("valid");
    });

    return true;
}


// Función para limpiar el error
export function limpiarError(campo) {
    const errorContainer = campo.nextElementSibling;
    if (errorContainer && errorContainer.classList.contains('error-message')) {
        errorContainer.textContent = "";
    }
}

// Función para aplicar el borde verde cuando el campo es válido
export function aplicarBordeVerde(campo) {
    if (campo.validity.valid) {
        campo.style.border = '2px solid green';
    }
}

export function rellenarSelectAnios(selectId, currentYear, startYear) {
    const selectElement = document.getElementById(selectId);
    

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYear) {
            option.selected = true; // Marca el año actual como seleccionado por defecto
        }
        selectElement.appendChild(option);
    }
}

// Llama a la función para rellenar el select con años entre 2010 y 1920
rellenarSelectAnios('AnioNacimiento', 2010, 1920);


