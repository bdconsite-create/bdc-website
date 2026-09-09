import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-thai";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bangkok Dredging | Dredging and Marine Contractor",
  description: "บริษัท บางกอก เดรดจิ้ง จำกัด ผู้เชี่ยวชาญด้านงานขุดลอกและงานโยธาทางน้ำครบวงจร",
  icons: {
    icon: "/images/bdc-logo.png",
    shortcut: "/images/bdc-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
