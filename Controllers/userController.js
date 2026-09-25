const { sql, poolPromise } = require('../BD');

const getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query('SELECT * FROM users');

        res.json(result.recordset);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error usuario :/"
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM users WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: "Usuario no exciste :3"
            });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error en usuario obtenido idk"
        });
    }
};


const createUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('nombre', sql.VarChar(100), nombre)
            .input('email', sql.VarChar(100), email)
            .input('password', sql.VarChar(255), password)
            .query(`
                INSERT INTO users (nombre, email, password)
                OUTPUT INSERTED.*
                VALUES (@nombre, @email, @password)
            `);

        res.status(201).json(result.recordset[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Exploto el crear"
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar(100), nombre)
            .input('email', sql.VarChar(100), email)
            .input('password', sql.VarChar(255), password)
            .query(`
                UPDATE users
                SET nombre = @nombre,
                    email = @email,
                    password = @password
                OUTPUT INSERTED.*
                WHERE id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: "No encontro usuario"
            });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al act usuario"
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                DELETE FROM users
                OUTPUT DELETED.*
                WHERE id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Usuario eliminado correctamente",
            usuario: result.recordset[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al eliminar el usuario"
        });
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};