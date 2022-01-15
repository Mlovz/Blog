import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Card from "../components/cards/Card";
import Pagination from "../components/global/Pagination";
import { getBlogsByCategoryId } from "../redux/actions/blogAction";
import { IParams, RootStore } from "../utils/TypeScript";
import { IBlog } from "../utils/TypeScript";

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const { category, blogsCategory } = useSelector((state: RootStore) => state);

  const { id } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  const history = useHistory();
  const { search } = history.location;

  useEffect(() => {
    const newId = category.find((item) => item.name === id);
    if (newId) setCategoryId(newId._id);
  }, [id, category]);

  useEffect(() => {
    if (!categoryId) return;
    if (blogsCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search));
    } else {
      const data = blogsCategory.find((item) => item.id === categoryId);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [dispatch, categoryId, blogsCategory]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByCategoryId(categoryId, search));
  };

  return (
    <div className="category__detail">
      <div className="category__detail__blogs">
        {blogs?.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))}
      </div>

      <Pagination total={total} callback={handlePagination} />
    </div>
  );
};

export default CategoryDetail;
