import fs from "fs";
import path from "path";
import {
  DatabaseSchema,
  SiteSettings,
  HomeContent,
  AboutPageContent,
  GoldenEssencePageContent,
  GoldenEssenceProtocol,
  Procedure,
  ArticleCategory,
  Article,
  ContactSubmission,
} from "./types";
import { initialDatabase } from "./initial-data";
import { getMongoDb } from "./mongodb";
export { buildWhatsAppUrl } from "./utils";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

interface CmsStateDoc {
  _id: string;
  settings: SiteSettings;
  home: HomeContent;
  about: AboutPageContent;
  goldenEssencePage: GoldenEssencePageContent;
  goldenEssenceProtocols: GoldenEssenceProtocol[];
  procedures: Procedure[];
  articleCategories: ArticleCategory[];
  articles: Article[];
  contactSubmissions: ContactSubmission[];
  updatedAt: string;
}

function readLocalBackup(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw) as Partial<DatabaseSchema>;
      return {
        ...initialDatabase,
        ...parsed,
        settings: { ...initialDatabase.settings, ...(parsed.settings || {}) },
        home: { ...initialDatabase.home, ...(parsed.home || {}) },
        about: { ...initialDatabase.about, ...(parsed.about || {}) },
        goldenEssencePage: {
          ...initialDatabase.goldenEssencePage,
          ...(parsed.goldenEssencePage || {}),
        },
        goldenEssenceProtocols:
          parsed.goldenEssenceProtocols ||
          initialDatabase.goldenEssenceProtocols,
        procedures: parsed.procedures || initialDatabase.procedures,
        articleCategories:
          parsed.articleCategories || initialDatabase.articleCategories,
        articles: parsed.articles || initialDatabase.articles,
        contactSubmissions:
          parsed.contactSubmissions || initialDatabase.contactSubmissions,
      };
    }
  } catch {
    // Ignore local read error
  }
  return initialDatabase;
}

function writeLocalBackup(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore read-only filesystem errors in serverless environments
  }
}

async function syncCollectionsToMongo(data: DatabaseSchema): Promise<void> {
  const db = await getMongoDb();

  // 1. Documento mestre cms_state (garante leitura atômica super rápida)
  const cmsDoc: CmsStateDoc = {
    _id: "main_cms",
    settings: data.settings,
    home: data.home,
    about: data.about,
    goldenEssencePage: data.goldenEssencePage,
    goldenEssenceProtocols: data.goldenEssenceProtocols,
    procedures: data.procedures,
    articleCategories: data.articleCategories,
    articles: data.articles,
    contactSubmissions: data.contactSubmissions,
    updatedAt: new Date().toISOString(),
  };

  await db
    .collection<CmsStateDoc>("cms_state")
    .replaceOne({ _id: "main_cms" }, cmsDoc, { upsert: true });

  // 2. Sincroniza coleções dedicadas no MongoDB Atlas para fácil visualização e consultas individuais
  const syncCollection = async <T extends { id: string }>(
    colName: string,
    items: T[]
  ) => {
    const col = db.collection(colName);
    await col.deleteMany({});
    if (items.length > 0) {
      await col.insertMany(
        items.map((item) => ({ ...item, _id: item.id as unknown as any }))
      );
    }
  };

  await Promise.all([
    syncCollection("golden_essence_protocols", data.goldenEssenceProtocols),
    syncCollection("procedures", data.procedures),
    syncCollection("article_categories", data.articleCategories),
    syncCollection("articles", data.articles),
    syncCollection("contact_submissions", data.contactSubmissions || []),
  ]);
}

export async function getDatabase(): Promise<DatabaseSchema> {
  try {
    const db = await getMongoDb();
    const existing = await db
      .collection<CmsStateDoc>("cms_state")
      .findOne({ _id: "main_cms" });

    if (existing) {
      return {
        settings: { ...initialDatabase.settings, ...existing.settings },
        home: { ...initialDatabase.home, ...existing.home },
        about: { ...initialDatabase.about, ...existing.about },
        goldenEssencePage: {
          ...initialDatabase.goldenEssencePage,
          ...existing.goldenEssencePage,
        },
        goldenEssenceProtocols:
          existing.goldenEssenceProtocols ||
          initialDatabase.goldenEssenceProtocols,
        procedures: existing.procedures || initialDatabase.procedures,
        articleCategories:
          existing.articleCategories || initialDatabase.articleCategories,
        articles: existing.articles || initialDatabase.articles,
        contactSubmissions:
          existing.contactSubmissions || initialDatabase.contactSubmissions,
      };
    }

    // Se o MongoDB estiver vazio (primeira execução), faz seed automático a partir do backup local ou initialDatabase
    const seedData = readLocalBackup();
    await syncCollectionsToMongo(seedData);
    return seedData;
  } catch (err) {
    console.warn(
      "Aviso: Não foi possível conectar ao MongoDB Atlas no momento (usando cache local/inicial):",
      (err as Error).message
    );
    return readLocalBackup();
  }
}

export async function saveDatabase(data: DatabaseSchema): Promise<void> {
  writeLocalBackup(data);
  await syncCollectionsToMongo(data);
}
