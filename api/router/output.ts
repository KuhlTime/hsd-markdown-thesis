import { Router } from 'express'
import { join } from 'path'
import repo from '../config/repo'
import env from '../config/env'
import isActionRunning from '../lib/isActionRunning'
import getLatestRelease from '../lib/getLatestRelease'
import getAssetResponse from 'api/lib/getAssetResponse'

const router = Router()

router.get('/', async (_req, res) => {
  const latestRelease = await getLatestRelease(repo)

  // In case there is no latest release the action is either still running
  // or there was an error during compilation.
  if (!latestRelease) {
    const running = await isActionRunning(repo)

    if (running) {
      res.sendFile(join(__dirname, '../assets/busy.pdf'))
    } else {
      res.sendFile(join(__dirname, '../assets/error.pdf'))
    }

    return
  }

  const assetInformation = latestRelease.assets[0]

  const assetId = assetInformation.id
  const releaseTag = latestRelease.name?.replace('.', '_')

  const response = await getAssetResponse(repo, assetId)

  if (response) {
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `inline; filename=${releaseTag}.pdf`
    )
    response.data.pipe(res)
  }
})

export default router
