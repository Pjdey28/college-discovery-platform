import api from "./axios";

export const predictCollege =
async (
  rank:number,
  exam:string
) => {

  const res =
    await api.post(
      "/predictor",
      {
        rank,
        exam,
      }
    );

  return res.data;
};