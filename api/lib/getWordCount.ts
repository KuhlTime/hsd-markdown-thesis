/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import pdf from 'pdf-parse'
import RepoIdentifier from '../model/RepoIdentifier'
import getAssetResponse from './getAssetResponse'
import getLatestRelease from './getLatestRelease'

/**
 * Returns the latest workflow run for the given repo. If there has not been a workflow run yet,
 * it returns undefined.
 * @param repo The repo to get the latest workflow run for.
 * @returns Either the latest workflow run or undefined.
 */
export default async function getWordCount(
  repo: RepoIdentifier
): Promise<number | undefined> {
  const latestRelease = await getLatestRelease(repo)
  if (!latestRelease) return undefined

  const assetInformation = latestRelease.assets[0]
  const assetId = assetInformation.id

  const response = await getAssetResponse(repo, assetId)

  if (response) {
    const data = response.data
    const pdfText = await pdf(data.responseUrl)
    return pdfText.text.replace('\n', ' ').split(' ').length
  } else {
    return undefined
  }
}
