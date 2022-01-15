import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalButton from "../components/global/GlobalButton";
import Input from "../components/global/Input";
import Title from "../components/global/Title";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../redux/actions/categoryAction";
import { FormSubmit, ICategory, RootStore } from "../utils/TypeScript";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);
  const dispatch = useDispatch();
  const { auth, category } = useSelector((state: RootStore) => state);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.token || !name) return;
    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data, auth.token));
    } else {
      dispatch(createCategory(name, auth.token));
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id: string) => {
    if (!auth.token) return;
    dispatch(deleteCategory(id, auth.token));
  };

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  return (
    <div className="category">
      <form noValidate onSubmit={handleSubmit}>
        <Title component="label" fz={18} fw={18} margin="0 0 10px 0">
          Category
        </Title>
        <div
          className="d-flex align-items-center"
          style={{
            background: "#1c1c24",
            borderRadius: "15px",
            paddingLeft: "15px",
          }}
        >
          {edit && (
            <i
              className="fal fa-times"
              onClick={() => {
                setEdit(null);
                setName("");
              }}
              style={{
                fontSize: "20px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
            ></i>
          )}

          <Input
            type="text"
            id="category"
            name="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <GlobalButton
          bg="transparent"
          w="200px"
          h="50px"
          border="2px solid #4447E2"
          margin="20px 0 0 0"
        >
          {edit ? "Update" : "Create"}
        </GlobalButton>
      </form>

      <div className="mt-5">
        {category.map((item) => (
          <div className="category__item" key={item._id}>
            <Title component="span" fz={20} fw={500}>
              {item.name}
            </Title>
            <div>
              <i onClick={() => setEdit(item)} className="fal fa-edit"></i>
              <i
                onClick={() => handleDelete(item._id)}
                className="fal fa-trash-alt"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
