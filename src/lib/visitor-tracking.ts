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

  const endpointUrl = url.toString();

  const sendTrackRequest = async (
    credentials: RequestCredentials,
  ): Promise<boolean> => {
    try {
      // Track visitor hits to backend even when frontend uses SPA routing.
      // Note: we avoid custom headers so the browser doesn't preflight unnecessarily.
      const res = await fetch(endpointUrl, {
        method: "GET",
        credentials,
        cache: "no-store",
        keepalive: true,
      });

      return res.ok;
    } catch {
      return false;
    }
  };

  try {
    // Primary: try with cookies enabled (credentials include).
    const okWithCredentials = await sendTrackRequest("include");
    if (!okWithCredentials) {
      // Fallback: some backends respond with Access-Control-Allow-Origin: '*'
      // which fails when credentials: 'include'. Retrying without credentials
      // allows tracking to work even if cookies are not required.
      const okWithoutCredentials = await sendTrackRequest("omit");
      if (!okWithoutCredentials) return;
    }

    saveTrackedUrl(currentUrl);
  } catch (error) {
    console.error("Visitor tracking request failed:", error);
  } finally {
    inFlightUrls.delete(currentUrl);
  }
}
