import api from "./axios";

export const getDiscussions =
async () => {

  const res =
    await api.get(
      "/discussions"
    );

  return res.data;
};

export const createDiscussion =
async (
  title:string,
  content:string
) => {

  const res =
    await api.post(
      "/discussions",
      {
        title,
        content,
      }
    );

  return res.data;
};

export const addAnswer =
async (
  id:string,
  content:string
) => {

  const res =
    await api.post(
      `/discussions/${id}/answer`,
      {
        content,
      }
    );

  return res.data;
};