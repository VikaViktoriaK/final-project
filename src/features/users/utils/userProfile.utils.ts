import type { UserRow } from "../types";

export function getUserFullName(user: UserRow): string {
  return `${user.firstName} ${user.lastName}`.trim() || "User";
}

export function getAvatarInitial(user: UserRow): string {
  return (user.firstName?.[0] ?? user.email?.[0] ?? "U").toUpperCase();
}

export function formatMemberSince(createdAt?: string): string {
  if (!createdAt) return "A memmer sinse -";
  const timestamp = Number(createdAt);
  const date = Number.isNaN(timestamp)
    ? new Date(createdAt)
    : new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "A memmer sinse -";
  return `A memmer sinse ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;
}
