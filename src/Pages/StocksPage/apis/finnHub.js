import axios from "axios";

const TOKEN = "chumt4pr01qphnn2bo7gchumt4pr01qphnn2bo80";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
