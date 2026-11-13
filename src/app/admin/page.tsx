"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Stethoscope,
  Home,
  User,
  Settings,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Save,
  Eye,
  Lock,
  LogOut,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import {
  DatabaseSchema,
  Article,
  Procedure,
  GoldenEssenceProtocol,
  ArticleCategory,
} from "@/lib/types";
import { ImageUploader } from "@/components/ImageUploader";

type AdminTab =
  | "articles"
  | "procedures"
  | "golden-essence"
  | "home"
  | "about"
  | "settings"
  | "messages"
  | "guide";

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [db, setDb] = useState<DatabaseSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<AdminTab>("articles");

  // Sub-editing states
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingProcedure, setEditingProcedure] = useState<Procedure | null>(
    null
  );
  const [editingProtocol, setEditingProtocol] =
    useState<GoldenEssenceProtocol | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryTagline, setNewCategoryTagline] = useState("");

  useEffect(() => {
    const savedPass = sessionStorage.getItem("gd_admin_pass");
    if (savedPass) {
      setPasswordInput(savedPass);
      setAuthenticated(true);
    }
    fetchDatabase();
  }, []);

  const fetchDatabase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms");
      const data = await res.json();
      setDb(data);
    } catch (e) {
      console.error("Failed to fetch CMS data", e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        sessionStorage.setItem("gd_admin_pass", passwordInput);
        setAuthenticated(true);
      } else {
        setAuthError(
          "Senha inválida."
        );
      }
    } catch {
      setAuthError("Erro ao autenticar.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    sessionStorage.removeItem("gd_admin_pass");
    setAuthenticated(false);
    setPasswordInput("");
  };

  const persistDatabase = async (
    updatedDb: DatabaseSchema,
    successMsg = "Alterações salvas com sucesso no site!"
  ) => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password":
            passwordInput ||
            sessionStorage.getItem("gd_admin_pass") ||
            "gabriela2026",
        },
        body: JSON.stringify(updatedDb),
      });
      if (!res.ok) {
        alert("Não foi possível salvar. Verifique sua sessão de login.");
        return;
      }
      const json = await res.json();
      setDb(json.data);
      showToast(successMsg);
    } catch (e) {
      console.error(e);
      alert("Erro de conexão ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-offwhite-pure rounded-3xl border border-gold/40 shadow-editorial p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-champagne/60 border border-gold/40 flex items-center justify-center mx-auto text-wine">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-3xl text-wine font-normal">
              Painel Administrativo
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Gabriela Dourado • Gestão de Conteúdo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-wine/10 border border-wine/30 text-xs text-wine text-center">
                {authError}
              </div>
            )}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs uppercase tracking-[0.16em] text-wine font-medium"
              >
                Senha de Acesso
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Digite sua senha..."
                className="w-full px-4 py-3 rounded-xl bg-offwhite border border-gold/40 text-sm focus:outline-none focus:border-wine"
              />
            </div>

            <button type="submit" className="w-full btn-wine justify-center">
              Entrar no Painel
            </button>
          </form>

          <div className="text-center pt-2 border-t border-gold/20">
            <Link
              href="/"
              className="text-xs text-graphite-muted hover:text-wine underline"
            >
              ← Voltar para o site público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !db) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center p-8">
        <p className="font-serif text-2xl text-wine">
          Carregando painel administrativo Gabriela Dourado...
        </p>
      </div>
    );
  }

  // Helper Handlers for Articles
  const handleCreateNewArticle = () => {
    const newArt: Article = {
      id: `art-${Date.now()}`,
      slug: `novo-artigo-${Date.now().toString().slice(-4)}`,
      status: "draft",
      featured: false,
      title: "Novo Artigo do The Beauty Edit",
      subtitle: "Subtítulo acolhedor explicando sobre o que vamos conversar...",
      categorySlug: db.articleCategories[0]?.slug || "skin-talks",
      coverImageUrl:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
      coverImageAlt: "Imagem de capa do artigo",
      excerpt:
        "Breve resumo que aparece no card da página inicial e na listagem da revista.",
      publishedAt: new Date().toISOString().slice(0, 10),
      readingTimeMinutes: 4,
      sections: [
        {
          heading: "Introdução da conversa",
          paragraphs: [
            "Escreva aqui seu primeiro parágrafo como se estivesse conversando com uma amiga no consultório...",
          ],
        },
      ],
      conclusion:
        "Uma frase final carinhosa para quem acabou de ler o seu artigo.",
      references: [],
    };
    setEditingArticle(newArt);
  };

  const handleSaveArticle = async (articleToSave: Article) => {
    const cleanSlug = slugify(articleToSave.slug || articleToSave.title);
    const finalArticle: Article = {
      ...articleToSave,
      slug: cleanSlug,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    const exists = db.articles.some((a) => a.id === finalArticle.id);
    const updatedArticles = exists
      ? db.articles.map((a) => (a.id === finalArticle.id ? finalArticle : a))
      : [finalArticle, ...db.articles];

    await persistDatabase(
      { ...db, articles: updatedArticles },
      "Artigo salvo com sucesso!"
    );
    setEditingArticle(null);
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;
    const updated = db.articles.filter((a) => a.id !== id);
    await persistDatabase({ ...db, articles: updated }, "Artigo removido.");
  };

  // Helper Handlers for Procedures
  const handleCreateNewProcedure = () => {
    const newProc: Procedure = {
      id: `proc-${Date.now()}`,
      slug: `novo-procedimento-${Date.now().toString().slice(-4)}`,
      order: db.procedures.length + 1,
      published: true,
      featuredOnHome: true,
      name: "Novo Procedimento Estético",
      category: "Cuidado Facial",
      shortDescription: "Breve explicação acessível para os cards do site.",
      imageUrl:
        "https://images.unsplash.com/photo-1512290900672-1f84d171c222?auto=format&fit=crop&w=1000&q=85",
      imageAlt: "Fotografia do procedimento",
      presentation:
        "Uma frase acolhedora introduzindo o procedimento para a paciente.",
      whatIsIt: "Explicação didática sobre o que é o procedimento.",
      howItWorks: "Explicação simples sobre como ele age na fisiologia da pele.",
      indications: ["Necessidade 1", "Necessidade 2"],
      expectedBenefits: ["Benefício esperado 1", "Benefício esperado 2"],
      howItIsPerformed: "Como é realizado no consultório passo a passo.",
      preCare: ["Cuidado pré-procedimento 1"],
      postCare: ["Cuidado pós-procedimento 1"],
      contraindications: ["Contraindicação importante 1"],
      faqs: [
        {
          question: "Pergunta comum das pacientes?",
          answer: "Resposta clara e acolhedora.",
        },
      ],
    };
    setEditingProcedure(newProc);
  };

  const handleSaveProcedure = async (procToSave: Procedure) => {
    const finalProc: Procedure = {
      ...procToSave,
      slug: slugify(procToSave.slug || procToSave.name),
    };
    const exists = db.procedures.some((p) => p.id === finalProc.id);
    const updated = exists
      ? db.procedures.map((p) => (p.id === finalProc.id ? finalProc : p))
      : [...db.procedures, finalProc];

    await persistDatabase(
      { ...db, procedures: updated },
      "Procedimento salvo no catálogo!"
    );
    setEditingProcedure(null);
  };

  const handleDeleteProcedure = async (id: string) => {
    if (!confirm("Deseja remover este procedimento do catálogo?")) return;
    const updated = db.procedures.filter((p) => p.id !== id);
    await persistDatabase(
      { ...db, procedures: updated },
      "Procedimento removido."
    );
  };

  // Helper Handlers for Golden Essence Protocols
  const handleCreateNewProtocol = () => {
    const newProt: GoldenEssenceProtocol = {
      id: `ge-${Date.now()}`,
      slug: `novo-protocolo-golden-essence-${Date.now().toString().slice(-4)}`,
      order: db.goldenEssenceProtocols.length + 1,
      published: true,
      commercialName: "Novo Protocolo Golden Essence",
      technicalCategory: "Cuidado Autoral",
      tagline: "Frase conceito do protocolo.",
      imageUrl:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=85",
      imageAlt: "Protocolo Golden Essence",
      shortDescription: "Resumo do protocolo para o card da coleção.",
      fullDescription: "Explicação completa e envolvente do protocolo.",
      objective: "Objetivo principal na pele.",
      skinNeeds: ["Necessidade avaliada 1"],
      howItWorks: "Como o protocolo atua na pele.",
      steps: [
        {
          stepNumber: "01",
          title: "Primeira Etapa",
          description: "Descrição da etapa.",
        },
      ],
      expectedBenefits: ["Benefício esperado 1"],
      preCare: ["Cuidado antes da sessão"],
      postCare: ["Cuidado após a sessão"],
      contraindicationsAndLimitations: [
        "Limitação ou contraindicação importante",
      ],
      individualEvaluationNote:
        "Lembrete sobre a importância da avaliação individual.",
      faqs: [
        {
          question: "Dúvida sobre o protocolo?",
          answer: "Resposta acolhedora.",
        },
      ],
    };
    setEditingProtocol(newProt);
  };

  const handleSaveProtocol = async (protToSave: GoldenEssenceProtocol) => {
    const finalProt: GoldenEssenceProtocol = {
      ...protToSave,
      slug: slugify(protToSave.slug || protToSave.commercialName),
    };
    const exists = db.goldenEssenceProtocols.some((p) => p.id === finalProt.id);
    const updated = exists
      ? db.goldenEssenceProtocols.map((p) =>
          p.id === finalProt.id ? finalProt : p
        )
      : [...db.goldenEssenceProtocols, finalProt];

    await persistDatabase(
      { ...db, goldenEssenceProtocols: updated },
      "Protocolo Golden Essence salvo!"
    );
    setEditingProtocol(null);
  };

  const moveProtocolOrder = async (index: number, direction: "up" | "down") => {
    const sorted = [...db.goldenEssenceProtocols].sort(
      (a, b) => a.order - b.order
    );
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;
    const temp = sorted[index];
    sorted[index] = sorted[targetIdx];
    sorted[targetIdx] = temp;
    const reordered = sorted.map((item, idx) => ({ ...item, order: idx + 1 }));
    await persistDatabase(
      { ...db, goldenEssenceProtocols: reordered },
      "Ordem de exibição atualizada!"
    );
  };

  return (
    <div className="min-h-screen bg-offwhite flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-graphite text-offwhite p-6 flex flex-col justify-between shrink-0 border-b lg:border-b-0 lg:border-r border-gold/30">
        <div className="space-y-8">
          <div className="space-y-1 border-b border-gold/25 pb-5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold block">
              Painel Administrativo
            </span>
            <h1 className="font-serif text-2xl text-champagne">
              Gabriela Dourado
            </h1>
            <p className="text-xs text-offwhite/65">
              Gerencie textos, fotos, protocolos e artigos sem código.
            </p>
          </div>

          <nav className="space-y-1.5">
            {[
              {
                id: "articles",
                label: "1. The Beauty Edit (Artigos)",
                icon: BookOpen,
              },
              {
                id: "procedures",
                label: "2. Procedimentos",
                icon: Stethoscope,
              },
              {
                id: "golden-essence",
                label: "3. Golden Essence",
                icon: Sparkles,
              },
              {
                id: "home",
                label: "4. Página Inicial",
                icon: Home,
              },
              {
                id: "about",
                label: "5. Sobre Gabriela",
                icon: User,
              },
              {
                id: "settings",
                label: "6. WhatsApp & Dados Gerais",
                icon: Settings,
              },
              {
                id: "messages",
                label: `7. Mensagens (${db.contactSubmissions?.length || 0})`,
                icon: Mail,
              },
              {
                id: "guide",
                label: "8. Como usar o Painel",
                icon: HelpCircle,
              },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setEditingArticle(null);
                    setEditingProcedure(null);
                    setEditingProtocol(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left ${
                    active
                      ? "bg-wine text-champagne border border-gold/40"
                      : "text-offwhite/75 hover:bg-offwhite/10 hover:text-offwhite"
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-gold/20 space-y-3 mt-8">
          <Link
            href="/"
            target="_blank"
            className="w-full inline-flex items-center justify-center gap-2 bg-champagne/15 hover:bg-champagne/25 text-champagne px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            <Eye className="w-4 h-4 text-gold" />
            <span>Ver Site Público</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 text-xs text-offwhite/60 hover:text-offwhite py-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do painel</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-wine text-offwhite px-5 py-3.5 rounded-2xl shadow-editorial border border-gold flex items-center gap-2.5 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-gold" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* TAB 1: GERENCIAR ARTIGOS (12.1) */}
        {activeTab === "articles" && (
          <div className="max-w-5xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/30 pb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  The Beauty Edit • Revista Digital
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                  Gerenciar Artigos & Categorias
                </h2>
              </div>
              {!editingArticle && (
                <button
                  type="button"
                  onClick={handleCreateNewArticle}
                  className="btn-wine"
                >
                  <Plus className="w-4 h-4" />
                  <span>Criar Novo Artigo</span>
                </button>
              )}
            </div>

            {editingArticle ? (
              <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/40 shadow-card space-y-6">
                <div className="flex items-center justify-between border-b border-gold/25 pb-4">
                  <h3 className="font-serif text-2xl text-wine">
                    Editando Artigo
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingArticle(null)}
                    className="text-xs text-graphite-muted hover:text-wine underline"
                  >
                    Cancelar e voltar à lista
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Título do Artigo
                    </label>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Subtítulo
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.subtitle}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          subtitle: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Categoria Editorial
                    </label>
                    <select
                      value={editingArticle.categorySlug}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          categorySlug: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    >
                      {db.articleCategories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Status de Publicação
                    </label>
                    <select
                      value={editingArticle.status}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          status: e.target.value as Article["status"],
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    >
                      <option value="published">Publicado</option>
                      <option value="draft">Rascunho (Oculto no site)</option>
                      <option value="scheduled">Programado</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Data de Publicação
                    </label>
                    <input
                      type="date"
                      value={editingArticle.publishedAt}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          publishedAt: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Tempo estimado de leitura (minutos)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={editingArticle.readingTimeMinutes}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          readingTimeMinutes: Number(e.target.value) || 4,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImageUploader
                      label="Fotografia de Capa do Artigo"
                      value={editingArticle.coverImageUrl}
                      onChange={(newImg) =>
                        setEditingArticle({
                          ...editingArticle,
                          coverImageUrl: newImg,
                        })
                      }
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Resumo curto para os cards (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.excerpt}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          excerpt: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2 pt-1">
                    <input
                      id="art-featured"
                      type="checkbox"
                      checked={editingArticle.featured}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          featured: e.target.checked,
                        })
                      }
                      className="accent-wine"
                    />
                    <label
                      htmlFor="art-featured"
                      className="text-sm text-graphite font-medium"
                    >
                      Destacar este artigo no topo do The Beauty Edit
                    </label>
                  </div>
                </div>

                {/* Sections Editor */}
                <div className="space-y-4 pt-4 border-t border-gold/25">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl text-wine">
                      Seções e Parágrafos do Artigo
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingArticle({
                          ...editingArticle,
                          sections: [
                            ...editingArticle.sections,
                            {
                              heading: "Novo Subtítulo",
                              paragraphs: ["Texto do parágrafo..."],
                            },
                          ],
                        })
                      }
                      className="btn-outline-wine text-xs py-2 px-4"
                    >
                      + Adicionar Seção
                    </button>
                  </div>

                  {editingArticle.sections.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-5 rounded-2xl bg-offwhite border border-gold/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-gold font-medium">
                          Seção #{sIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingArticle({
                              ...editingArticle,
                              sections: editingArticle.sections.filter(
                                (_, i) => i !== sIdx
                              ),
                            })
                          }
                          className="text-xs text-wine hover:underline"
                        >
                          Remover seção
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Subtítulo da seção"
                        value={sec.heading || ""}
                        onChange={(e) => {
                          const next = [...editingArticle.sections];
                          next[sIdx] = {
                            ...next[sIdx],
                            heading: e.target.value,
                          };
                          setEditingArticle({
                            ...editingArticle,
                            sections: next,
                          });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-offwhite-pure border border-gold/30 text-sm font-medium"
                      />

                      <div className="space-y-1">
                        <label className="text-[11px] text-graphite-muted">
                          Parágrafos (separe cada parágrafo pulando uma linha em
                          branco):
                        </label>
                        <textarea
                          rows={5}
                          value={sec.paragraphs.join("\n\n")}
                          onChange={(e) => {
                            const next = [...editingArticle.sections];
                            next[sIdx] = {
                              ...next[sIdx],
                              paragraphs: e.target.value
                                .split(/\n\s*\n/)
                                .map((p) => p.trim())
                                .filter(Boolean),
                            };
                            setEditingArticle({
                              ...editingArticle,
                              sections: next,
                            });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-offwhite-pure border border-gold/30 text-sm leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                <div className="space-y-1 pt-4 border-t border-gold/25">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Frase de Conclusão ("Para guardar com carinho")
                  </label>
                  <textarea
                    rows={2}
                    value={editingArticle.conclusion}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        conclusion: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                {/* Scientific References Editor */}
                <div className="space-y-4 pt-4 border-t border-gold/25">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl text-wine">
                      Referências Científicas
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingArticle({
                          ...editingArticle,
                          references: [
                            ...editingArticle.references,
                            {
                              authors: "Autor et al.",
                              title: "Título do estudo científico",
                              journal: "Nome da Revista",
                              year: "2026",
                              doiOrUrl: "https://",
                            },
                          ],
                        })
                      }
                      className="btn-outline-wine text-xs py-2 px-4"
                    >
                      + Adicionar Referência
                    </button>
                  </div>

                  {editingArticle.references.map((ref, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 rounded-2xl bg-offwhite border border-gold/30 grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <input
                        type="text"
                        placeholder="Autor(es)"
                        value={ref.authors}
                        onChange={(e) => {
                          const next = [...editingArticle.references];
                          next[rIdx] = { ...next[rIdx], authors: e.target.value };
                          setEditingArticle({
                            ...editingArticle,
                            references: next,
                          });
                        }}
                        className="px-3 py-2 rounded-lg bg-offwhite-pure border border-gold/30 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Revista / Publicação"
                        value={ref.journal}
                        onChange={(e) => {
                          const next = [...editingArticle.references];
                          next[rIdx] = { ...next[rIdx], journal: e.target.value };
                          setEditingArticle({
                            ...editingArticle,
                            references: next,
                          });
                        }}
                        className="px-3 py-2 rounded-lg bg-offwhite-pure border border-gold/30 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Título do Estudo"
                        value={ref.title}
                        onChange={(e) => {
                          const next = [...editingArticle.references];
                          next[rIdx] = { ...next[rIdx], title: e.target.value };
                          setEditingArticle({
                            ...editingArticle,
                            references: next,
                          });
                        }}
                        className="sm:col-span-2 px-3 py-2 rounded-lg bg-offwhite-pure border border-gold/30 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Ano (ex: 2024)"
                        value={ref.year}
                        onChange={(e) => {
                          const next = [...editingArticle.references];
                          next[rIdx] = { ...next[rIdx], year: e.target.value };
                          setEditingArticle({
                            ...editingArticle,
                            references: next,
                          });
                        }}
                        className="px-3 py-2 rounded-lg bg-offwhite-pure border border-gold/30 text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Link ou DOI"
                          value={ref.doiOrUrl || ""}
                          onChange={(e) => {
                            const next = [...editingArticle.references];
                            next[rIdx] = {
                              ...next[rIdx],
                              doiOrUrl: e.target.value,
                            };
                            setEditingArticle({
                              ...editingArticle,
                              references: next,
                            });
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-offwhite-pure border border-gold/30 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingArticle({
                              ...editingArticle,
                              references: editingArticle.references.filter(
                                (_, i) => i !== rIdx
                              ),
                            })
                          }
                          className="text-wine p-2 hover:bg-wine/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveArticle(editingArticle)}
                    className="btn-wine"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Artigo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingArticle(null)}
                    className="btn-outline-wine"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Articles List */}
                <div className="space-y-4">
                  {db.articles.map((art) => (
                    <div
                      key={art.id}
                      className="p-6 rounded-2xl bg-offwhite-pure border border-gold/30 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                              art.status === "published"
                                ? "bg-wine text-offwhite"
                                : "bg-champagne text-graphite"
                            }`}
                          >
                            {art.status === "published"
                              ? "Publicado"
                              : art.status === "draft"
                              ? "Rascunho"
                              : "Programado"}
                          </span>
                          <span className="text-xs text-gold font-medium">
                            {
                              db.articleCategories.find(
                                (c) => c.slug === art.categorySlug
                              )?.name
                            }
                          </span>
                          <span className="text-xs text-graphite-light">
                            • {art.publishedAt}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl text-wine font-medium">
                          {art.title}
                        </h3>
                        <p className="text-xs text-graphite-muted line-clamp-1">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingArticle(art)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne/60 hover:bg-champagne text-wine text-xs font-medium"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-2 rounded-full text-graphite-light hover:text-wine hover:bg-wine/10"
                          title="Excluir artigo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create Category Sub-panel */}
                <div className="p-6 rounded-2xl bg-champagne/30 border border-gold/35 space-y-4">
                  <h3 className="font-serif text-2xl text-wine">
                    Categorias do The Beauty Edit
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {db.articleCategories.map((c) => (
                      <span
                        key={c.id}
                        className="px-3.5 py-1.5 rounded-full bg-offwhite border border-gold/35 text-xs text-wine font-medium"
                      >
                        {c.name} —{" "}
                        <span className="text-graphite-muted">{c.tagline}</span>
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Nome da nova categoria"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-offwhite border border-gold/35 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Breve descrição / subtítulo"
                      value={newCategoryTagline}
                      onChange={(e) => setNewCategoryTagline(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-offwhite border border-gold/35 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newCategoryName.trim()) return;
                        const newCat: ArticleCategory = {
                          id: `cat-${Date.now()}`,
                          slug: slugify(newCategoryName),
                          name: newCategoryName.trim(),
                          tagline:
                            newCategoryTagline.trim() ||
                            "Editoria The Beauty Edit",
                          description:
                            newCategoryTagline.trim() ||
                            "Conteúdos selecionados sobre beleza e ciência.",
                        };
                        persistDatabase(
                          {
                            ...db,
                            articleCategories: [
                              ...db.articleCategories,
                              newCat,
                            ],
                          },
                          "Nova categoria criada!"
                        );
                        setNewCategoryName("");
                        setNewCategoryTagline("");
                      }}
                      className="btn-wine py-2 text-xs"
                    >
                      + Criar Categoria
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 2: GERENCIAR PROCEDIMENTOS (12.2) */}
        {activeTab === "procedures" && (
          <div className="max-w-5xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/30 pb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Catálogo Clínico
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                  Gerenciar Procedimentos
                </h2>
              </div>
              {!editingProcedure && (
                <button
                  type="button"
                  onClick={handleCreateNewProcedure}
                  className="btn-wine"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Procedimento</span>
                </button>
              )}
            </div>

            {editingProcedure ? (
              <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/40 shadow-card space-y-5">
                <h3 className="font-serif text-2xl text-wine">
                  Editando: {editingProcedure.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Nome do Procedimento
                    </label>
                    <input
                      type="text"
                      value={editingProcedure.name}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={editingProcedure.category}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImageUploader
                      label="Fotografia Principal do Procedimento"
                      value={editingProcedure.imageUrl}
                      onChange={(newImg) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          imageUrl: newImg,
                        })
                      }
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Breve Descrição (Card)
                    </label>
                    <textarea
                      rows={2}
                      value={editingProcedure.shortDescription}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          shortDescription: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Apresentação Inicial
                    </label>
                    <textarea
                      rows={2}
                      value={editingProcedure.presentation}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          presentation: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      O que é?
                    </label>
                    <textarea
                      rows={4}
                      value={editingProcedure.whatIsIt}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          whatIsIt: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Como funciona?
                    </label>
                    <textarea
                      rows={4}
                      value={editingProcedure.howItWorks}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          howItWorks: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Como é realizado?
                    </label>
                    <textarea
                      rows={3}
                      value={editingProcedure.howItIsPerformed}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          howItIsPerformed: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Indicações (1 por linha)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProcedure.indications.join("\n")}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          indications: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Benefícios Esperados (1 por linha)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProcedure.expectedBenefits.join("\n")}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          expectedBenefits: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Cuidados Antes (1 por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={editingProcedure.preCare.join("\n")}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          preCare: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Cuidados Depois (1 por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={editingProcedure.postCare.join("\n")}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          postCare: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Contraindicações (1 por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={editingProcedure.contraindications.join("\n")}
                      onChange={(e) =>
                        setEditingProcedure({
                          ...editingProcedure,
                          contraindications: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm text-graphite font-medium">
                      <input
                        type="checkbox"
                        checked={editingProcedure.published}
                        onChange={(e) =>
                          setEditingProcedure({
                            ...editingProcedure,
                            published: e.target.checked,
                          })
                        }
                        className="accent-wine"
                      />
                      <span>Publicado no Catálogo</span>
                    </label>

                    <label className="flex items-center gap-2 text-sm text-graphite font-medium">
                      <input
                        type="checkbox"
                        checked={editingProcedure.featuredOnHome}
                        onChange={(e) =>
                          setEditingProcedure({
                            ...editingProcedure,
                            featuredOnHome: e.target.checked,
                          })
                        }
                        className="accent-wine"
                      />
                      <span>Exibir também na Página Inicial</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveProcedure(editingProcedure)}
                    className="btn-wine"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Procedimento</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProcedure(null)}
                    className="btn-outline-wine"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {db.procedures.map((proc) => (
                  <div
                    key={proc.id}
                    className="p-6 rounded-2xl bg-offwhite-pure border border-gold/30 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                            proc.published
                              ? "bg-wine text-offwhite"
                              : "bg-champagne text-graphite"
                          }`}
                        >
                          {proc.published ? "No catálogo" : "Oculto"}
                        </span>
                        <span className="text-xs text-gold font-medium">
                          {proc.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-wine font-medium">
                        {proc.name}
                      </h3>
                      <p className="text-xs text-graphite-muted line-clamp-1">
                        {proc.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingProcedure(proc)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne/60 hover:bg-champagne text-wine text-xs font-medium"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProcedure(proc.id)}
                        className="p-2 rounded-full text-graphite-light hover:text-wine hover:bg-wine/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GERENCIAR GOLDEN ESSENCE (12.3) */}
        {activeTab === "golden-essence" && (
          <div className="max-w-5xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/30 pb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Coleção Autoral
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                  Gerenciar Protocolos Golden Essence
                </h2>
              </div>
              {!editingProtocol && (
                <button
                  type="button"
                  onClick={handleCreateNewProtocol}
                  className="btn-wine"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Protocolo</span>
                </button>
              )}
            </div>

            {/* Hero Principal da Coleção Golden Essence */}
            {!editingProtocol && (
              <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/35 shadow-card space-y-5">
                <h3 className="font-serif text-2xl text-wine">
                  Apresentação Geral da Página Golden Essence
                </h3>
                <ImageUploader
                  label="Fotografia de Destaque da Coleção Golden Essence"
                  value={db.goldenEssencePage.heroImageUrl}
                  aspectRatioClass="aspect-[4/5]"
                  onChange={(newImg) =>
                    setDb({
                      ...db,
                      goldenEssencePage: {
                        ...db.goldenEssencePage,
                        heroImageUrl: newImg,
                      },
                    })
                  }
                />
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    persistDatabase(
                      db,
                      "Foto da página Golden Essence atualizada!"
                    )
                  }
                  className="btn-wine"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Apresentação Golden Essence</span>
                </button>
              </div>
            )}

            {editingProtocol ? (
              <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/40 shadow-card space-y-5">
                <h3 className="font-serif text-2xl text-wine">
                  Editando Protocolo: {editingProtocol.commercialName}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Nome Comercial do Protocolo
                    </label>
                    <input
                      type="text"
                      value={editingProtocol.commercialName}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          commercialName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Base Técnica (Ex: Limpeza de Pele, Peeling Químico)
                    </label>
                    <input
                      type="text"
                      value={editingProtocol.technicalCategory}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          technicalCategory: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Tagline / Frase Conceito
                    </label>
                    <input
                      type="text"
                      value={editingProtocol.tagline}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          tagline: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImageUploader
                      label="Fotografia do Protocolo Golden Essence"
                      value={editingProtocol.imageUrl}
                      onChange={(newImg) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          imageUrl: newImg,
                        })
                      }
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Descrição Completa
                    </label>
                    <textarea
                      rows={4}
                      value={editingProtocol.fullDescription}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          fullDescription: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Objetivo do Protocolo
                    </label>
                    <textarea
                      rows={2}
                      value={editingProtocol.objective}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          objective: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Necessidades da Pele Avaliadas (1 por linha)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProtocol.skinNeeds.join("\n")}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          skinNeeds: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-wine font-medium">
                      Benefícios Esperados (1 por linha)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProtocol.expectedBenefits.join("\n")}
                      onChange={(e) =>
                        setEditingProtocol({
                          ...editingProtocol,
                          expectedBenefits: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveProtocol(editingProtocol)}
                    className="btn-wine"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Protocolo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProtocol(null)}
                    className="btn-outline-wine"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[...db.goldenEssenceProtocols]
                  .sort((a, b) => a.order - b.order)
                  .map((prot, idx) => (
                    <div
                      key={prot.id}
                      className="p-6 rounded-2xl bg-offwhite-pure border border-gold/35 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider text-gold font-medium">
                          Ordem 0{idx + 1} • {prot.technicalCategory}
                        </span>
                        <h3 className="font-serif text-2xl text-wine font-medium">
                          {prot.commercialName}
                        </h3>
                        <p className="text-xs text-graphite-muted">
                          {prot.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveProtocolOrder(idx, "up")}
                          title="Subir ordem"
                          className="p-2 rounded-full bg-champagne/40 hover:bg-champagne text-wine"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProtocolOrder(idx, "down")}
                          title="Descer ordem"
                          className="p-2 rounded-full bg-champagne/40 hover:bg-champagne text-wine"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProtocol(prot)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne/60 hover:bg-champagne text-wine text-xs font-medium"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar Protocolo</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: GERENCIAR PÁGINA INICIAL (12.4) */}
        {activeTab === "home" && (
          <div className="max-w-4xl space-y-8">
            <div className="border-b border-gold/30 pb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Customização da Porta de Entrada
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                Gerenciar Página Inicial
              </h2>
            </div>

            <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/35 shadow-card space-y-6">
              <h3 className="font-serif text-2xl text-wine">
                Seção 1: Hero (Topo do Site)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Chamada Principal (Slogan)
                  </label>
                  <input
                    type="text"
                    value={db.home.hero.title}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        home: {
                          ...db.home,
                          hero: { ...db.home.hero, title: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUploader
                    label="Fotografia Principal da Gabriela (Hero Topo do Site)"
                    value={db.home.hero.imageUrl}
                    aspectRatioClass="aspect-[4/5]"
                    onChange={(newImg) =>
                      setDb({
                        ...db,
                        home: {
                          ...db.home,
                          hero: { ...db.home.hero, imageUrl: newImg },
                        },
                      })
                    }
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Subtítulo de Destaque
                  </label>
                  <input
                    type="text"
                    value={db.home.hero.subtitle}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        home: {
                          ...db.home,
                          hero: { ...db.home.hero, subtitle: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Texto Curto de Apresentação
                  </label>
                  <textarea
                    rows={2}
                    value={db.home.hero.description}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        home: {
                          ...db.home,
                          hero: {
                            ...db.home.hero,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>
              </div>

              <h3 className="font-serif text-2xl text-wine pt-4 border-t border-gold/25">
                Seção 2: Destaque Golden Essence na Home
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Texto Principal Golden Essence
                  </label>
                  <textarea
                    rows={2}
                    value={db.home.goldenEssenceSection.description}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        home: {
                          ...db.home,
                          goldenEssenceSection: {
                            ...db.home.goldenEssenceSection,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>
                <ImageUploader
                  label="Fotografia Golden Essence na Página Inicial"
                  value={db.home.goldenEssenceSection.imageUrl}
                  aspectRatioClass="aspect-[4/5]"
                  onChange={(newImg) =>
                    setDb({
                      ...db,
                      home: {
                        ...db.home,
                        goldenEssenceSection: {
                          ...db.home.goldenEssenceSection,
                          imageUrl: newImg,
                        },
                      },
                    })
                  }
                />
              </div>

              <h3 className="font-serif text-2xl text-wine pt-4 border-t border-gold/25">
                Seção 5 & 6: Apresentação Gabriela & Chamada de Contato
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <ImageUploader
                  label="Fotografia da Gabriela (Seção Sobre na Página Inicial)"
                  value={db.home.aboutSection.imageUrl}
                  aspectRatioClass="aspect-[4/5]"
                  onChange={(newImg) =>
                    setDb({
                      ...db,
                      home: {
                        ...db.home,
                        aboutSection: {
                          ...db.home.aboutSection,
                          imageUrl: newImg,
                        },
                      },
                    })
                  }
                />
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Chamada de Contato no Rodapé da Home
                  </label>
                  <input
                    type="text"
                    value={db.home.contactBanner.title}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        home: {
                          ...db.home,
                          contactBanner: {
                            ...db.home.contactBanner,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    persistDatabase(db, "Página Inicial atualizada!")
                  }
                  className="btn-wine"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações da Página Inicial</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SOBRE GABRIELA */}
        {activeTab === "about" && (
          <div className="max-w-4xl space-y-8">
            <div className="border-b border-gold/30 pb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Trajetória & Identidade
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                Editar Página “Sobre Gabriela”
              </h2>
            </div>

            <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/35 shadow-card space-y-5">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-wine font-medium">
                  Título da Página
                </label>
                <input
                  type="text"
                  value={db.about.heroTitle}
                  onChange={(e) =>
                    setDb({
                      ...db,
                      about: { ...db.about, heroTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                />
              </div>

              <ImageUploader
                label="Fotografia Profissional da Gabriela (Página Sobre)"
                value={db.about.heroImageUrl}
                aspectRatioClass="aspect-[4/5]"
                onChange={(newImg) =>
                  setDb({
                    ...db,
                    about: { ...db.about, heroImageUrl: newImg },
                  })
                }
              />

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-wine font-medium">
                  Apresentação Pessoal (1 parágrafo por linha em branco)
                </label>
                <textarea
                  rows={6}
                  value={db.about.personalIntro.join("\n\n")}
                  onChange={(e) =>
                    setDb({
                      ...db,
                      about: {
                        ...db.about,
                        personalIntro: e.target.value
                          .split(/\n\s*\n/)
                          .map((p) => p.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-wine font-medium">
                  Cursos e Qualificações Relevantes (1 por linha)
                </label>
                <textarea
                  rows={5}
                  value={db.about.qualifications.join("\n")}
                  onChange={(e) =>
                    setDb({
                      ...db,
                      about: {
                        ...db.about,
                        qualifications: e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                />
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  persistDatabase(db, "Página Sobre Gabriela atualizada!")
                }
                className="btn-wine"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Página Sobre Gabriela</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: CONFIGURAÇÕES GERAIS & WHATSAPP */}
        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-8">
            <div className="border-b border-gold/30 pb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Integrações & Contatos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                WhatsApp, Instagram & Informações Profissionais
              </h2>
            </div>

            <div className="bg-offwhite-pure p-8 rounded-3xl border border-gold/35 shadow-card space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Número do WhatsApp (com DDD e 55, apenas números)
                  </label>
                  <input
                    type="text"
                    value={db.settings.whatsappNumber}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: {
                          ...db.settings,
                          whatsappNumber: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Registro Profissional (CRBM)
                  </label>
                  <input
                    type="text"
                    value={db.settings.crbm}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: { ...db.settings, crbm: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Mensagem Automática Inicial do WhatsApp
                  </label>
                  <textarea
                    rows={2}
                    value={db.settings.whatsappDefaultMessage}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: {
                          ...db.settings,
                          whatsappDefaultMessage: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Arroba do Instagram
                  </label>
                  <input
                    type="text"
                    value={db.settings.instagramHandle}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: {
                          ...db.settings,
                          instagramHandle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Link Completo do Instagram
                  </label>
                  <input
                    type="text"
                    value={db.settings.instagramUrl}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: {
                          ...db.settings,
                          instagramUrl: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Cidade / Localização
                  </label>
                  <input
                    type="text"
                    value={db.settings.location}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: { ...db.settings, location: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Horários de Atendimento
                  </label>
                  <input
                    type="text"
                    value={db.settings.businessHours}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: {
                          ...db.settings,
                          businessHours: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-wine font-medium">
                    Detalhes do Local de Atendimento
                  </label>
                  <input
                    type="text"
                    value={db.settings.addressDetails}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        settings: {
                          ...db.settings,
                          addressDetails: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-offwhite border border-gold/35 text-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  persistDatabase(db, "Configurações de contato atualizadas!")
                }
                className="btn-wine"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Configurações</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: MENSAGENS RECEBIDAS */}
        {activeTab === "messages" && (
          <div className="max-w-4xl space-y-6">
            <div className="border-b border-gold/30 pb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Formulário de Contato
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                Mensagens Recebidas pelo Site
              </h2>
            </div>

            {!db.contactSubmissions || db.contactSubmissions.length === 0 ? (
              <div className="p-10 rounded-3xl bg-offwhite-pure border border-gold/30 text-center space-y-2">
                <p className="font-serif text-2xl text-wine">
                  Nenhuma mensagem enviada pelo formulário ainda.
                </p>
                <p className="text-sm text-graphite-muted">
                  Quando alguém preencher o formulário opcional na página de
                  Contato, o recado aparecerá aqui!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {db.contactSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 rounded-2xl bg-offwhite-pure border border-gold/30 shadow-card space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif text-xl text-wine font-medium">
                        {sub.name} —{" "}
                        <span className="text-gold">{sub.whatsappOrEmail}</span>
                      </h3>
                      <span className="text-xs text-graphite-light">
                        {new Date(sub.createdAt).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-wine/80 font-medium">
                      Assunto: {sub.interest}
                    </p>
                    <p className="text-sm text-graphite bg-offwhite p-4 rounded-xl border border-gold/20">
                      {sub.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: ORIENTAÇÃO DE USO DO PAINEL (12.5) */}
        {activeTab === "guide" && (
          <div className="max-w-4xl space-y-8">
            <div className="border-b border-gold/30 pb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Guia Rápido • Feito para a Gabriela
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                Como atualizar o seu site com facilidade
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 rounded-3xl bg-offwhite-pure border border-gold/35 space-y-3">
                <h3 className="font-serif text-2xl text-wine">
                  1. Publicando no The Beauty Edit
                </h3>
                <p className="text-sm text-graphite-muted leading-relaxed">
                  Na aba <strong>The Beauty Edit (Artigos)</strong>, clique em{" "}
                  <em>Criar Novo Artigo</em>. Você pode salvar como{" "}
                  <strong>Rascunho</strong> enquanto estiver escrevendo e mudar
                  para <strong>Publicado</strong> quando quiser que apareça no
                  site. Não esqueça de adicionar as Referências Científicas no
                  final!
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-offwhite-pure border border-gold/35 space-y-3">
                <h3 className="font-serif text-2xl text-wine">
                  2. Atualizando Procedimentos
                </h3>
                <p className="text-sm text-graphite-muted leading-relaxed">
                  Na aba <strong>Procedimentos</strong>, você pode cadastrar
                  novos procedimentos conforme ampliar sua atuação, editar as
                  orientações pré e pós-procedimento ou desmarcar a caixinha{" "}
                  <em>Publicado no Catálogo</em> caso queira pausar algum
                  procedimento temporariamente.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-offwhite-pure border border-gold/35 space-y-3">
                <h3 className="font-serif text-2xl text-wine">
                  3. Coleção Golden Essence
                </h3>
                <p className="text-sm text-graphite-muted leading-relaxed">
                  Na aba <strong>Golden Essence</strong>, você pode ajustar os
                  nomes comerciais dos seus protocolos autorais, reordenar a
                  exibição usando as setinhas para cima/baixo e personalizar os
                  passos de cada experiência.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-offwhite-pure border border-gold/35 space-y-3">
                <h3 className="font-serif text-2xl text-wine">
                  4. Trocando Fotos e WhatsApp
                </h3>
                <p className="text-sm text-graphite-muted leading-relaxed">
                  Em qualquer seção do painel, clique no botão{" "}
                  <strong>Escolher foto no dispositivo</strong> (ou arraste a
                  foto para a área tracejada) para anexar uma imagem direto do
                  seu computador ou celular. Ela será otimizada e salva
                  automaticamente no seu banco de dados MongoDB! Na aba{" "}
                  <strong>WhatsApp & Dados Gerais</strong>, você altera seu
                  número e mensagem automática em segundos.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
