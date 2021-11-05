import { Router } from 'express'
import repo from '../config/repo'
import getLatestWorkflowRun from '../lib/getLatestWorkflowRun'
import getLatestRelease from '../lib/getLatestRelease'
import getWordCount from '../lib/getWordCount'

const router = Router()

router.get('/', async (req, res) => {
  const baseURL = req.protocol + '://' + req.get('host')

  const latestRun = await getLatestWorkflowRun(repo)
  const latestRelease = await getLatestRelease(repo)
  const wordCount = await getWordCount(repo)

  res.send({
    workflow: {
      status: latestRun?.status || null,
      timestamp: latestRun?.created_at || null
    },
    release: latestRelease
      ? {
          tag: latestRelease.tag_name,
          timestamp: latestRelease.published_at,
          wordCount: wordCount || null
        }
      : null,
    links: {
      output: `${baseURL}/output.pdf`,
      shield: `${baseURL}/shield.svg`
    }
  })
})

export default router
