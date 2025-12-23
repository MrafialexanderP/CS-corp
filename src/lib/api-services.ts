import {
  Production,
  Vision,
  Event,
  PRODUCTION_API,
  VISIONS_API,
  EVENTS_API,
  API_TIMEOUT,
} from './api-constants';

/**
 * Fetch productions from the API
 */
export async function fetchProductions(): Promise<Production[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(PRODUCTION_API.LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch productions: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching productions:', error);
    throw error;
  }
}

/**
 * Fetch a single production by ID
 */
export async function fetchProductionById(id: number): Promise<Production> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(PRODUCTION_API.DETAIL(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch production: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching production:', error);
    throw error;
  }
}

/**
 * Fetch visions from the API
 */
export async function fetchVisions(): Promise<Vision[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(VISIONS_API.LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch visions: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching visions:', error);
    throw error;
  }
}

/**
 * Fetch a single vision by ID
 */
export async function fetchVisionById(id: number): Promise<Vision> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(VISIONS_API.DETAIL(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch vision: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching vision:', error);
    throw error;
  }
}

/**
 * Fetch events from the API (for event images)
 */
export async function fetchEvents(): Promise<Event[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(EVENTS_API.LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

/**
 * Fetch a single event by ID
 */
export async function fetchEventById(id: number): Promise<Event> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(EVENTS_API.DETAIL(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}
