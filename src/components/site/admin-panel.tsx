"use client";

import { useState } from "react";
import { Lock, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchStore } from "@/store/search-store";
import { ContentEditorInline } from "@/components/site/content-editor-panel";
import { toast } from "sonner";

/**
 * Admin dashboard sheet. Opened from the footer "Admin" link or the header
 * "Admin" button (visible once signed in). Contains the sign-in form and the
 * site content editor.
 */
export function AdminPanel() {
  const adminOpen = useSearchStore((s) => s.adminOpen);
  const setAdminOpen = useSearchStore((s) => s.setAdminOpen);
  const isAdmin = useSearchStore((s) => s.isAdmin);
  const login = useSearchStore((s) => s.login);
  const logout = useSearchStore((s) => s.logout);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSheetChange = (open: boolean) => {
    setAdminOpen(open);
    if (!open) {
      setPassword("");
      setLoginError("");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(password);
    setSubmitting(false);
    if (ok) {
      setPassword("");
      setLoginError("");
      toast.success("Signed in", { description: "You can now edit site content." });
    } else {
      setLoginError("Incorrect password, or the server is not configured.");
    }
  };

  return (
    <Sheet open={adminOpen} onOpenChange={handleSheetChange}>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-5xl">
        <SheetHeader className="border-b border-border bg-secondary/30 px-6 py-4">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="font-display text-xl">Admin Dashboard</SheetTitle>
                <SheetDescription className="text-xs">
                  Grace Choi Real Estate · Site content
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

        {isAdmin ? (
          <ContentEditorInline />
        ) : (
          <div className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="w-full max-w-sm space-y-6">
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-7 w-7" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Admin Sign In</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter the admin password to edit site content.
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
                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : (
                    <Lock className="mr-1.5 h-4 w-4" />
                  )}
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
