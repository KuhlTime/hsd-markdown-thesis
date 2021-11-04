import getLatestWorkflowRun from './getLatestWorkflowRun'
import RepoIdentifier from '../model/RepoIdentifier'

/**
 * Returns wether or not a workflow is currently running for a given repo.
 * @param repo The repo to check.
 * @returns Returns a boolean indicating wether or not a workflow is currently running.
 */
export default async function isActionRunning(
  repo: RepoIdentifier
): Promise<boolean> {
  const lastRun = await getLatestWorkflowRun(repo)
  return (lastRun && lastRun.status === 'in_progress') || false
}
