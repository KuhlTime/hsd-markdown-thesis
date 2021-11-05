/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios, { AxiosResponse } from 'axios'
import RepoIdentifier from '../model/RepoIdentifier'
import env from '../config/env'

export default async function getAssetResponse(
  repo: RepoIdentifier,
  assetId: number
): Promise<AxiosResponse<any, any> | undefined> {
  return new Promise((resolve, reject) => {
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
        resolve(response)
      })
      .catch(() => {
        resolve(undefined)
      })
  })
}
