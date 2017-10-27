const TWEETS_TABLE = 'tweets';

const TWEETS_TABLE_COLUMNS_CREATE = '(user VARCHAR(100), tweet VARCHAR(140), id int)';
const TWEETS_TABLE_COLUMNS = '(user,tweet,id)';

let Commands = {};
module.exports = Commands;

Commands.createTweetsTable = `CREATE TABLE ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS_CREATE}`;

Commands.getTweetsTable = `SELECT * from ${TWEETS_TABLE} `;

Commands.getOneTweet = (tweetID) => `SELECT * FROM ${TWEETS_TABLE} WHERE id = ${tweetID}`

Commands.deleteTweetTable = (id) => `DELETE FROM ${TWEETS_TABLE} WHERE id = ${id}`;

Commands.UpdateTweetTable = (user,tweet,id) => `UPDATE ${TWEETS_TABLE} SET user = ('${user}'), tweet = ('${tweet}') WHERE id = ${id}`;

Commands.insertTweets = (user,tweet,id) => `INSERT INTO ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS} VALUES ('${user}','${tweet}','${id}')`