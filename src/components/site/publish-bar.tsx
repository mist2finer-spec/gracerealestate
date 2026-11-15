"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, History, Loader2, RotateCcw, Upload, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";
import { toast } from "sonner";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Sticky bar at the top of the editor: status + Publish / Discard. */
export function PublishBar({ onResetDefaults }: { onResetDefaults: () => void }) {
  const dirty = useSearchStore((s) => s.dirty);
  const saving = useSearchStore((s) => s.saving);
  const publish = useSearchStore((s) => s.publish);
  const discardChanges = useSearchStore((s) => s.discardChanges);
  const databaseConfigured = useSearchStore((s) => s.databaseConfigured);
  const lastPublishedAt = useSearchStore((s) => s.lastPublishedAt);

  const handlePublish = async () => {
    const r = await publish();
    if (r.ok) {
      toast.success("Published", { description: "Visitors now see your changes." });
    } else {
      toast.error("Not published", { description: r.error });
    }
  };

  return (
    <div className="sticky top-0 z-20 -mx-6 -mt-6 mb-2 border-b border-border bg-background/95 px-6 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          {!databaseConfigured ? (
            <span className="font-medium text-destructive">
              Database not connected — changes cannot be published yet.
            </span>
          ) : dirty ? (
            <span className="font-medium text-amber-600">
              ● Unpublished changes (only you can see them)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              {lastPublishedAt ? `Published ${formatTime(lastPublishedAt)}` : "Up to date"}
            </span>
          )}
          <div className="text-xs text-muted-foreground">
            Edit below, check the page behind this panel, then press Publish.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={onResetDefaults}>
            <RotateCcw className="h-3.5 w-3.5" />
            Defaults
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={!dirty || saving}
            onClick={() => {
              discardChanges();
              toast("Changes discarded");
            }}
          >
            <Undo2 className="h-3.5 w-3.5" />
            Discard
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            disabled={!dirty || saving || !databaseConfigured}
            onClick={handlePublish}
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}

/** List of recent published versions with a Restore button. */
export function RevisionHistory() {
  const restoreRevision = useSearchStore((s) => s.restoreRevision);
  const saving = useSearchStore((s) => s.saving);
  const lastPublishedAt = useSearchStore((s) => s.lastPublishedAt);
  const [revisions, setRevisions] = useState<{ id: number; createdAt: string }[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/revisions", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not load history");
      setRevisions(data.revisions);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  // Reload whenever something new is published.
  useEffect(() => {
    void load();
  }, [load, lastPublishedAt]);

  const handleRestore = async (id: number, createdAt: string) => {
    if (useSearchStore.getState().dirty && !confirm("Discard your unpublished changes and restore this version?")) {
      return;
    }
    if (!confirm(`Publish the version from ${formatTime(createdAt)} again?`)) return;
    const r = await restoreRevision(id);
    if (r.ok) toast.success("Version restored and published");
    else toast.error("Restore failed", { description: r.error });
  };

  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (!revisions) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (revisions.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing published yet.</p>;
  }

  return (
    <ul className="divide-y divide-border rounded-md border border-border bg-background">
      {revisions.map((r, i) => (
        <li key={r.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
          <span className="inline-flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            {formatTime(r.createdAt)}
            {i === 0 && <span className="text-xs text-emerald-600">(current)</span>}
          </span>
          {i > 0 && (
            <Button
              variant="outline"
              size="sm"
              disabled={saving}
              onClick={() => handleRestore(r.id, r.createdAt)}
            >
              Restore
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
