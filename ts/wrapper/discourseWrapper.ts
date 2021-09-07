import axios from "axios";
import PostType from "../types/PostType";
import GetTopicResType from "../types/Topics/GetTopicsResType";
import apiKeyWrapper from "./apiKeyWrapper";
import rsaKeyWrapper from "./rsaKeyWrapper";

const clientId = "DiscourseRN";

const discourseWrapper = {
  url: "",

  clientId,

  userAgent: "DiscourseRN",

  params: {
    application_name: "DiscourseRN",
    client_id: clientId,
    scopes: "read,write,message_bus,push,notifications",
    public_key: rsaKeyWrapper.keyp.public,
    nonce: 1,
  },

  async getTopic(topicID: number) {
    const { data }: { data: { post_stream: { posts: PostType[] } } } =
      await axios.get(`${this.url}/t/${topicID}.json`, {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": this.clientId,
          "User-Agent": this.userAgent,
        },
      });
    return data.post_stream;
  },

  async getTopics(page = 0) {
    const { data }: { data: GetTopicResType } = await axios.get(
      `${this.url}/latest.json` +
        (page ? `?no_definitions=true&page=${page}` : ""),
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": this.clientId,
          "User-Agent": this.userAgent,
        },
      }
    );
    const { users } = data;
    const { topics, more_topics_url } = data.topic_list;
    const nextPage = Number(more_topics_url.split("&")[1].replace("page=", ""));
    return { users, topics, nextPage };
  },

  getAvatarAddr(template: string) {
    return this.url + template.replace("{size}", "128");
  },
};

export default discourseWrapper;
