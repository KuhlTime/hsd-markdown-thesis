/**
 * An identifier for a repository.
 * This object can be passed to octokit.
 */
type RepoIdentifier = {
  owner: string
  repo: string
}

export default RepoIdentifier
