import React from "react";
import { Link } from "react-router-dom";
import { IBlog } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const CardHoriz: React.FC<IProps> = ({ blog }) => {
  return (
    <div
      className="card mt-3"
      style={{ minWidth: "300px", maxWidth: "300px", minHeight: "420px" }}
    >
      {typeof blog.thumbnail === "string" ? (
        <Link to={`/blog/${blog._id}`}>
          <img src={blog.thumbnail} className="card-img-top" alt="thumbnail" />
        </Link>
      ) : (
        <img
          src={URL.createObjectURL(blog.thumbnail)}
          className="card-img-top w-100"
          style={{
            height: "180px",
            objectFit: "cover",
          }}
          alt="thumbnail"
        />
      )}
      <div className="card-body text-muted">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.description}</p>
        <p className="card-text">
          <small className="text-muted">{blog.createdAt}</small>
        </p>
      </div>
    </div>
  );
};

export default CardHoriz;
