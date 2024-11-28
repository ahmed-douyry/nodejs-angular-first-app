const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');
const cors = require('cors');
app.use(cors({origin:'http://localhost:4200'}));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: '',
    database: 'GestionEtudiants'
});
app.use(express.urlencoded({ extended: true }));

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected to database')
    }
})
app.get('/api/etudiants', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const size = parseInt(req.query.size) || 6;  // Taille de la page, par défaut 6
    const offset = (page - 1) * size;  // Calcul du décalage (OFFSET)
    const search = req.query.search || ''; // Paramètre de recherche, vide si non fourni

    // Obtenir le nombre total d'étudiants en filtrant par recherche
    const searchQuery = search ? `WHERE nom LIKE '%${search}%' OR prenom LIKE '%${search}%'` : '';
    
    db.query(`SELECT COUNT(*) AS total FROM ETUDIANTS ${searchQuery}`, (err, totalRows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database query error');
        }

        const total = totalRows[0].total;  // Nombre total d'étudiants

        // Récupérer les étudiants filtrés et paginés
        db.query(
            `SELECT * FROM ETUDIANTS ${searchQuery} LIMIT ? OFFSET ?`,
            [size, offset], // Passer la taille et le décalage
            (err, rows) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Database query error');
                }

                // Formater la date de naissance pour chaque étudiant
                rows.map((row) => {
                    row.date_naissance = row.date_naissance.toISOString().split('T')[0]; // Format date (YYYY-MM-DD)
                });

                // Calculer le nombre total de pages
                const totalPages = Math.ceil(total / size);

                // Renvoyer la réponse avec les étudiants filtrés et paginés
                res.json({
                    etudiants: rows,
                    total: total,
                    totalPages: totalPages, // Nombre total de pages
                    currentPage: page       // Page actuelle
                });
            }
        );
    });
});

app.get('/api/etudiants/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    db.query(`SELECT * FROM ETUDIANTS WHERE etudiant_id  = ${id}`,(err,rows)=>{
        if(err){
            console.log(err)
            res.status(500).send('database query error')
        }else{
            rows[0].date_naissance = rows[0].date_naissance.toISOString().split('T')[0]
            res.json({etudiants :rows})
        }
    })
})
app.put('/api/etudiants/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const {nom,prenom,date_naissance,genre,adresse,email,telephone} = req.body
    db.query(`update etudiants set nom='${nom}',prenom='${prenom}',date_naissance='${date_naissance}',genre='${genre}',adresse='${adresse}',email='${email}',telephone='${telephone}' where etudiant_id = ${id}`,(err,rows)=>{
        if(err){
            console.log(err)
            res.status(500).send('database query error')
        }else{
            res.json({etudiants :rows})
        }
    })
})
app.delete('/api/etudiants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); 
    const query = 'DELETE FROM ETUDIANTS WHERE ETUDIANT_ID = ?';    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).send('Erreur de base de données');
        }
        res.status(200).json({ message: 'Étudiant supprimé avec succès' });
    });
});
app.post('/api/etudiants',(req,res)=>{
    const {nom,prenom,date_naissance,genre,adresse,email,telephone} = req.body
    const query = 'INSERT INTO ETUDIANTS (nom,prenom,date_naissance,genre,adresse,email,telephone) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nom,prenom,date_naissance,genre,adresse,email,telephone], (err, result) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).send('Erreur de base de données');
        }
        res.status(201).json({ message: 'Étudiant ajouté avec sucees' });
    });
})
app.listen(3000,()=>{
    console.log('le serveur est demarer')
})