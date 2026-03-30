import { API_BASE_URL } from "@/lib/api-constants";

const TRACK_THROTTLE_MS = 5000;
const TRACKED_URLS_STORAGE_KEY = "visitor-tracked-urls";

let lastTrackedAt = 0;
// Prevent duplicate requests while a previous tracking request is still in-flight.
const inFlightUrls = new Set<string>();

function getTrackedUrls(): Set<string> {
  try {
    const raw = sessionStorage.getItem(TRACKED_URLS_STORAGE_KEY);
    if (!raw) {
      return new Set<string>();
    }

    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

function saveTrackedUrl(url: string): void {
  const trackedUrls = getTrackedUrls();
  trackedUrls.add(url);
  sessionStorage.setItem(TRACKED_URLS_STORAGE_KEY, JSON.stringify(Array.from(trackedUrls)));
}

export async function trackVisitor(currentUrl: string): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const trackedUrls = getTrackedUrls();
  if (trackedUrls.has(currentUrl)) {
    return;
  }
  if (inFlightUrls.has(currentUrl)) {
    return;
  }

  const now = Date.now();
  if (now - lastTrackedAt < TRACK_THROTTLE_MS) {
    return;
  }

  const endpoint = `${API_BASE_URL}/__visitor/track`;
  const url = new URL(endpoint);
  url.searchParams.set("url", currentUrl);

  inFlightUrls.add(currentUrl);
  // Update throttle immediately so fast route changes don't queue extra requests.
  lastTrackedAt = now;

  try {
    // Track visitor hits to backend even when frontend uses SPA routing.
    await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      keepalive: true,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    saveTrackedUrl(currentUrl);
  } catch (error) {
    console.error("Visitor tracking request failed:", error);
  } finally {
    inFlightUrls.delete(currentUrl);
  }
}
