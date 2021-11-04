import { config } from 'dotenv'

config()

// If the env variables can not be found an error will be thrown
const env = {
  PORT: (process.env.PORT || 8080) as number,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME as string,
  GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY as string
}

export default env
