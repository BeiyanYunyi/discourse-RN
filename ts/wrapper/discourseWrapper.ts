import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import PostType from "../types/PostType";
import SiteBasicInfo from "../types/SiteBasicInfo";
import SiteInfo from "../types/SiteInfo";
import GetTopicResType from "../types/Topics/GetTopicsResType";
import TopicType from "../types/Topics/TopicType";
import serializeParams from "../utils/serializeParams";
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
        Accept: "application/json",
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
  async getSiteBasicInfo() {
    const { data }: { data: SiteBasicInfo } = await axios.get(
      `${config.url}/site/basic-info.json`,
      {
        headers: { "User-Agent": config.userAgent },
      }
    );
    return data;
  }

  async getSiteInfo() {
    const { data }: { data: SiteInfo } = await this.client.get(
      `${config.url}/site.json`,
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

  async replyToPost(raw: string, replyToPostNumber: number, topicId: number) {
    const { data }: { data: PostType } = await this.client.post(
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

  async postActionsToAPost(
    postId: number,
    postActionTypeId: number,
    flagTopic = false
  ) {
    const { data }: { data: PostType } = await this.client.post(
      `${config.url}/post_actions.json`,
      {
        id: postId,
        post_action_type_id: postActionTypeId,
        flag_topic: flagTopic,
      },
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
          Accept: "application/json",
        },
      }
    );
    return data;
  }

  async withdrawPostAction(postId: number, postActionTypeId: number) {
    const { data }: { data: PostType } = await this.client.delete(
      `${config.url}/post_actions/${postId}.json`,
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
          Accept: "application/json",
        },
        data: {
          post_action_type_id: postActionTypeId,
        },
      }
    );
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  getAvatarAddr(template: string) {
    return config.url + template.replace("{size}", "128");
  }

  async createTopic(raw: string, title: string, category?: number) {
    const { data }: { data: PostType } = await this.client.post(
      `${config.url}/posts.json?include_suggested=false`,
      {
        raw,
        title,
        category,
      },
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
        },
      }
    );
    const { data: topicData }: { data: TopicType } = await this.client.get(
      `${config.url}/t/${data.topic_id}.json`,
      {
        headers: {
          "User-Api-Key": apiKeyWrapper.key,
          "User-Api-Client-Id": config.clientId,
          "User-Agent": config.userAgent,
        },
      }
    );
    return topicData;
  }

  async markPostAsRead(postNumber: number, topicId: number, time = 1000) {
    const req = {
      topic_id: topicId.toString(),
      topic_time: time.toString(),
    };
    // there's no fix for TypeScript, but it works.
    req[`timings[${postNumber}]`] = time.toString();
    const { data } = await this.client.post(
      `${config.url}/topics/timings.json`,
      serializeParams(req),
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
}

const discourseWrapper = new DiscourseWrapper();

export default discourseWrapper;
