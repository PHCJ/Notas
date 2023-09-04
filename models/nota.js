const db = require('./db')

const Nota = db.sequelize.define('nota',{
    titulo:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.TEXT
    }
});

//Nota.sync({force:true})
module.exports = Nota