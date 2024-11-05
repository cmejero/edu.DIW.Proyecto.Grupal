function iniciarSesion() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nick = document.getElementById('nick').value;
        const contrasenia = document.getElementById('contrasena').value;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'bsdt.json', true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);

                    // Buscar usuario y contraseña en los datos JSON
                    const club = data.clubs.find(club => club.nick === nick && club.contrasenia === contrasenia);

                    if (club) {
                        alert('Bienvenido al club!');
                    } else {
                        alert('El club no existe o las credenciales son incorrectas.');
                    }
                } catch (error) {
                    alert('Error al procesar los datos JSON.');
                }
            } else {
                alert('Error al cargar los datos.');
            }
        };

        xhr.onerror = function() {
            alert('Error en la conexión al servidor.');
        };

        xhr.send();
    });
}

// Inicializar la función al cargar la página
window.onload = iniciarSesion;



