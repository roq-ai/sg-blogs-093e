import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { postValidationSchema } from 'validationSchema/posts';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPosts();
    case 'POST':
      return createPost();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPosts() {
    const data = await prisma.post
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'post'));
    return res.status(200).json(data);
  }

  async function createPost() {
    await postValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.comment?.length > 0) {
      const create_comment = body.comment;
      body.comment = {
        create: create_comment,
      };
    } else {
      delete body.comment;
    }
    if (body?.reaction?.length > 0) {
      const create_reaction = body.reaction;
      body.reaction = {
        create: create_reaction,
      };
    } else {
      delete body.reaction;
    }
    const data = await prisma.post.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
