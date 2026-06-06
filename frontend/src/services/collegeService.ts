import api from "./axios";

export const getColleges = async (
  search?: string,
  state?: string
) => {

  const res = await api.get(
    "/colleges",
    {
      params: {
        search,
        state,
      },
    }
  );

  return res.data;
};
export const getCollegeById =
  async (id: string) => {

    const res = await api.get(
      `/colleges/${id}`
    );

    return res.data;
  };