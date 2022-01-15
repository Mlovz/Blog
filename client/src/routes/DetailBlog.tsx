import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataApi } from "../utils/fetchData";
import { IBlog, IParams } from "../utils/TypeScript";

const DetailBlog = () => {
  const { id } = useParams<IParams>();
  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getDataApi(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data.msg);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {blog && (
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      )}
    </div>
  );
};

export default DetailBlog;
