// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 8080;

// Middleware para parsear el JSON
app.use(bodyParser.json());

// Ruta para eliminar un club
app.delete('/deleteClub', (req, res) => {
    const { nick, contrasenia } = req.body;

    // Lee el archivo JSON
    fs.readFile('bsdt.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo.');
        }

        const jsonData = JSON.parse(data);
        const clubIndex = jsonData.clubs.findIndex(club => club.nick === nick && club.contrasenia === contrasenia);

        if (clubIndex === -1) {
            return res.status(404).send('El club no existe o las credenciales son incorrectas.');
        }

        // Elimina el club
        jsonData.clubs.splice(clubIndex, 1);

        // Escribe de nuevo el archivo JSON
        fs.writeFile('bsdt.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al escribir el archivo.');
            }
            res.send('Club eliminado exitosamente.');
        });
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
