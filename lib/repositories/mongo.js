import MongoClient from 'mongodb';

export default async function MongoRepository({
  url = process.env.MONGODB_URL,
  dbName = process.env.MONGODB_DBNAME,
} = {}) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const lastWeekStats = db.collection('lastweekstats');
  const users = db.collection('users');

  const getLastWeekStats = async () => {
    const result = await lastWeekStats.find().sort({ createdAt: -1 }).limit(1).toArray();
    const storedLastWeekStats = result.length !== 0 ? result[0].lastWeekStats : {};

    return storedLastWeekStats;
  };

  const storeLastWeekStats = async (lastWeekStatsData) => {
    const storeLastWeekStatsOperation = await lastWeekStats.insertOne(
      { lastWeekStats: lastWeekStatsData, createdAt: new Date() },
    );

    return storeLastWeekStatsOperation;
  };

  const addUser = async (chatId) => {
    const addUserOperation = await users.updateOne(
      { chatId },
      { $set: { chatId, updatedAt: new Date() } },
      { upsert: true },
    );
    const isNewUser = addUserOperation.modifiedCount === 0;

    return {
      chatId,
      isNewUser,
    };
  };

  const getUsers = async () => {
    const chatIds = await users.distinct('chatId');

    return {
      chatIds,
      count: chatIds.length,
    };
  };

  return {
    getLastWeekStats,
    storeLastWeekStats,
    addUser,
    getUsers,
  };
}
