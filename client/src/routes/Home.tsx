import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/cards/Card";
import { RootStore } from "../utils/TypeScript";

const Home = () => {
  const { homeBlogs } = useSelector((state: RootStore) => state);

  return (
    <div className="home">
      {homeBlogs.map((homeBlog) => (
        <div key={homeBlog._id}>
          {homeBlog.count > 0 && (
            <>
              <h3>
                <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                  {homeBlog.name} <small>({homeBlog.count})</small>
                </Link>
              </h3>
              <hr className="mt-1" />

              <div className="home__blogs">
                {homeBlog.blogs.map((blog) => (
                  <Card key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}

          {homeBlog.count > 4 && (
            <Link
              className="text-end d-block mt-2 mb-3"
              to={`/blogs/${homeBlog.name}`}
            >
              Read more &gt;&gt;
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
