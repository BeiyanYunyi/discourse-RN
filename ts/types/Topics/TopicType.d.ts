export default interface TopicType {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: null | string;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: null;
  excerpt?: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: null;
  liked: null;
  tags: unknown[];
  views: number;
  like_count: number;
  has_summary: boolean;
  last_poster_username: string;
  category_id: number;
  pinned_globally: boolean;
  featured_link: null;
  posters: unknown[];
  last_read_post_number?: number;
}
