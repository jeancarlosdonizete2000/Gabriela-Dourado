import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsappOrEmail, interest, message, consentGiven } = body;

    if (!name || !whatsappOrEmail || !message || !consentGiven) {
      return NextResponse.json(
        {
          error:
            "Por favor, preencha os campos obrigatórios e confirme o consentimento de privacidade.",
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const submission = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      whatsappOrEmail: String(whatsappOrEmail).trim(),
      interest: String(interest || "Avaliação / Dúvida Geral").trim(),
      message: String(message).trim(),
      consentGiven: Boolean(consentGiven),
      createdAt: new Date().toISOString(),
      read: false,
    };

    db.contactSubmissions = [submission, ...(db.contactSubmissions || [])];
    await saveDatabase(db);

    return NextResponse.json({ success: true, submission });
  } catch (err) {
    console.error("Failed to save contact submission", err);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem." },
      { status: 500 }
    );
  }
}
