import { useLanguage } from "@/hooks/useLanguage";
import { User, MessageSquare, Send, MessageCircle } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <main className="pt-16">
      <section className="section-spacing">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold mb-16">{t.about_page.title}</h1>

          {/* Origin */}
          <div className="grid gap-8 md:grid-cols-12 mb-24">
            <div className="md:col-span-3">
              <h2 className="font-heading text-2xl font-medium">{t.about_page.origin_heading}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="text-muted-foreground leading-relaxed">{t.about_page.origin_body}</p>
            </div>
          </div>

          {/* Mission Pillars */}
          <div className="mb-24">
            <h2 className="font-heading text-2xl font-medium mb-12">{t.about_page.mission_heading}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {t.why.items.map((item) => (
                <div key={item.number} className="border border-border rounded-sm p-6">
                  <span className="font-mono text-primary text-sm">{item.number}</span>
                  <h3 className="font-heading text-lg font-medium mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer */}
          <div className="mb-24">
            <h2 className="font-heading text-2xl font-medium mb-8">{t.about_page.organizer_heading}</h2>
            <div className="border border-border rounded-sm p-6 max-w-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-heading font-medium">{t.about_page.organizer_name}</p>
                  <p className="text-sm text-muted-foreground">{t.about_page.organizer_role}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{t.about_page.organizer_slack}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-primary rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Send size={18} className="text-primary" />
                <h3 className="font-heading text-lg font-medium">{t.about_page.cta_submit_title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.about_page.cta_submit_body}</p>
            </div>
            <div className="border border-border rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={18} className="text-muted-foreground" />
                <h3 className="font-heading text-lg font-medium">{t.about_page.cta_feedback_title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.about_page.cta_feedback_body}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
