import axios from 'axios';
import queryString from 'query-string';
import { ReactionInterface, ReactionGetQueryInterface } from 'interfaces/reaction';
import { GetQueryInterface } from '../../interfaces';

export const getReactions = async (query?: ReactionGetQueryInterface) => {
  const response = await axios.get(`/api/reactions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createReaction = async (reaction: ReactionInterface) => {
  const response = await axios.post('/api/reactions', reaction);
  return response.data;
};

export const updateReactionById = async (id: string, reaction: ReactionInterface) => {
  const response = await axios.put(`/api/reactions/${id}`, reaction);
  return response.data;
};

export const getReactionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/reactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteReactionById = async (id: string) => {
  const response = await axios.delete(`/api/reactions/${id}`);
  return response.data;
};
