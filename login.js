// Obtenemos el formulario y el div con sus respectivos ID´s
var form = document.getElementById('login-form');
var response = document.getElementById('response');

// Monitoreamos los eventos del formulario para saber cuando hacen un submit
form.addEventListener('submit', function(event){
    
    // Se detienen las acciones por defecto del formulario al hacer submit
    event.preventDefault();

    // Obtenemos los datos ingresados en los campos del formulario
    var userData = new FormData(form);

    // Validamos el email
    if (!validEmail(userData.get('email'))) {
        borderedBox(0, 1);
        showResponse(1, 'Introduce una dirección de correo electrónico válida');
        return false;
    } else {
        borderedBox(0, 0);
    }

    // Validamos la contraseña
    if (emptyInput(userData.get('password'))) {
        borderedBox(1, 1);
        showResponse(1, 'Introduce una contraseña');
        return false;
    } else {
        borderedBox(1, 0);
    }

    // Usamos el método Fetch API para enviar al servidor los datos de usuario a verificar
    fetch('verify-user.php', {
        method: 'POST',
        body: userData
    })
    .then(res => res.json())
    .then(data => {
        if (data === 'logedin') {
            form.reset();
            borderedBox(0, 2);
            borderedBox(1, 2);
            showResponse(0, 'Logeado con éxito');
            // Redirigir a la página home.html
            location.href = "home.html";  // Redirección aquí
        } else {
            borderedBox(0, 2);
            borderedBox(1, 2);
            showResponse(1, data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showResponse(1, 'Hubo un problema con la solicitud.');
    });
});
