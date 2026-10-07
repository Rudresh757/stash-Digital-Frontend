const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

export const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL ||
  "https://calendly.com/hello-stashdigitalmedia/30-minutes-discovery-call";

export const VSL_URL = import.meta.env.VITE_VSL_URL || "";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];
const STORAGE_KEY = "stash_utm";

/** Read UTM params from the URL once and remember them for the session. */
export function captureUtm() {
  const out = {};
  try {
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v.slice(0, 120);
    });
    if (Object.keys(out).length) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(out));
      return out;
    }
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return out;
  }
}

/** POST a lead. Throws Error with a user-friendly message on failure. */
export async function postLead(data) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...captureUtm(), source: "website", ...data }),
    });
  } catch {
    throw new Error("Can't reach the server. Please check your connection and try again.");
  }

  if (res.status === 429) throw new Error("Too many attempts. Please wait a minute and try again.");
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = typeof body.detail === "string" ? body.detail : "";
    } catch { /* ignore */ }
    throw new Error(detail || "Something went wrong. Please try again.");
  }
  return res.json();
}