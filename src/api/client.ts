import { create } from "apisauce";

const client = create({
  baseURL: "http://localhost:3002/",
});

export default client;
