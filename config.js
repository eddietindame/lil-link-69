const env = process.env

export const nodeEnv = env.NODE_ENV || 'development'

export const logStars = message => {
  console.info('**********')
  console.info(message)
  console.info('**********')
}

export const regex = {
  protocol: /^(http|https):\/\//i,
  url: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i,
  shortUrl: /^[a-zA-Z0-9-]{9}$/
}

export default {
  port: env.PORT || 8080,
  db: env.MONGODB_URI || 'mongodb://localhost/shortUrls'
}
