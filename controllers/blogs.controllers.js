const { connection } = require("../db");

const handleMySQLError = (res, err) => {
    console.error('MySQL Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  };

const createBlogPost = (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content, author_id:req.user.userId };
  try {
    
    connection.query('INSERT INTO BlogPosts SET ?', newPost, (err, result) => {
        if (err) {
          handleMySQLError(res, err);
          return;
        }
        res.status(201).json({ post:{
            id: result.insertId,
            ...newPost,
            created_at: new Date(),
            updated_at: new Date()

        }, message: 'Blog post created successfully' });
      });
  } catch (error) {
        console.error('Error creating blog post: ', error);
        res.status(500).send('Error creating blog post');
  }
  };
  
  
  const getAllBlogPosts = (req, res) => {
        try {
            connection.query('SELECT * FROM BlogPosts', (err, rows) => {
                if (err) {
                  handleMySQLError(res, err);
                  return;
                }
                res.status(200).json({
                    posts: rows.map(row => ({
                        id: row.id,
                        title: row.title,
                        content: row.content,
                        author_id: row.author_id,
                        created_at: row.created_at,
                        updated_at: row.updated_at
                    })
                    )
                })
              });
        } catch (error) {
            console.error('Error getting blog posts: ', error);
            res.status(500).send('Error getting blog posts');
        }
  };
  
  
  const getBlogPostById = (req, res) => {
    const postId = req.params.id;
  try {
    
      connection.query('SELECT * FROM BlogPosts WHERE id = ?', postId, (err, rows) => {
        if (err) {
          handleMySQLError(res, err);
          return;
        }
        if (rows.length === 0) {
          res.status(404).json({ error: 'Blog post not found' });
          return;
        }
        res.json(rows[0]);
      });
  } catch (error) {
        console.error('Error getting blog post by id: ', error);
        res.status(500).send('Error getting blog post by id');
  }
  };
  
  
const updateBlogPost = (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const user = req.user;

    try {
        let post;
        connection.query('SELECT * FROM BlogPosts WHERE id = ?', postId, (err, rows) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            if (rows.length === 0) {
                res.status(404).json({ error: 'Blog post not found' });
                return;
            }
            post = rows[0];
            if (rows[0].author_id !== user.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            connection.query('UPDATE BlogPosts SET title = ?, content = ? WHERE id = ?', [title ? title: post.title, content ? content : post.content, postId], (err, result) => {
                if (err) {
                    handleMySQLError(res, err);
                    return;
                }
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Blog post not found' });
                    return;
                }
                res.json({ message: 'Blog post updated successfully' });
            });
        });
    } catch (error) {
        console.error('Error updating blog post: ', error);
        res.status(500).send('Error updating blog post');
    }
};
  
const deleteBlogPost = (req, res) => {
    const postId = req.params.id;
    const user = req.user;
    console.log(user)

    try {
        connection.query('SELECT * FROM BlogPosts WHERE id = ?', postId, (err, rows) => {
            if (err) {
                handleMySQLError(res, err);
                return;
            }
            if (rows.length === 0) {
                res.status(404).json({ error: 'Blog post not found' });
                return;
            }
            if (rows[0].author_id !== user.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            connection.query('DELETE FROM BlogPosts WHERE id = ?', postId, (err, result) => {
                if (err) {
                    handleMySQLError(res, err);
                    return;
                }
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Blog post not found' });
                    return;
                }
                console.log('deleted')
                res.json({ message: 'Blog post deleted successfully' });
            });
        });
    } catch (error) {
        console.error('Error deleting blog post: ', error);
        res.status(500).send('Error deleting blog post');
    }
};

    module.exports = {
        createBlogPost,
        getAllBlogPosts,
        getBlogPostById,
        updateBlogPost,
        deleteBlogPost
    };

