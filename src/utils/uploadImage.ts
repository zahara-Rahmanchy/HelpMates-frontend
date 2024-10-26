const imageHostingURL = `https://api.imgbb.com/1/upload?key=37a2599227bbd15acf633f5a71ece5e2`;
export const uploadImage = async (image: any) => {
  const formD = new FormData();
  // console.log("image: ", image);
  formD.append(`image`, image);
  try {
    const res = await fetch(imageHostingURL, {
      method: "POST",
      body: formD,
    });
    const imgs = await res.json();
    // console.log("imgs: ", imgs);
    if (imgs.success) {
      return imgs.data.display_url;
    } else {
      throw new Error("failed to upload");
    }
  } catch (err) {
    console.log(err);
  }
};
