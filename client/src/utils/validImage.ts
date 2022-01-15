export const checkImage = (file: File) => {
  let err = "";

  if (!file) return (err = "Files does not exist!");

  if (file.size > 1024 * 1024) err = "The largest image size is 1mb";

  return err;
};

export const imageUpload = async (file: File) => {
  // baavn4ef;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "baavn4ef");
  formData.append("cloud_name", "daggokgzh");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/daggokgzh/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();

  return { public_id: data.public_id, url: data.secure_url };
};
