import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-eYZfrkF9N9vvu6k5Z32kQvxy",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
