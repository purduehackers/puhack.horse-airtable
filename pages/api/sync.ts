import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug, destination } = JSON.parse(req.body)
    const sendToWorker = await fetch(`http://localhost:8787/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: destination
      })
    })
    return res.status(sendToWorker.status).send(sendToWorker.statusText)
  } catch (err) {
    return res.status(400).send('Could not parse JSON in body')
  }
}
