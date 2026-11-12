import { MongoClient, Db } from "mongodb";

const DEFAULT_URI =
  "mongodb+srv://jeancarlosdonizete2000_db_user:QPMLZOajIS4gE94m@cluster0.9unaggq.mongodb.net/gabriela_dourado?retryWrites=true&w=majority";

const uri = process.env.MONGODB_URI || DEFAULT_URI;
const dbName = process.env.MONGODB_DB_NAME || "gabriela_dourado";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getMongoDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
