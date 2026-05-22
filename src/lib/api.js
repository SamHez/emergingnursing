export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.emergingnursing.com";

export const PUBLIC_API_ENDPOINTS = {
  contact: "/contact/create.php",
  referrals: "/referrals/create.php",
  jobs: "/careers/jobs-public.php",
  applications: "/careers/applications-create.php",
  trainingCourses: "/training/courses/public",
  trainingSignup: "/training/signup",
  certificateVerify: "/certificates/verify",
};

function buildApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPublicApiUrl(path) {
  return buildApiUrl(path);
}

async function parseApiResponse(response) {
  let payload = null;
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    payload = await response.json();
  } else {
    const text = await response.text();
    payload = text ? { success: response.ok, message: text } : null;
  }

  if (!response.ok || payload?.success === false) {
    const error = new Error(
      payload?.message || "Something went wrong. Please try again later.",
    );
    error.status = response.status;
    error.errors = payload?.errors || {};
    throw error;
  }

  return payload?.data || {};
}

export async function apiGet(path, init = {}) {
  const response = await fetch(buildApiUrl(path), {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
    ...init,
  });

  return parseApiResponse(response);
}

export async function apiPostJson(path, body, init = {}) {
  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  return parseApiResponse(response);
}

export async function apiPostFormData(path, body, init = {}) {
  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(init.headers || {}),
    },
    body,
    ...init,
  });

  return parseApiResponse(response);
}

export async function fetchPublicJobs() {
  const data = await apiGet(PUBLIC_API_ENDPOINTS.jobs);
  return Array.isArray(data.items) ? data.items : [];
}

export function mapApiErrors(errors, fieldMap = {}) {
  return Object.entries(errors || {}).reduce((accumulator, [key, value]) => {
    const mappedKey = fieldMap[key] || key;
    accumulator[mappedKey] = Array.isArray(value) ? value[0] : value;
    return accumulator;
  }, {});
}
