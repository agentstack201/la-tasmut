import { createFileRoute } from "@tanstack/react-router";
import { isStationId, type StationId } from "@/campaign/content";
import { CampaignApp } from "@/components/campaign/campaign-app";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { m: StationId } => ({
    m: isStationId(search.m) ? search.m : "board",
  }),
  component: Home,
});

function Home() {
  const { m } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <CampaignApp
      station={m}
      onGo={(id) => {
        void navigate({ to: "/", search: { m: id } });
      }}
    />
  );
}
