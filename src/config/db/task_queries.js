const pool = require("./pool.js");

const createTask = async (title, description, status, priority, deadline, user_id) => {

    try {

        const allowedStatus = ['pending', 'in_progress', 'completed'];
        const allowedPriority = ['low', 'medium', 'high'];

        const results = await pool.query('INSERT INTO tasks (title, description, status, priority, deadline, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [
            title,
            description,
            status,
            priority,
            deadline,
            user_id
        ]);

        return results.rows[0]
    } catch (error) {
        throw error
    }
}

const getTasks = async (user_id, filters, limit, offset) => {
    try {

        let query = 'SELECT * FROM tasks WHERE user_id = $1 ';
        let values = [user_id];

        if (filters.status) {
            query += ' AND status = $2 ';
            values.push(filters.status)
        }

        if (filters.priority) {
            query += ' AND priority = $3 ';
            values.push(filters.priority)
        }

        query += `ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

        const results = await pool.query(query, values)

        return results.rows
    } catch (error) {
        throw error
    }
}

const getTaskById = async (user_id) => {
    try {
        const query = 'SELECT task_id FROM tasks WHERE user_id = $1';
        const values = [user_id];

        const results = await pool.query(query, values);

        return results.rows[0]
    } catch (error) {

    }
}

const updateTask = async (title, description, status, priority, deadline, user_id) => {
    try {
        const query = 'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority), deadline = COALESCE($5, deadline) WHERE user_id = $6 RETURNING *';
        const values = [title, description, status, priority, deadline, user_id];

        console.log(values);

        const results = await pool.query(query, values);

        return results.rows[0]
    } catch (error) {
        throw error;
    }
}

const deleteTask = async (task_id) => {
    try {
        const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
        const value = [task_id];

        const results = await pool.query(query, value);

        return results.rows
    } catch (error) {
        throw error
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}