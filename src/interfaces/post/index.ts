import { CommentInterface } from 'interfaces/comment';
import { ReactionInterface } from 'interfaces/reaction';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PostInterface {
  id?: string;
  title: string;
  content: string;
  category?: string;
  tags?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  reaction?: ReactionInterface[];
  user?: UserInterface;
  _count?: {
    comment?: number;
    reaction?: number;
  };
}

export interface PostGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  tags?: string;
  user_id?: string;
}
