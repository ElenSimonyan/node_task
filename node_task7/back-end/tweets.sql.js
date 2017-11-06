const TWEETS_TABLE = 'tweets';

const TWEETS_TABLE_COLUMNS_CREATE = '(user VARCHAR(100), tweet VARCHAR(140), id int, created_at TIMESTAMP,updated_at TIMESTAMP,deleted_at TIMESTAMP)';
const TWEETS_TABLE_COLUMNS = '(user,tweet,id,created_at)';

let Commands = {};
module.exports = Commands;

Commands.createTweetsTable = `CREATE TABLE ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS_CREATE}`;

Commands.getTweetsTable = `SELECT * from ${TWEETS_TABLE} WHERE deleted_at IS NULL`;

Commands.getOneTweet = (tweetID) => `SELECT * FROM ${TWEETS_TABLE} WHERE id = ${tweetID}`

Commands.deleteTweetTable = (id, deleted_at) => `UPDATE ${TWEETS_TABLE} SET deleted_at = ('${deleted_at}') WHERE id = ${id} `;

Commands.UpdateTweetTable = (user,tweet,id,updated_at) => `UPDATE ${TWEETS_TABLE} SET user = ('${user}'), tweet = ('${tweet}'), updated_at = ('${updated_at}') WHERE id = ${id}`;

Commands.insertTweets = (user,tweet,id,created_at) => `INSERT INTO ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS} VALUES ('${user}','${tweet}','${id}', '${created_at}')`