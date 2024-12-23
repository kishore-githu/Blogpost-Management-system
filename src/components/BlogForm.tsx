
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Post } from "../types/Post";

interface FormData {
  title: string;
  content: string;
}

const BlogForm: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const { id } = useParams(); // Get post ID from URL for editing
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
        setPost(response.data);
        reset(response.data);
      });
    }
  }, [id, reset]);

  const onSubmit = (data: FormData) => {
    if (post) {
      
      axios.put(`http://localhost:3001/posts/${post.id}`, data).then(() => navigate("/"));
    } else {
      
      axios.post("http://localhost:3001/posts", data).then(() => navigate("/"));
    }
  };

  return (
    <div>
      <h1>{post ? "Edit Post" : "Create Post"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && <p>{errors.content.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
