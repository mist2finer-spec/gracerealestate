"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Mail,
  Phone,
  Star,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSearchStore } from "@/store/search-store";
import { Agent } from "@/lib/data";
import { toast } from "sonner";

// Default image for new agents (placeholder portrait)
const DEFAULT_AGENT_IMAGE =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86f745a3253a.jpg";

interface AgentFormState {
  id?: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  sales: string;
  rating: string;
  specialties: string;
  office: string;
}

const EMPTY_FORM: AgentFormState = {
  name: "",
  title: "",
  phone: "",
  email: "",
  image: "",
  sales: "0",
  rating: "5.0",
  specialties: "",
  office: "",
};

export function AgentManagerInline() {
  const agents = useSearchStore((s) => s.siteContent.agents);
  const properties = useSearchStore((s) => s.properties);
  const addAgent = useSearchStore((s) => s.addAgent);
  const updateAgent = useSearchStore((s) => s.updateAgent);
  const deleteAgent = useSearchStore((s) => s.deleteAgent);

  const [editForm, setEditForm] = useState<AgentFormState | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openAdd = () => {
    setEditForm({ ...EMPTY_FORM });
    setEditOpen(true);
  };

  const openEdit = (a: Agent) => {
    setEditForm({
      id: a.id,
      name: a.name,
      title: a.title,
      phone: a.phone,
      email: a.email,
      image: a.image,
      sales: String(a.sales),
      rating: String(a.rating),
      specialties: a.specialties.join(", "),
      office: a.office,
    });
    setEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;
    if (!editForm.name || !editForm.email || !editForm.phone) {
      toast.error("Missing fields", {
        description: "Name, phone, and email are required.",
      });
      return;
    }

    const payload = {
      name: editForm.name,
      title: editForm.title || "Real Estate Agent",
      phone: editForm.phone,
      email: editForm.email,
      image: editForm.image || DEFAULT_AGENT_IMAGE,
      sales: Number(editForm.sales) || 0,
      rating: Math.min(5, Math.max(0, Number(editForm.rating) || 0)),
      specialties: editForm.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      office: editForm.office || "NY/NJ",
    };

    try {
      if (editForm.id) {
        updateAgent(editForm.id, payload);
        toast.success("Agent updated", {
          description: `${payload.name} (${payload.office})`,
        });
      } else {
        const id = addAgent(payload);
        toast.success("Agent added", {
          description: `${payload.name} added with ID ${id}.`,
        });
      }
      setEditOpen(false);
      setEditForm(null);
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    }
  };

  const handleDelete = (id: string) => {
    const a = agents.find((x) => x.id === id);
    deleteAgent(id);
    setDeletingId(null);
    toast.success("Agent deleted", {
      description: a
        ? `${a.name} removed. Properties reassigned to the next available agent.`
        : "Agent removed.",
    });
  };

  // Count how many properties each agent is handling
  const propertyCount = (agentId: string) =>
    properties.filter((p) => p.agentId === agentId).length;

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div>
          <div className="text-sm font-semibold">Manage Agents</div>
          <div className="text-xs text-muted-foreground">
            Add, edit, or remove agents. Each property is assigned to one
            agent. Deleting an agent reassigns their properties automatically.
          </div>
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Agent
        </Button>
      </div>

      {/* Agents grid */}
      {agents.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground">
          No agents yet. Click &quot;Add Agent&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden p-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 top-0 flex justify-between p-2">
                  <Badge className="gap-1 bg-white/95 text-foreground hover:bg-white">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {agent.rating}
                  </Badge>
                  <Badge className="bg-primary text-primary-foreground">
                    {propertyCount(agent.id)} listings
                  </Badge>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10">
                  <h3 className="font-display text-lg font-bold text-white">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-white/85">{agent.title}</p>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {agent.office}
                  <span className="mx-1">·</span>
                  {agent.sales} sales
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {agent.specialties.slice(0, 3).map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> {agent.phone}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> {agent.email}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-2 border-t border-border bg-secondary/30 p-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openEdit(agent)}
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setDeletingId(agent.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {agents.length} agent{agents.length === 1 ? "" : "s"} total · Changes
        persist in your browser via localStorage.
      </p>

      {/* ============ EDIT / ADD DIALOG ============ */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editForm?.id ? "Edit Agent" : "Add New Agent"}
            </DialogTitle>
            <DialogDescription>
              {editForm?.id
                ? "Update agent details. Image URL is required."
                : "Create a new agent profile. Image URL is required."}
            </DialogDescription>
          </DialogHeader>

          {editForm && (
            <form onSubmit={handleSave} className="space-y-3">
              {/* Image preview */}
              <div className="flex items-center gap-3">
                <img
                  src={editForm.image || DEFAULT_AGENT_IMAGE}
                  alt="Preview"
                  className="h-20 w-20 rounded-full border border-border object-cover"
                />
                <div className="flex-1">
                  <Label className="text-xs">Photo URL</Label>
                  <Input
                    value={editForm.image}
                    onChange={(e) =>
                      setEditForm({ ...editForm, image: e.target.value })
                    }
                    placeholder="https://...jpg"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Paste a direct image URL. Defaults to a placeholder if left blank.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label className="text-xs">Full name *</Label>
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="Sarah Mitchell"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    placeholder="Senior Listing Agent · NY"
                  />
                </div>
                <div>
                  <Label className="text-xs">
                    <Phone className="inline h-3 w-3" /> Phone *
                  </Label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    placeholder="(212) 555-0184"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs">
                    <Mail className="inline h-3 w-3" /> Email *
                  </Label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    placeholder="sarah@gracechoi.com"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs">Office location</Label>
                  <Input
                    value={editForm.office}
                    onChange={(e) =>
                      setEditForm({ ...editForm, office: e.target.value })
                    }
                    placeholder="Manhattan, NY"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rating (0-5)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editForm.rating}
                    onChange={(e) =>
                      setEditForm({ ...editForm, rating: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">Total sales</Label>
                  <Input
                    type="number"
                    min="0"
                    value={editForm.sales}
                    onChange={(e) =>
                      setEditForm({ ...editForm, sales: e.target.value })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">
                    Specialties (comma-separated)
                  </Label>
                  <Input
                    value={editForm.specialties}
                    onChange={(e) =>
                      setEditForm({ ...editForm, specialties: e.target.value })
                    }
                    placeholder="Luxury Homes, Manhattan, New Construction"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditOpen(false);
                    setEditForm(null);
                  }}
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-1.5 h-4 w-4" />
                  {editForm.id ? "Save Changes" : "Add Agent"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ============ DELETE CONFIRMATION ============ */}
      <AlertDialog
        open={!!deletingId}
        onOpenChange={(o) => !o && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this agent?</AlertDialogTitle>
            <AlertDialogDescription>
              {(() => {
                const a = agents.find((x) => x.id === deletingId);
                const count = deletingId ? propertyCount(deletingId) : 0;
                return `This will permanently remove ${a?.name ?? "this agent"}. ${
                  count > 0
                    ? `Their ${count} listing${count === 1 ? "" : "s"} will be reassigned to the next available agent.`
                    : "They have no listings assigned."
                }`;
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deletingId && handleDelete(deletingId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
