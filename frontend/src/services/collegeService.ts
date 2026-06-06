import api from "./axios";

export const getColleges = async (
  search?:string,

 state?:string,

 minFees?:number,

 maxFees?:number,

 rating?:number
) => {

  const res = await api.get(
    "/colleges",
    {
      params: {
        search,
        state,
        minFees,
        maxFees,
        rating
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
  export const getTrendingColleges =
async ()=>{

  const res =
    await api.get(
      "/colleges/trending"
    );

  return res.data;
};