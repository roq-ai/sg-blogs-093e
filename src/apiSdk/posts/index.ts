import axios from 'axios';
import queryString from 'query-string';
import { PostInterface, PostGetQueryInterface } from 'interfaces/post';
import { GetQueryInterface } from '../../interfaces';

export const getPosts = async (query?: PostGetQueryInterface) => {
  const response = await axios.get(`/api/posts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPost = async (post: PostInterface) => {
  const response = await axios.post('/api/posts', post);
  return response.data;
};

export const updatePostById = async (id: string, post: PostInterface) => {
  const response = await axios.put(`/api/posts/${id}`, post);
  return response.data;
};

export const getPostById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/posts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePostById = async (id: string) => {
  const response = await axios.delete(`/api/posts/${id}`);
  return response.data;
};
