import axios from "axios";

const baseApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
    withCredentials: true,
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

const cloudinaryUploadApi = async (picture) => {
    if (!picture) return;
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "calfit");
    formData.append("cloud_name", "hydeblazack");

    return await fetch("https://api.cloudinary.com/v1_1/hydeblazack/image/upload", {
        method: "post",
        body: formData,
    }).then((res) => res.json())
        .then((data) => {
            return data.secure_url;
        })
        .catch((err) => err);
};

export { baseApi, cloudinaryUploadApi };
