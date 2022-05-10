export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE_ENV === "production";
export const PORT = process.env.PORT || 1337;
export const SOURCE = process.env.SOURCE;

// NOTE(jim):
// In production we don't use .env and manage secrets another way.
if (!IS_PRODUCTION) {
  require("dotenv").config();
}

// NOTE(jim):
// Slate
export const POSTGRES_ADMIN_PASSWORD = process.env.POSTGRES_ADMIN_PASSWORD;
export const POSTGRES_ADMIN_USERNAME = process.env.POSTGRES_ADMIN_USERNAME;
export const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PUBSUB_SECRET = process.env.PUBSUB_SECRET;
export const ALLOWED_HOST = process.env.ALLOWED_HOST;
export const LOCAL_PASSWORD_ROUNDS_MANUAL = process.env.LOCAL_PASSWORD_ROUNDS_MANUAL;
export const LOCAL_PASSWORD_ROUNDS = process.env.LOCAL_PASSWORD_ROUNDS;
export const LOCAL_PASSWORD_SECRET = `$2b$${LOCAL_PASSWORD_ROUNDS}$${process.env.LOCAL_PASSWORD_SECRET}`;

// NOTE(jim): Custom avatars
export const AVATAR_SLATE_ID = process.env.AVATAR_SLATE_ID;

// NOTE(jim): Textile secrets
export const TEXTILE_HUB_KEY = process.env.TEXTILE_HUB_KEY;
export const TEXTILE_HUB_SECRET = process.env.TEXTILE_HUB_SECRET;
export const TEXTILE_HUB_STAGING_HOST = process.env.TEXTILE_HUB_STAGING_HOST;

// NOTE(jim): Slack updates
export const SOCIAL_SLACK_WEBHOOK_KEY = process.env.SOCIAL_SLACK_WEBHOOK_KEY;
export const SUPPORT_SLACK_WEBHOOK_KEY = process.env.SUPPORT_SLACK_WEBHOOK_KEY;
export const TEXTILE_SLACK_WEBHOOK_KEY = process.env.TEXTILE_SLACK_WEBHOOK_KEY;

// NOTE(jim): External servers
export const URI_SHOVEL = process.env.NEXT_PUBLIC_URI_SHOVEL;
export const URI_FIJI = process.env.NEXT_PUBLIC_URI_FIJI;
export const URI_LENS = process.env.NEXT_PUBLIC_URI_LENS;

//NOTE(amine): Twitter
export const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
export const TWITTER_SECRET_API_KEY = process.env.TWITTER_SECRET_API_KEY;
export const TWITTER_CALLBACK = process.env.TWITTER_CALLBACK;

//NOTE(toast): Sendgrid
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const SENDGRID_WEBHOOK_KEY = process.env.SENDGRID_WEBHOOK_KEY;

//NOTE(martina): iFramely
export const IFRAMELY_API_KEY = process.env.IFRAMELY_API_KEY;

//NOTE(martina): Microlink
export const MICROLINK_API_KEY = process.env.MICROLINK_API_KEY;

//NOTE(martina): Estuary
export const ESTUARY_API_KEY = process.env.ESTUARY_API_KEY;

//NOTE(martina): Elastic search
export const ELASTIC_SEARCH_CLOUD_ID = process.env.ELASTIC_SEARCH_CLOUD_ID;
export const ELASTIC_SEARCH_API_KEY_ID = process.env.ELASTIC_SEARCH_API_KEY_ID;
export const ELASTIC_SEARCH_API_KEY = process.env.ELASTIC_SEARCH_API_KEY;
