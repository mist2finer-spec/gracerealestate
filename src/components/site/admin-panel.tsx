"use client";

import { useMemo, useState } from "react";
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Save,
  RotateCcw,
  ShieldCheck,
  Database,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
import { Separator } from "@/components/ui/separator";
import { useSearchStore } from "@/store/search-store";
import {
  AGENTS,
  formatPrice,
  PropertyListing,
  ListingStatus,
  ListingType,
  SUPPORTED_STATES,
  STATE_LABELS,
  SupportedState,
} from "@/lib/data";
import { toast } from "sonner";

const PROPERTY_TYPES: { value: ListingType; label: string }[] = [
  { value: "house", label: "House" },
  { value: "condo", label: "Condo / Apartment" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const LISTING_STATUSES: { value: ListingStatus; label: string }[] = [
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
];

// Default image if user doesn't provide one
const DEFAULT_IMAGE =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg";

interface EditFormState {
  id?: string;
  title: string;
  address: string;
  city: string;
  state: SupportedState;
  zip: string;
  price: string;
  status: ListingStatus;
  type: ListingType;
  beds: string;
  baths: string;
  sqft: string;
  lotSize: string;
  yearBuilt: string;
  image: string;
  description: string;
  amenities: string;
  featured: boolean;
  isNew: boolean;
  agentId: string;
}

const EMPTY_FORM: EditFormState = {
  title: "",
  address: "",
  city: "",
  state: "NY",
  zip: "",
  price: "",
  status: "for-sale",
  type: "house",
  beds: "0",
  baths: "0",
  sqft: "",
  lotSize: "",
  yearBuilt: "",
  image: "",
  description: "",
  amenities: "",
  featured: false,
  isNew: false,
  agentId: "a1",
};

export function AdminPanel() {
  const {
    adminOpen,
    setAdminOpen,
    isAdmin,
    login,
    logout,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    resetToSeed,
  } = useSearchStore();

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Edit/Add dialog
  const [editingForm, setEditingForm] = useState<EditFormState | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Table search
  const [tableSearch, setTableSearch] = useState("");

  // Reset transient state when the sheet closes
  const handleSheetChange = (open: boolean) => {
    setAdminOpen(open);
    if (!open) {
      setPassword("");
      setLoginError("");
    }
  };

  const filteredProperties = useMemo(() => {
    if (!tableSearch.trim()) return properties;
    const q = tableSearch.toLowerCase();
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.zip.includes(q)
    );
  }, [properties, tableSearch]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Welcome back, Admin", {
        description: "You now have access to property management.",
      });
      setPassword("");
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try again.");
      toast.error("Login failed", { description: "Incorrect admin password." });
    }
  };

  const openAdd = () => {
    setEditingForm({ ...EMPTY_FORM });
    setEditOpen(true);
  };

  const openEdit = (p: PropertyListing) => {
    setEditingForm({
      id: p.id,
      title: p.title,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      price: String(p.price),
      status: p.status,
      type: p.type,
      beds: String(p.beds),
      baths: String(p.baths),
      sqft: String(p.sqft),
      lotSize: p.lotSize ?? "",
      yearBuilt: String(p.yearBuilt),
      image: p.image,
      description: p.description,
      amenities: p.amenities.join(", "),
      featured: !!p.featured,
      isNew: !!p.isNew,
      agentId: p.agentId,
    });
    setEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingForm) return;

    // Basic validation
    if (!editingForm.title || !editingForm.address || !editingForm.city || !editingForm.zip) {
      toast.error("Missing fields", {
        description: "Title, address, city, and ZIP are required.",
      });
      return;
    }

    const priceNum = Number(editingForm.price);
    if (!priceNum || priceNum <= 0) {
      toast.error("Invalid price", { description: "Price must be a positive number." });
      return;
    }

    const gallery = editingForm.image
      ? [editingForm.image]
      : [DEFAULT_IMAGE];

    const payload = {
      title: editingForm.title,
      address: editingForm.address,
      city: editingForm.city,
      state: editingForm.state,
      zip: editingForm.zip,
      price: priceNum,
      status: editingForm.status,
      type: editingForm.type,
      beds: Number(editingForm.beds) || 0,
      baths: Number(editingForm.baths) || 0,
      sqft: Number(editingForm.sqft) || 0,
      lotSize: editingForm.lotSize || undefined,
      yearBuilt: Number(editingForm.yearBuilt) || 0,
      image: editingForm.image || DEFAULT_IMAGE,
      gallery,
      description: editingForm.description,
      amenities: editingForm.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      featured: editingForm.featured,
      isNew: editingForm.isNew,
      agentId: editingForm.agentId,
    };

    try {
      if (editingForm.id) {
        updateProperty(editingForm.id, payload);
        toast.success("Property updated", {
          description: `${payload.title} (${payload.city}, ${payload.state})`,
        });
      } else {
        const id = addProperty(payload);
        toast.success("Property added", {
          description: `New ${payload.type} listing created with ID ${id}.`,
        });
      }
      setEditOpen(false);
      setEditingForm(null);
    } catch (err) {
      toast.error("Save failed", {
        description: (err as Error).message,
      });
    }
  };

  const handleDelete = (id: string) => {
    const p = properties.find((x) => x.id === id);
    deleteProperty(id);
    setDeletingId(null);
    toast.success("Property deleted", {
      description: p ? `${p.title} has been removed.` : "Listing removed.",
    });
  };

  const handleReset = () => {
    resetToSeed();
    toast("Catalog reset", {
      description: "Restored to the original NY/NJ demo listings.",
    });
  };

  const totalForSale = properties.filter((p) => p.status === "for-sale").length;
  const totalForRent = properties.filter((p) => p.status === "for-rent").length;
  const totalFeatured = properties.filter((p) => p.featured).length;

  return (
    <Sheet open={adminOpen} onOpenChange={handleSheetChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-5xl"
      >
        <SheetHeader className="border-b border-border bg-secondary/30 px-6 py-4">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="font-display text-xl">
                  Admin Dashboard
                </SheetTitle>
                <SheetDescription className="text-xs">
                  Estata · NY/NJ Property Management
                </SheetDescription>
              </div>
            </div>
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  toast("Logged out", { description: "Admin session ended." });
                }}
                className="gap-1.5 text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </SheetHeader>

        {!isAdmin ? (
          /* ============ LOGIN ============ */
          <div className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="w-full max-w-sm space-y-6">
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-7 w-7" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">
                  Admin Sign In
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your admin password to manage listings.
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <Label htmlFor="admin-pw" className="text-xs">
                    Admin Password
                  </Label>
                  <Input
                    id="admin-pw"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError("");
                    }}
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  {loginError && (
                    <p className="mt-1.5 text-xs text-destructive">{loginError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Lock className="mr-1.5 h-4 w-4" />
                  Sign In
                </Button>
              </form>
              <div className="rounded-md border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Demo credentials</p>
                <p className="mt-1">
                  Password: <code className="rounded bg-background px-1 py-0.5">estata-admin-2024</code>
                </p>
                <p className="mt-1.5 text-[11px]">
                  For production deployments, replace with NextAuth + a real database.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ============ ADMIN DASHBOARD ============ */
          <div className="flex flex-col gap-6 p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Total Listings" value={String(properties.length)} icon={<Database className="h-4 w-4" />} />
              <StatCard label="For Sale" value={String(totalForSale)} />
              <StatCard label="For Rent" value={String(totalForRent)} />
              <StatCard label="Featured" value={String(totalFeatured)} />
            </div>

            {/* Region notice */}
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
              <strong className="font-semibold">Region notice:</strong>{" "}
              Estata only accepts listings in{" "}
              <Badge variant="secondary" className="mx-0.5">New York (NY)</Badge> and{" "}
              <Badge variant="secondary" className="mx-0.5">New Jersey (NJ)</Badge>.
              Other states will be rejected at save.
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={openAdd} size="sm">
                <Plus className="mr-1.5 h-4 w-4" />
                Add Property
              </Button>
              <Button
                onClick={handleReset}
                size="sm"
                variant="outline"
                className="gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset to seed
              </Button>
              <div className="relative ml-auto">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search title, city, ZIP..."
                  className="h-9 w-full pl-8 sm:w-64"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[220px]">Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                        No properties match your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProperties.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="h-12 w-16 rounded object-cover"
                              loading="lazy"
                            />
                            <div className="min-w-0">
                              <div className="truncate font-medium">{p.title}</div>
                              <div className="truncate text-xs text-muted-foreground">
                                {p.beds > 0 ? `${p.beds}bd` : "—"} ·{" "}
                                {p.baths > 0 ? `${p.baths}ba` : "—"} ·{" "}
                                {p.sqft.toLocaleString("en-US")} sqft
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {p.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              p.status === "for-sale"
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }
                            variant={p.status === "for-rent" ? "secondary" : "default"}
                          >
                            {p.status === "for-sale" ? "For Sale" : "For Rent"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {p.city}, {p.state}
                          <div className="text-xs text-muted-foreground">{p.zip}</div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(p.price, p.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => {
                                useSearchStore.getState().setSelectedProperty(p.id);
                                useSearchStore.getState().setAdminOpen(false);
                              }}
                              aria-label="Preview listing"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => openEdit(p)}
                              aria-label="Edit listing"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => setDeletingId(p.id)}
                              aria-label="Delete listing"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <p className="text-xs text-muted-foreground">
              Showing {filteredProperties.length} of {properties.length} listings ·
              Changes persist in your browser via localStorage.
            </p>
          </div>
        )}
      </SheetContent>

      {/* ============ EDIT / ADD DIALOG ============ */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingForm?.id ? "Edit Property" : "Add New Property"}
            </DialogTitle>
            <DialogDescription>
              {editingForm?.id
                ? "Update listing details. State must be NY or NJ."
                : "Create a new listing. State must be NY or NJ."}
            </DialogDescription>
          </DialogHeader>

          {editingForm && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Title" full>
                  <Input
                    value={editingForm.title}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, title: e.target.value })
                    }
                    placeholder="e.g. Tribeca Luxury Loft"
                    required
                  />
                </Field>

                <Field label="Street Address">
                  <Input
                    value={editingForm.address}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, address: e.target.value })
                    }
                    placeholder="142 Duane St"
                    required
                  />
                </Field>

                <Field label="City">
                  <Input
                    value={editingForm.city}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, city: e.target.value })
                    }
                    placeholder="Manhattan"
                    required
                  />
                </Field>

                <Field label="State (NY / NJ only)">
                  <Select
                    value={editingForm.state}
                    onValueChange={(v) =>
                      setEditingForm({ ...editingForm, state: v as SupportedState })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATE_LABELS[s]} ({s})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="ZIP">
                  <Input
                    value={editingForm.zip}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, zip: e.target.value })
                    }
                    placeholder="10013"
                    required
                  />
                </Field>

                <Field label="Price ($)">
                  <Input
                    type="number"
                    min="0"
                    value={editingForm.price}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, price: e.target.value })
                    }
                    placeholder="2850000"
                    required
                  />
                </Field>

                <Field label="Status">
                  <Select
                    value={editingForm.status}
                    onValueChange={(v) =>
                      setEditingForm({
                        ...editingForm,
                        status: v as ListingStatus,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LISTING_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Property Type">
                  <Select
                    value={editingForm.type}
                    onValueChange={(v) =>
                      setEditingForm({ ...editingForm, type: v as ListingType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Bedrooms">
                  <Input
                    type="number"
                    min="0"
                    value={editingForm.beds}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, beds: e.target.value })
                    }
                  />
                </Field>

                <Field label="Bathrooms">
                  <Input
                    type="number"
                    min="0"
                    value={editingForm.baths}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, baths: e.target.value })
                    }
                  />
                </Field>

                <Field label="Sq Ft">
                  <Input
                    type="number"
                    min="0"
                    value={editingForm.sqft}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, sqft: e.target.value })
                    }
                    placeholder="1850"
                  />
                </Field>

                <Field label="Lot Size (optional)">
                  <Input
                    value={editingForm.lotSize}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, lotSize: e.target.value })
                    }
                    placeholder="0.18 ac"
                  />
                </Field>

                <Field label="Year Built">
                  <Input
                    type="number"
                    min="0"
                    value={editingForm.yearBuilt}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, yearBuilt: e.target.value })
                    }
                    placeholder="2019"
                  />
                </Field>

                <Field label="Assigned Agent">
                  <Select
                    value={editingForm.agentId}
                    onValueChange={(v) =>
                      setEditingForm({ ...editingForm, agentId: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AGENTS.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name} · {a.office}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Image URL" full>
                  <Input
                    value={editingForm.image}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, image: e.target.value })
                    }
                    placeholder="https://example.com/photo.jpg"
                  />
                  {editingForm.image && (
                    <img
                      src={editingForm.image}
                      alt="Preview"
                      className="mt-2 h-24 w-full rounded object-cover"
                    />
                  )}
                </Field>

                <Field label="Description" full>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={editingForm.description}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, description: e.target.value })
                    }
                    placeholder="Property description..."
                  />
                </Field>

                <Field label="Amenities (comma-separated)" full>
                  <Input
                    value={editingForm.amenities}
                    onChange={(e) =>
                      setEditingForm({ ...editingForm, amenities: e.target.value })
                    }
                    placeholder="Pool, Gym, Concierge, Doorman"
                  />
                </Field>

                <div className="flex flex-wrap gap-4 sm:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editingForm.featured}
                      onChange={(e) =>
                        setEditingForm({ ...editingForm, featured: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-input"
                    />
                    Featured
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editingForm.isNew}
                      onChange={(e) =>
                        setEditingForm({ ...editingForm, isNew: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-input"
                    />
                    Mark as New
                  </label>
                </div>
              </div>

              <Separator />

              <DialogFooter className="gap-2 sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditOpen(false);
                    setEditingForm(null);
                  }}
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-1.5 h-4 w-4" />
                  {editingForm.id ? "Save Changes" : "Add Listing"}
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
            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the listing from the catalog.
              This action cannot be undone.
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
    </Sheet>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
