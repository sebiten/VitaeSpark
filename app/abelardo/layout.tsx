import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AbelardoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
