const app = require('./src/app');
app.listen(app.get('port'), () => {
    console.log("Servidor escuchando el puerto: ", app.get("port"));
});