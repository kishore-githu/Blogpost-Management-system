
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Post } from "../types/Post";

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const deletePost = (id: number) => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));  
    });
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <Link to="/new">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            {/* Edit and Delete Buttons */}
            <div>
              <button onClick={() => deletePost(post.id)}>Delete</button>
              <Link to={`/edit/${post.id}`}>
                <button>Edit</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
