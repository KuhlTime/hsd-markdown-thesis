import { Router } from 'express'
import axios from 'axios'
import isLastGenerationSuccessfull from '../lib/isLastGenerationSuccessfull'
import getLatestRelease from '../lib/getLatestRelease'
import repo from '../config/repo'

const router = Router()

router.get('/', async (req, res) => {
  const latestRelease = await getLatestRelease(repo)
  const lastGenerationSuccessfull = await isLastGenerationSuccessfull(repo)

  let text: string = lastGenerationSuccessfull ? 'Operational' : 'Failed'

  if (lastGenerationSuccessfull && latestRelease) {
    text = text + ' / ' + latestRelease.published_at
  }

  // latex replace all - inside the text string with double --
  text = text.replace(/-/g, '--')

  const color = lastGenerationSuccessfull ? 'brightgreen' : 'critical'
  const url = `PDF Generator-${text}-${color}?logo=github&style=flat`

  console.log('https://shields.io/badge/' + url)

  const response = await axios.get('https://shields.io/badge/' + url)

  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(response.data)
})

export default router
