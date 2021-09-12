import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import PostType from "../types/PostType";
import GetTopicResType from "../types/Topics/GetTopicsResType";
import wait from "../utils/wait";
import apiKeyWrapper from "./apiKeyWrapper";

// Using axios instance will cause bugs, I don't know why.

class DiscourseWrapper {
  config: { headers: Record<string, string> };

  client: AxiosInstance;

  constructor() {
    this.config = {
      headers: {
        "User-Api-Key": apiKeyWrapper.key,
        "User-Api-Client-Id": config.clientId,
        "User-Agent": config.userAgent,
      },
    };
    this.client = axios.create({
      headers: {
        "User-Api-Key": apiKeyWrapper.key,
        "User-Api-Client-Id": config.clientId,
        "User-Agent": config.userAgent,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async getSiteInfo() {
    const { data } = await axios.get(`${config.url}/site/basic-info.json`, {
      headers: { "User-Agent": config.userAgent },
    });
    return data;
  }

  async getTopic(topicID: number, progress?: number) {
    if (progress) {
      const {
        data,
      }: { data: { post_stream: { posts: PostType[]; stream: number[] } } } =
        await this.client.get(
          `${config.url}/t/${topicID}/${progress}.json?include_suggested=false`,
          {
            headers: {
              "User-Api-Key": apiKeyWrapper.key,
              "User-Api-Client-Id": config.clientId,
              "User-Agent": config.userAgent,
            },
          }
        );
      return data.post_stream;
    }
    const {
      data,
    }: { data: { post_stream: { posts: PostType[]; stream: number[] } } } =
      await this.client.get(
        `${config.url}/t/${topicID}.json?track_visit=true&forceLoad=true`,
        {
          headers: {
            "User-Api-Key": apiKeyWrapper.key,
            "User-Api-Client-Id": config.clientId,
            "User-Agent": config.userAgent,
          },
        }
      );
    return data.post_stream;
  }

  async getTopics(page = 0) {
    await wait(1000);
    const { data }: { data: GetTopicResType } = await this.client.get(
      `${config.url}/latest.json${
        page ? `?no_definitions=true&page=${page}` : ""
      }`,
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
        },
      }
    );
    const { users } = data;
    const { topics, more_topics_url } = data.topic_list;
    const nextPage = Number(more_topics_url.split("&")[1].replace("page=", ""));
    return { users, topics, nextPage };
  }

  async getPosts(topicID: number, after: number) {
    const {
      data,
    }: { data: { post_stream: { posts: PostType[]; stream: number[] } } } =
      await this.client.get(
        `${config.url}/t/${topicID}/${after}.json?include_suggested=false`,
        {
          headers: {
            "User-Api-Key": apiKeyWrapper.key,
            "User-Api-Client-Id": config.clientId,
            "User-Agent": config.userAgent,
          },
        }
      );
    return data.post_stream.posts;
  }

  async replyToPost(raw: string, replyToPostNumber: number, topicId: number) {
    const { data } = await this.client.post(
      `${config.url}/posts.json`,
      {
        raw,
        topic_id: topicId,
        reply_to_post_number:
          replyToPostNumber !== 1 ? replyToPostNumber : undefined,
      },
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
        },
      }
    );
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  getAvatarAddr(template: string) {
    return config.url + template.replace("{size}", "128");
  }
}

const discourseWrapper = new DiscourseWrapper();

export default discourseWrapper;
