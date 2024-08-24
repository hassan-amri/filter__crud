import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { country } = req.query;

    try {
      const filteredData = await prisma.client.findMany({
        where: {
          country: {
            contains: 'USA',
            mode: 'insensitive',
          },
        },
      });

      res.status(200).json(filteredData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
