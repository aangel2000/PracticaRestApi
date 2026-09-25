const { sql, poolPromise } = require('../BD');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "son obligatorios la contra y email"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input('email', sql.VarChar(100), email)
            .input('password', sql.VarChar(255), password)
            .query(`
                SELECT id, nombre, email
                FROM users
                WHERE email = @email
                AND password = @password
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({
                error: "email o contra no correctos"
            });
        }

        res.json({
            mensaje: "login se pudo",
            usuario: result.recordset[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "error al login"
        });
    }
};

module.exports = {
    login
};