import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NJ Towns & Schools — Interactive Map | Grace Choi Real Estate",
  description:
    "Browse Bergen County, NJ towns on an interactive map. Click any town to view schools, demographics, transportation, and real estate info. Served by Grace Choi Real Estate.",
  keywords: [
    "Bergen County NJ towns",
    "NJ towns and schools",
    "New Jersey town map",
    "Bergen County real estate",
    "NJ school districts",
    "interactive town map",
  ],
  openGraph: {
    title: "NJ Towns & Schools — Interactive Map",
    description:
      "Explore Bergen County, NJ towns on an interactive map. Click for school, demographic, and real estate info.",
    type: "website",
  },
};

export default function TownsAndSchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
