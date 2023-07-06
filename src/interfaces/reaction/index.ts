import { UserInterface } from 'interfaces/user';
import { PostInterface } from 'interfaces/post';
import { GetQueryInterface } from 'interfaces';

export interface ReactionInterface {
  id?: string;
  type: string;
  user_id?: string;
  post_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  post?: PostInterface;
  _count?: {};
}

export interface ReactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  user_id?: string;
  post_id?: string;
}
