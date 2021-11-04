import { Router } from 'express'
import axios from 'axios'
import { join } from 'path'
import repo from '../config/repo'
import env from '../config/env'
import isActionRunning from '../lib/isActionRunning'
import isLastGenerationSuccessfull from '../lib/isLastGenerationSuccessfull'
import getLatestRelease from '../lib/getLatestRelease'

const router = Router()

router.get('/', async (_req, res) => {
  const latestRelease = await getLatestRelease(repo)

  console.log(latestRelease)

  // In case there is no latest release the action is either still running
  // or there was an error during compilation.
  if (!latestRelease) {
    const running = await isActionRunning(repo)

    if (running) {
      res.sendFile(join(__dirname, '../../.assets/busy.pdf'))
    } else {
      res.sendFile(join(__dirname, '../../.assets/error.pdf'))
    }

    return
  }

  const assetInformation = latestRelease.assets[0]

  const assetId = assetInformation.id
  const releaseTag = latestRelease.name?.replace('.', '_')

  axios
    .get(
      `https://api.github.com/repos/${repo.owner}/${repo.repo}/releases/assets/${assetId}`,
      {
        responseType: 'stream',
        headers: {
          Accept: 'application/octet-stream',
          Authorization: `Bearer ${env.GITHUB_TOKEN}`
        }
      }
    )
    .then(response => {
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${releaseTag}.pdf`
      )
      response.data.pipe(res)
    })
    .catch(error => {
      console.error(error)
      res.send('Error')
    })
})

export default router
