import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ink",
  description: "ink. This is my part of portfolio.",
};

export default function InkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
