import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBlogsByUserId } from "../../redux/actions/blogAction";
import { IBlog, RootStore } from "../../utils/TypeScript";
import Card from "../cards/Card";
import Pagination from "../global/Pagination";

interface IProps {
  id: string;
}

const UserBlogs: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { blogsUser } = useSelector((state: RootStore) => state);
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const { search } = history.location;

  useEffect(() => {
    if (!id) return;

    if (blogsUser.every((item) => item.id !== id)) {
      dispatch(getBlogsByUserId(id, search));
    } else {
      const data = blogsUser.find((item) => item.id === id);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) history.push(data.search);
    }
  }, [id, blogsUser, dispatch, search]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUserId(id, search));
  };

  if (blogs?.length === 0) return <h1>No Post</h1>;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gridGap: "10px",
        }}
      >
        {blogs?.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))}
      </div>

      {total > 1 && (
        <div className="mt-3">
          <Pagination total={total} callback={handlePagination} />
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
