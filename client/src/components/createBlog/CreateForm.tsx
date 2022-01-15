import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALERT } from "../../redux/types/alertType";
import {
  FormSubmit,
  IBlog,
  InputChange,
  RootStore,
} from "../../utils/TypeScript";
import { checkImage } from "../../utils/validImage";
import Input from "../global/Input";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { category } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const handleChange = (e: InputChange) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const check = checkImage(file);
      console.log(check);

      if (check) return dispatch({ type: ALERT, payload: { error: check } });
      setBlog({ ...blog, thumbnail: file });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group position-relative mt-4">
        <Input
          type="text"
          id="title"
          name="title"
          value={blog.title}
          onChange={handleChange}
        />
        <small
          className="position-absolute"
          style={{ bottom: 0, right: "3px" }}
        >
          {blog.title.length} / 50
        </small>
      </div>
      <div className="form-group mt-4">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <div className="form-group position-relative mt-4">
        <textarea
          rows={4}
          style={{
            resize: "none",
          }}
          className="w-100 form-control"
          name="description"
          value={blog.description}
          onChange={handleChange}
        ></textarea>
        <small
          className="position-absolute text-muted"
          style={{ bottom: 0, right: "3px" }}
        >
          {blog.description.length} / 200
        </small>
      </div>

      <div className="form-group mt-4">
        <select
          className="form-control"
          value={blog.category}
          name="category"
          id=""
          onChange={handleChange}
        >
          <option value="">Choose a category</option>
          {category.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
