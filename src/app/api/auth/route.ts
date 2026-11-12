import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gabriela2026";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ authenticated: true });
      res.cookies.set("gd_admin_auth", ADMIN_PASSWORD, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        sameSite: "lax",
      });
      return res;
    }
    return NextResponse.json(
      { authenticated: false, error: "Senha incorreta." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { authenticated: false, error: "Requisição inválida." },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ authenticated: false });
  res.cookies.delete("gd_admin_auth");
  return res;
}
