import openai from "./chatgpt";

const queryImg= async () => {
  console.log()
  const res = await openai
    .createImage({
      prompt: "a white siamese cat",
      n: 2,
      size: "256x256",
    })
    .then((res) => console.log(res.data.data[0].url))
    .catch(
      (err) =>
        `AIble was unable to find an answer for that! (Error: ${err.message})`
    );
  
  console.log(res);
  return res;
};

export default queryImg;