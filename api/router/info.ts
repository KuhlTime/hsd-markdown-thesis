import { Router } from 'express'
import repo from '../config/repo'
import getLatestWorkflowRun from '../lib/getLatestWorkflowRun'

const router = Router()

router.get('/', async (req, res) => {
  const baseURL = req.protocol + '://' + req.get('host')

  const latestRun = await getLatestWorkflowRun(repo)

  res.send({
    workflowStatus: latestRun?.status,
    lastRun: latestRun?.created_at,
    links: {
      output: `${baseURL}/output.pdf`,
      shield: `${baseURL}/shield.svg`
    }
  })
})

export default router
