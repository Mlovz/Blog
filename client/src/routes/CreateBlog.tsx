import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHoriz from "../components/cards/CardHoriz";
import CreateForm from "../components/createBlog/CreateForm";
import Quil from "../components/editor/Quil";
import GlobalButton from "../components/global/GlobalButton";
import Title from "../components/global/Title";
import { createBlog } from "../redux/actions/blogAction";
import { ALERT } from "../redux/types/alertType";
import { IBlog, RootStore } from "../utils/TypeScript";
import { validCreateBlog } from "../utils/Valid";

const CreateBlog = () => {
  const initialState = {
    _id: "",
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState<IBlog>(initialState);
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText as string;
    setText(text);
  });

  const handleSubmit = () => {
    if (!auth.token) return;
    const check = validCreateBlog({ ...blog, content: text });
    console.log(check);

    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { error: check.errMsg } });
    }

    let newData = { ...blog, content: body };

    dispatch(createBlog(newData, auth.token));
  };

  return (
    <div className="create__blog mt-4">
      <Title component="h1" fz={25} fw={500}>
        Create Blog
      </Title>

      <div className="row d-flex justify-content-between">
        <div className="col-md-5">
          <Title component="h3" fz={20} fw={500}>
            Create
          </Title>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="col-md-7  d-flex flex-column align-items-end">
          <div className="text-end">
            <Title component="h3" fz={20} fw={500}>
              Preview
            </Title>
          </div>
          <CardHoriz blog={blog} />
        </div>
      </div>

      <Quil setBody={setBody} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <small>{text.length}</small>

      <GlobalButton
        bg="transparent"
        w="250px"
        h="50px"
        border="2px solid #4447E2"
        margin="20px 0 0 0"
        onClick={handleSubmit}
      >
        Create post
      </GlobalButton>
    </div>
  );
};

export default CreateBlog;
