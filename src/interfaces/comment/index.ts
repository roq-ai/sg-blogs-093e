import { UserInterface } from 'interfaces/user';
import { PostInterface } from 'interfaces/post';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  content: string;
  user_id?: string;
  post_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  post?: PostInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
  post_id?: string;
}
