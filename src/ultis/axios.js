import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:1991",
});

export const HeadCtx = (ctx) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${ctx}`,
    },
  };
};
