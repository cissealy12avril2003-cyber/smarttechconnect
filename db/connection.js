const mysql = require('mysql');

// Configuration de la connexion à MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',            // Laisse vide par défaut sous XAMPP
    database: 'smarttechconnect' // CORRIGÉ : Nom exact trouvé sur ta capture
});

// Test de connexion
db.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données :', err.message);
        return;
    }
    console.log('✅ Connexion à la base de données réussie !');
});

module.exports = db;