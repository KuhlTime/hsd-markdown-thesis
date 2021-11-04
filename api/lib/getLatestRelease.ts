/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import octokit from '../config/octokit'
import RepoIdentifier from '../model/RepoIdentifier'

/**
 * Gets the latest release of a repository.
 * @param identifier The repository identifier.
 * @returns A promise that resolves to the latest release.
 */
export default async function getLatestRelease(repo: RepoIdentifier) {
  try {
    await octokit.auth()
    const { data: latestRelease } = await octokit.rest.repos.getLatestRelease(
      repo
    )
    return latestRelease
  } catch {
    return undefined
  }
}
