import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { postValidationSchema } from 'validationSchema/posts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.post
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPostById();
    case 'PUT':
      return updatePostById();
    case 'DELETE':
      return deletePostById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPostById() {
    const data = await prisma.post.findFirst(convertQueryToPrismaUtil(req.query, 'post'));
    return res.status(200).json(data);
  }

  async function updatePostById() {
    await postValidationSchema.validate(req.body);
    const data = await prisma.post.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePostById() {
    const data = await prisma.post.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
