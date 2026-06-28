import { FaInstagram, FaYoutube, FaTiktok, FaFacebook } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export function getSocialColor(type: string): string {
  switch (type.toLowerCase()) {
    case "email":     return "#C9A84C";
    case "instagram": return "#E1306C";
    case "thread":
    case "threads":   return "#FFFFFF";
    case "tiktok":    return "#EE1D52";
    case "youtube":   return "#FF0000";
    case "facebook":  return "#1877F2";
    default:          return "#C9A84C";
  }
}

export function SocialIcon({ type, size = 20 }: { type: string; size?: number }) {
  const t = type.toLowerCase();
  if (t === "email")                    return <MdEmail size={size} />;
  if (t === "instagram")                return <FaInstagram size={size} />;
  if (t === "thread" || t === "threads") return <FaThreads size={size} />;
  if (t === "tiktok")                   return <FaTiktok size={size} />;
  if (t === "youtube")                  return <FaYoutube size={size} />;
  if (t === "facebook")                 return <FaFacebook size={size} />;
  return null;
}

// Order for header/footer (no email — contact form handles that)
export const SOCIAL_ORDER_NAV = ["Instagram", "Youtube", "Tiktok", "Thread", "Facebook"];

export const SOCIAL_ORDER_CONTACT = ["Instagram", "Youtube", "Tiktok", "Thread", "Facebook", "Email"];
