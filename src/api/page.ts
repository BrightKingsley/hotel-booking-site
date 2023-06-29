import client from "./client";

const endpoint = "/page";
export const getPageItem = (id, token) => {
  return client.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addPageItem = (page, token) => {
  const data = new FormData();
  data.append("title", page.title);
  data.append("location", page.location);
  data.append("lat", page.lat);
  data.append("lng", page.lng);
  data.append("price", page.price);
  data.append("type", page.type);
  data.append("description", page.description);
  data.append("rooms", page.rooms);
  data.append("size", page.size);
  data.append("perks", page.perks);

  page.images.forEach((image) => {
    data.append(`images`, image);
  });

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + token,
  };
  console.log(data);
  return client.post(endpoint, data, { headers });
};

export const editPageItem = (property, pageId, token) => {
  client.setHeaders({
    "Content-Type": property.images
      ? "multipart/form-data"
      : "application/json",
    Authorization: "Bearer " + token,
  });

  if (property.images) {
    const imageData = new FormData();
    property.images.forEach((image) => {
      console.log("IMAGE_UPLOAD", image);
      imageData.append(`images`, image);
    });
    return client.patch(`${endpoint}/${pageId}`, imageData);
  }

  return client.patch(`${endpoint}/${pageId}`, property);
};

export const deletePageItem = (pageId, token) => {
  console.log("DELETE_TOKEN", token);
  client.setHeader("Authorization", "Bearer " + token);
  return client.delete(`${endpoint}/${pageId}`);
};
