const { connection } = require("../db");




const createComment = (req, res) => {
    const post_id = req.params.postId;
    const { content } = req.body;
    const author_id = req.user.userId;
    const newComment = { content, post_id, author_id };

    try {
        connection.query('INSERT INTO Comments SET ?', newComment, (err, result) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            res.status(201).json({ id: result.insertId, message: 'Comment created successfully' });
        });
    } catch (error) {
        console.error('Error creating comment: ', error);
        res.status(500).send('Error creating comment');
    }
};


const getCommentsByPostId = (req, res) => {
    const postId = req.params.postId;

    try {
        connection.query('SELECT * FROM Comments WHERE post_id = ?', postId, (err, rows) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            res.json(rows);
        });
    } catch (error) {
        console.error('Error getting comments by post id: ', error);
        res.status(500).send('Error getting comments by post id');
    }
};

const getCommentById = (req, res) => {
    const commentId = req.params.commentId;

    try {
        connection.query('SELECT * FROM Comments WHERE id = ?', commentId, (err, rows) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            res.json(rows[0]);
        });
    } catch (error) {
        console.error('Error getting comment by id: ', error);
        res.status(500).send('Error getting comment by id');
    }
};


const updatecomment = async (req, res) => {
    const commentId = req.params.commentId;
    const { content } = req.body;
    const author_id = req.user.userId;
    const updatedComment = { content, author_id }
    try {
        connection.query('SELECT * FROM Comments WHERE id = ?', commentId, (err, rows) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            if (rows[0].author_id !== author_id) {
                return res.status(401).json({ message: 'You are not authorized to delete this comment' })
            }
        });
        connection.query('UPDATE Comments SET ? WHERE id = ?', [updatedComment, commentId], (err, result) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            res.status(200).json({ message: 'Comment updated successfully' });
        });
    } catch (error) {
        console.error('Error updating comment: ', error);
        res.status(500).send('Error updating comment');
    }
}


const deletecomment = async (req, res) => {
    const commentId = req.params.commentId;
    const author_id = req.user.userId;
    try {
        connection.query('SELECT * FROM Comments WHERE id = ?', commentId, (err, rows) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            if (rows[0].author_id !== author_id) {
                return res.status(401).json({ message: 'You are not authorized to delete this comment' })
            }
        });

        connection.query('DELETE FROM Comments WHERE id = ?', commentId, (err, result) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            res.status(200).json({ message: 'Comment deleted successfully' });
        });
    } catch (error) {
        console.error('Error deleting comment: ', error);
        res.status(500).send('Error deleting comment');
    }
}

module.exports = {
    createComment,
    getCommentsByPostId,
    getCommentById,
    updatecomment,
    deletecomment
}