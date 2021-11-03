import axios from 'axios'
import * as dotenv from 'dotenv'
import { Octokit } from 'octokit'
import app from './app'

dotenv.config()

// If the env variables can not be found an error will be thrown
const env = {
  PORT: (process.env.PORT || 8080) as number,
  URL: (process.env.URL || process.env.VERCEL_URL || '') as string,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME as string,
  GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY as string
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

app.get('/', (req, res) => {
  res.send({
    message: 'API running nominal',
    author: env.GITHUB_USERNAME,
    links: {
      output: `https://${env.URL}/output.pdf`,
      shield: `https://${env.URL}/shield.svg`
    }
  })
})

app.get('/shield.svg', async (req, res) => {
  try {
    await octokit.auth()

    const lastAction = await octokit.rest.actions.listWorkflowRunsForRepo({
      owner: env.GITHUB_USERNAME,
      repo: env.GITHUB_REPOSITORY,
      workflow_file_name: 'generator.yaml'
    })

    const lastGenerationSuccessfull =
      lastAction.data.workflow_runs.filter(
        run => run.name === 'PDF Generator'
      )[0].conclusion === 'success'

    const lastRelease = await octokit.rest.repos.getLatestRelease({
      owner: env.GITHUB_USERNAME,
      repo: env.GITHUB_REPOSITORY
    })

    let text: string = lastGenerationSuccessfull ? 'Operational' : 'Failed'

    if (lastGenerationSuccessfull) {
      text = text + ' / ' + lastRelease.data.published_at
    }

    // latex replace all - inside the text string with double --
    text = text.replace(/-/g, '--')

    const color = lastGenerationSuccessfull ? 'brightgreen' : 'critical'
    const url = encodeURIComponent(
      `PDF Generator-${text}-${color}?logo=github&style=flat`
    )

    const response = await axios.get('https://shields.io/badge/' + url)

    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(response.data)
  } catch (error: any) {
    res.send(error.message)
  }
})

app.get('/output.pdf', async (_req, res) => {
  const latestRelease = await octokit.rest.repos.getLatestRelease({
    owner: env.GITHUB_USERNAME,
    repo: env.GITHUB_REPOSITORY
  })
  const assetInformation = latestRelease.data.assets[0]

  const assetId = assetInformation.id
  const releaseTag = latestRelease.data.name?.replace('.', '_')

  axios
    .get(
      `https://api.github.com/repos/${env.GITHUB_USERNAME}/${env.GITHUB_REPOSITORY}/releases/assets/${assetId}`,
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
})

app.use((error: Error, req: any, res: any, next: any) => {
  if (error) {
    res.send({
      message: error.message
    })
  } else {
    next()
  }
})

const port = env.PORT

app.listen(port, () =>
  console.log(`Server running at port http://localhost:${port}`)
)
