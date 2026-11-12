import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://jeancarlosdonizete2000_db_user:QPMLZOajIS4gE94m@cluster0.9unaggq.mongodb.net/gabriela_dourado?retryWrites=true&w=majority";
const dbName = process.env.MONGODB_DB_NAME || "gabriela_dourado";

async function seedMongo() {
  const dbJsonPath = path.join(process.cwd(), "data", "database.json");
  const data = JSON.parse(fs.readFileSync(dbJsonPath, "utf-8"));

  console.log("Conectando ao cluster MongoDB Atlas...");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection("cms_state").replaceOne(
      { _id: "main_cms" },
      {
        _id: "main_cms",
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { upsert: true }
    );
    console.log("✔ Coleção 'cms_state' sincronizada.");

    const syncCol = async (colName, items) => {
      const col = db.collection(colName);
      await col.deleteMany({});
      if (items && items.length > 0) {
        await col.insertMany(items.map((item) => ({ ...item, _id: item.id })));
      }
      console.log(`✔ Coleção '${colName}' sincronizada (${items?.length || 0} documentos).`);
    };

    await syncCol("golden_essence_protocols", data.goldenEssenceProtocols);
    await syncCol("procedures", data.procedures);
    await syncCol("article_categories", data.articleCategories);
    await syncCol("articles", data.articles);
    await syncCol("contact_submissions", data.contactSubmissions || []);

    const cols = await db.listCollections().toArray();
    console.log(
      "\nMigração concluída! Coleções criadas no banco 'gabriela_dourado' no MongoDB Atlas:",
      cols.map((c) => c.name).join(", ")
    );
  } finally {
    await client.close();
  }
}

seedMongo().catch((err) => {
  console.error("Erro ao migrar para o MongoDB Atlas:", err);
  process.exit(1);
});
