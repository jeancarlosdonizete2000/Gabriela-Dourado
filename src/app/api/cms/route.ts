import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";
import { initialDatabase } from "@/lib/initial-data";
import { DatabaseSchema } from "@/lib/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gabriela2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("x-admin-password");
  const cookieAuth = req.cookies.get("gd_admin_auth")?.value;
  return authHeader === ADMIN_PASSWORD || cookieAuth === ADMIN_PASSWORD;
}

export async function GET() {
  const db = await getDatabase();
  return NextResponse.json(db);
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Não autorizado. Faça login no painel administrativo." },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as Partial<DatabaseSchema> & {
      action?: string;
    };

    if (body.action === "reset_defaults") {
      await saveDatabase(initialDatabase);
      return NextResponse.json({
        success: true,
        data: initialDatabase,
      });
    }

    const current = await getDatabase();
    const updated: DatabaseSchema = {
      ...current,
      ...(body.settings ? { settings: body.settings } : {}),
      ...(body.home ? { home: body.home } : {}),
      ...(body.about ? { about: body.about } : {}),
      ...(body.goldenEssencePage
        ? { goldenEssencePage: body.goldenEssencePage }
        : {}),
      ...(body.goldenEssenceProtocols
        ? { goldenEssenceProtocols: body.goldenEssenceProtocols }
        : {}),
      ...(body.procedures ? { procedures: body.procedures } : {}),
      ...(body.articleCategories
        ? { articleCategories: body.articleCategories }
        : {}),
      ...(body.articles ? { articles: body.articles } : {}),
      ...(body.contactSubmissions
        ? { contactSubmissions: body.contactSubmissions }
        : {}),
    };

    await saveDatabase(updated);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Failed to update database", err);
    return NextResponse.json(
      { error: "Erro ao salvar alterações no banco de dados MongoDB." },
      { status: 500 }
    );
  }
}
