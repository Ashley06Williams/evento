import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { toCapital } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};
type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const city = params.city;

  return {
    title: city === "all" ? "All events" : `Events in ${toCapital(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const city = params.city;
  const paresedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!paresedPage.success) {
    throw new Error("Invalid Page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${toCapital(city)}`}
      </H1>
      <Suspense key={city + paresedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={paresedPage.data} />
      </Suspense>
    </main>
  );
}
