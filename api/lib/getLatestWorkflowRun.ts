/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import RepoIdentifier from '../model/RepoIdentifier'
import octokit from '../config/octokit'

/**
 * Returns the latest workflow run for the given repo. If there has not been a workflow run yet,
 * it returns undefined.
 * @param repo The repo to get the latest workflow run for.
 * @returns Either the latest workflow run or undefined.
 */
export default async function getLatestWorkflowRun(repo: RepoIdentifier) {
  try {
    await octokit.auth()
    const { data: runs } = await octokit.rest.actions.listWorkflowRunsForRepo({
      ...repo,
      workflow_file_name: 'generator.yaml'
    })

    if (runs.workflow_runs.length === 0) return undefined

    return runs.workflow_runs.filter(run => run.name === 'PDF Generator')[0]
  } catch {
    return undefined
  }
}
