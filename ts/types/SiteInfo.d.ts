interface GroupType {
  id: number;
  name: string;
  flair_url: null | string;
  flair_bg_color: null | string;
  flair_color: null | string;
}

interface PostActionType {
  id: number;
  name_key: string;
  name: string;
  description: string;
  short_description: string;
  is_flag: boolean;
  is_custom_flag: boolean;
}

interface TopicFlagType {
  id: number;
  name_key: string;
  name: string;
  description: string;
  short_description: string;
  is_flag: boolean;
  is_custom_flag: boolean;
}

interface ThemeType {
  theme_id: number;
  name: string;
  default: boolean;
  color_scheme_id: number;
}

interface ColorSchemeType {
  id: number;
  name: string;
  version: number;
  created_at: string;
  updated_at: string;
  via_wizard: boolean;
  base_scheme_id: null | number;
  theme_id: number;
  user_selectable: boolean;
}

export interface CategoryType {
  id: number;
  name: string;
  color: string;
  text_color: string;
  slug: string;
  topic_count: number;
  post_count: number;
  position: number;
  description: string;
  description_text: string;
  description_excerpt: string;
  topic_url: string;
  read_restricted: boolean;
  permission: number;
  notification_level: number;
  topic_template: null | string;
  has_children: boolean;
  sort_order: null | string;
  sort_ascending: null | boolean;
  show_subcategory_list: boolean;
  num_featured_topics: number;
  default_view: null;
  subcategory_list_style: string;
  default_top_period: string;
  default_list_filter: string;
  minimum_required_tags: number;
  navigate_to_first_post_after_read: boolean;
  allowed_tags: [];
  allowed_tag_groups: [];
  allow_global_tags: boolean;
  min_tags_from_required_group: number;
  required_tag_group_name: null;
  read_only_banner: null;
  uploaded_logo: null;
  uploaded_background: null;
  can_edit: boolean;
}

interface AuthProviderType {
  name: string;
  custom_url: null | string;
  pretty_name_override: null | string;
  title_override: null | string;
  frame_width: null | number;
  frame_height: null | number;
  can_connect: boolean;
  can_revoke: boolean;
  icon: string;
}

interface SiteInfo {
  default_archetype: string;
  notification_types: Record<string, number>;
  post_types: {
    regular: 1;
    moderator_action: 2;
    small_action: 3;
    whisper: 4;
  };
  trust_levels: {
    newuser: 0;
    basic: 1;
    member: 2;
    regular: 3;
    leader: 4;
  };
  groups: GroupType[];
  filters: string[];
  periods: ["all", "yearly", "quarterly", "monthly", "weekly", "daily"];
  top_menu_items: string[];
  anonymous_top_menu_items: string[];
  uncategorized_category_id: number;
  user_field_max_length: number;
  post_action_types: PostActionType[];
  topic_flag_types: TopicFlagType[];
  can_create_tag: boolean;
  can_tag_topics: boolean;
  can_tag_pms: boolean;
  tags_filter_regexp: string;
  top_tags: string[];
  topic_featured_link_allowed_category_ids: number[];
  user_themes: ThemeType[];
  user_color_schemes: ColorSchemeType[];
  default_dark_color_scheme: ColorSchemeType;
  censored_regexp: null | string;
  custom_emoji_translation: Record<string, unknown>;
  watched_words_replace: null | string;
  watched_words_link: null | string;
  categories: CategoryType[];
  archetypes: { id: string; name: string; options: unknown[] }[];
  user_fields: Record<string, string>[];
  auth_providers: AuthProviderType[];
}

export default SiteInfo;
