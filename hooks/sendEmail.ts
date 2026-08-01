import { Linking } from "react-native";

interface EmailOptions {
  cc?: string;
  bcc?: string;
}

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  options: EmailOptions = {}
): Promise<void> {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = Object.entries({ subject, body, cc, bcc })
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  if (query.length) {
    url += `?${query}`;
  }

  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    throw new Error("Provided URL can not be handled");
  }

  await Linking.openURL(url);
}
