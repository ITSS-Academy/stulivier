export interface CommentModel {
  id: string;
  user_id: string;
  video_id: string;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string;
  };
}

export interface CreateCommentDto {
  user_id: string;
  video_id: string;
  content: string;
}
