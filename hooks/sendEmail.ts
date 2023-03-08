import qs from "qs";
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
  const query = qs.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc,
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  // const canOpen = await Linking.canOpenURL(url);

  // if (!canOpen) {
  //   throw new Error("Provided URL can not be handled");
  // }

  try {
    return Linking.openURL(url);
  } catch {
    throw new Error("Provided URL can not be handled");
  }
}
