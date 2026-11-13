import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "gabriela_dourado";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoDb(): Promise<Db> {
  if (!uri) {
    throw new Error(
      "A variável de ambiente MONGODB_URI não está definida. Configure-a no arquivo .env.local ou no painel da Vercel."
    );
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    global._mongoClientPromise = client.connect();
  }

  const client = await global._mongoClientPromise;
  return client.db(dbName);
}
