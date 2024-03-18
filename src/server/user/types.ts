type UserBadge = {
  id: number;
  granted_at: string;
  created_at: string;
  count: number;
  badge_id: number;
  user_id: number;
  granted_by_id: number;
};

type Badge = {
  id: number;
  name: string;
  description: string;
  grant_count: number;
  allow_title: boolean;
  multiple_grant: boolean;
  icon: string;
  image_url: null | string;
  listable: boolean;
  enabled: boolean;
  badge_grouping_id: number;
  system: boolean;
  slug: string;
  manually_grantable: boolean;
  badge_type_id: number;
};

type BadgeType = {
  id: number;
  name: string;
  sort_order: number;
};

type UserAuthToken = {
  id: number;
  client_ip: string;
  location: string;
  browser: string;
  device: string;
  os: string;
  icon: string;
  created_at: string;
  seen_at: string;
  is_active: boolean;
};

type UserNotificationSchedule = {
  id: number;
  user_id: number;
  enabled: boolean;
  day_0_start_time: number;
  day_0_end_time: number;
  day_1_start_time: number;
  day_1_end_time: number;
  day_2_start_time: number;
  day_2_end_time: number;
  day_3_start_time: number;
  day_3_end_time: number;
  day_4_start_time: number;
  day_4_end_time: number;
  day_5_start_time: number;
  day_5_end_time: number;
  day_6_start_time: number;
  day_6_end_time: number;
};

type InvitedBy = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
};

type Group = {
  id: number;
  automatic: boolean;
  name: string;
  display_name: string;
  user_count: number;
  mentionable_level: number;
  messageable_level: number;
  visibility_level: number;
  primary_group: boolean;
  title: null | string;
  grant_trust_level: null | number;
  has_messages: boolean;
  flair_url: null | string;
  flair_bg_color: string;
  flair_color: string;
  bio_cooked: null | string;
  bio_excerpt: null | string;
  public_admission: boolean;
  public_exit: boolean;
  allow_membership_requests: boolean;
  full_name: null | string;
  default_notification_level: number;
  membership_request_template: null | string;
  members_visibility_level: number;
  can_see_members: boolean;
  publish_read_state: boolean;
};

type GroupUser = {
  group_id: number;
  user_id: number;
  notification_level: number;
  owner: boolean;
};

type UserOption = {
  user_id: number;
  mailing_list_mode: boolean;
  mailing_list_mode_frequency: number;
  email_digests: boolean;
  email_level: number;
  email_messages_level: number;
  external_links_in_new_tab: boolean;
  color_scheme_id: null | number;
  dark_scheme_id: null | number;
  dynamic_favicon: boolean;
  enable_quoting: boolean;
  enable_defer: boolean;
  digest_after_minutes: number;
  automatically_unpin_topics: boolean;
  auto_track_topics_after_msecs: number;
  notification_level_when_replying: number;
  new_topic_duration_minutes: number;
  email_previous_replies: number;
  email_in_reply_to: boolean;
  like_notification_frequency: number;
  include_tl0_in_digests: boolean;
  theme_ids: number[];
  theme_key_seq: number;
  allow_private_messages: boolean;
  enable_allowed_pm_users: boolean;
  homepage_id: null | string;
  hide_profile_and_presence: boolean;
  text_size: string;
  text_size_seq: number;
  title_count_mode: string;
  bookmark_auto_delete_preference: number;
  timezone: string;
  skip_new_user_tips: boolean;
  default_calendar: string;
  oldest_search_log_date: null | string;
  seen_popups: number[];
  sidebar_link_to_filtered_list: boolean;
  sidebar_show_count_of_new_items: boolean;
  watched_precedence_over_muted: null | boolean;
  chat_enabled: boolean;
  only_chat_push_notifications: null | boolean;
  ignore_channel_wide_mention: null | boolean;
  chat_email_frequency: string;
  chat_header_indicator_preference: string;
  chat_separate_sidebar_mode: string;
};

type User = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  trust_level: number;
  admin?: boolean;
  moderator?: boolean;
  email?: string;
  secondary_emails?: string[];
  unconfirmed_emails?: string[];
  last_posted_at?: string;
  last_seen_at?: string;
  created_at?: string;
  ignored?: boolean;
  muted?: boolean;
  can_ignore_user?: boolean;
  can_mute_user?: boolean;
  can_send_private_messages?: boolean;
  can_send_private_message_to_user?: boolean;
  title?: string;
  badge_count?: number;
  custom_fields?: Record<string, unknown>;
  time_read?: number;
  recent_time_read?: number;
  primary_group_id?: null | number;
  primary_group_name?: null | string;
  flair_group_id?: null | number;
  flair_name?: null | string;
  flair_url?: null | string;
  flair_bg_color?: null | string;
  flair_color?: null | string;
  featured_topic?: null | any; // Specify further if the structure is known
  timezone?: string;
  pending_posts_count?: number;
  can_edit?: boolean;
  can_edit_username?: boolean;
  can_edit_email?: boolean;
  can_edit_name?: boolean;
  uploaded_avatar_id?: number;
  has_title_badges?: boolean;
  pending_count?: number;
  profile_view_count?: number;
  second_factor_enabled?: boolean;
  second_factor_backup_enabled?: boolean;
  associated_accounts?: any[]; // Specify further if the structure is known
  can_upload_profile_header?: boolean;
  can_upload_user_card_background?: boolean;
  locale?: string;
  muted_category_ids?: number[];
  regular_category_ids?: number[];
  watched_tags?: string[];
  watching_first_post_tags?: string[];
  tracked_tags?: string[];
  muted_tags?: string[];
  tracked_category_ids?: number[];
  watched_category_ids?: number[];
  watched_first_post_category_ids?: number[];
  system_avatar_upload_id?: null | number;
  system_avatar_template?: string;
  custom_avatar_upload_id?: number;
  custom_avatar_template?: string;
  muted_usernames?: string[];
  ignored_usernames?: string[];
  allowed_pm_usernames?: string[];
  mailing_list_posts_per_day?: number;
  can_change_bio?: boolean;
  can_change_location?: boolean;
  can_change_website?: boolean;
  can_change_tracking_preferences?: boolean;
  user_api_keys?: null | any[]; // Specify further if the structure is known
  user_passkeys?: any[]; // Specify further if the structure is known
  user_auth_tokens?: UserAuthToken[];
  user_notification_schedule?: UserNotificationSchedule;
  use_logo_small_as_avatar?: boolean;
  sidebar_tags?: any[]; // Specify further if the structure is known
  sidebar_category_ids?: number[];
  display_sidebar_tags?: boolean;
  can_chat_user?: boolean;
  cakedate?: string;
  birthdate?: null | string;
  can_see_following?: boolean;
  can_see_followers?: boolean;
  can_see_network_tab?: boolean;
  can_follow?: boolean;
  is_followed?: boolean;
  total_followers?: number;
  total_following?: number;
  notify_me_when_followed?: boolean;
  notify_followed_user_when_followed?: boolean;
  notify_me_when_followed_replies?: boolean;
  notify_me_when_followed_creates_topic?: boolean;
  allow_people_to_follow_me?: boolean;
  gamification_score?: number;
  vote_count?: number;
  see_signatures?: boolean;
  accepted_answers?: number;
  featured_user_badge_ids?: number[];
  invited_by?: InvitedBy;
  groups?: Group[];
  group_users?: GroupUser[];
  user_option?: UserOption;
};

export type UserProfile = {
  user_badges: UserBadge[];
  badges: Badge[];
  badge_types: BadgeType[];
  users: User[];
  user: User;
};
