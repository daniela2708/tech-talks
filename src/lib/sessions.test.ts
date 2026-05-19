import { describe, expect, it } from "vitest";

import type { Session } from "@/data/sessions";
import {
  getSessionCalendarHref,
  getSessionDisplayDate,
  getSessionStatus,
} from "@/lib/sessions";

const upcomingSession: Session = {
  number: "09",
  topic_en: "Automated Deployments in Databricks (CI/CD)",
  topic_es: "Despliegues automatizados en Databricks (CI/CD)",
  speakers: ["Felipe Cristancho"],
  date: "2026-05-20",
  scheduled_at: "2026-05-20T17:00:00-05:00",
  time: "5:00 PM COT",
  location: "Hybrid - Wizeline Bogotá offices & Remote via Google Meet",
  meeting_url: "https://meet.google.com/bvn-heyo-vef",
  tags: ["MLOps", "Data Engineering"],
  status: "upcoming",
};

describe("session helpers", () => {
  it("keeps date-only strings on the intended calendar day", () => {
    const date = getSessionDisplayDate(upcomingSession);

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(4);
    expect(date.getDate()).toBe(20);
  });

  it("treats the session as upcoming before its scheduled time", () => {
    const now = new Date("2026-05-20T16:59:00-05:00");

    expect(getSessionStatus(upcomingSession, now)).toBe("upcoming");
  });

  it("treats the session as past once its scheduled time has started", () => {
    const now = new Date("2026-05-20T17:00:00-05:00");

    expect(getSessionStatus(upcomingSession, now)).toBe("past");
  });

  it("creates a calendar link with the meeting URL", () => {
    const href = getSessionCalendarHref(upcomingSession);

    expect(href).toContain("calendar.google.com");
    expect(href).toContain(encodeURIComponent("https://meet.google.com/bvn-heyo-vef"));
  });
});
