const mapping: Record<string, string> = {
  comments: 'comment',
  companies: 'company',
  posts: 'post',
  reactions: 'reaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
