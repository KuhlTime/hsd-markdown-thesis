/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import getLatestWorkflowRun from './getLatestWorkflowRun'
import RepoIdentifier from '../model/RepoIdentifier'

/**
 * Returns wether the last github action run was successful or not
 * @param identifier The identifier of the repository
 * @returns A boolean to indicate success or failure
 */
export default async function isLastGenerationSuccessfull(
  repo: RepoIdentifier
) {
  const lastRun = await getLatestWorkflowRun(repo)
  return (lastRun && lastRun.conclusion === 'success') || false
}
