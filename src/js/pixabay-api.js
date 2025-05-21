import axios from "axios";

const API_KEY = "49034890-15d0e202b9bb59c7b310d7a4f";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page: perPage,
    },
  });

  return {
    images: response.data.hits,
    total: response.data.totalHits,
  };
}
