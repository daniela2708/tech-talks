import { differenceInCalendarDays } from "date-fns";

import type { Session } from "@/data/sessions";

export function getSessionDisplayDate(session: Session) {
  const [year, month, day] = session.date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function getSessionStartDate(session: Session) {
  return session.scheduled_at ? new Date(session.scheduled_at) : getSessionDisplayDate(session);
}

export function getSessionStatus(
  session: Session,
  now: Date = new Date(),
): Session["status"] {
  if (!session.scheduled_at) {
    return session.status;
  }

  return getSessionStartDate(session).getTime() > now.getTime() ? "upcoming" : "past";
}

export function getSessionDayDistance(session: Session, now: Date = new Date()) {
  return differenceInCalendarDays(getSessionDisplayDate(session), now);
}

function toCalendarTimestamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function getSessionCalendarHref(session: Session) {
  if (!session.scheduled_at) {
    return null;
  }

  const start = getSessionStartDate(session);
  const durationMs = (session.duration_minutes ?? 60) * 60_000;
  const end = new Date(start.getTime() + durationMs);
  const details = [
    session.description_en,
    session.description_es,
    session.meeting_url ? `Remote: ${session.meeting_url}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: session.topic_en,
    dates: `${toCalendarTimestamp(start)}/${toCalendarTimestamp(end)}`,
    details,
  });

  if (session.location) {
    params.set("location", session.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
