"use client";

import { useState, type FormEvent } from "react";
import { company, contact, divisions } from "@/data/beone";
import { PROJECT_TYPES, type DivisionId, type ProjectType } from "@/data/schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Val } from "@/components/primitives/Val";
import { useFilter } from "@/state/filter";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 [&>option]:bg-popover [&>option]:text-popover-foreground";

/**
 * Structured RFP intake. No server: submitting opens the visitor's mail client with a
 * pre-filled message to the sales address, so nothing is sent to a third party.
 * Divisions and project type are pre-selected from whatever was filtered earlier in the session.
 */
export function RfpForm() {
  const { filter } = useFilter();
  const [touched, setTouched] = useState({ divisions: false, type: false });
  const [pickedDivisions, setPickedDivisions] = useState<DivisionId[]>([]);
  const [pickedType, setPickedType] = useState<ProjectType | "">("");

  const selectedDivisions = touched.divisions ? pickedDivisions : filter.division ? [filter.division] : [];
  const type = touched.type ? pickedType : (filter.type ?? "");

  const toggleDivision = (id: DivisionId, on: boolean) => {
    setTouched((t) => ({ ...t, divisions: true }));
    setPickedDivisions(on ? [...new Set([...selectedDivisions, id])] : selectedDivisions.filter((d) => d !== id));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim() || "Not stated";
    const names = selectedDivisions.map((id) => divisions.find((d) => d.id === id)?.name).join(", ") || "Not stated";
    const body = [
      `Name: ${get("name")}`,
      `Organisation: ${get("org")}`,
      `Phone / email: ${get("reach")}`,
      "",
      `Project type: ${type ? cap(type) : "Not stated"}`,
      `Approximate scale: ${get("scale")}`,
      `Location: ${get("location")}`,
      `Timeline: ${get("timeline")}`,
      `Divisions: ${names}`,
    ].join("\n");
    const subject = `RFP: ${type ? cap(type) : "project"}, ${get("location")}`;
    window.location.href = `mailto:${company.emails.sales.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="org">Organisation</Label>
        <Input id="org" name="org" required autoComplete="organization" />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="reach">Phone or email</Label>
        <Input id="reach" name="reach" required autoComplete="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ptype">Project type</Label>
        <select
          id="ptype"
          name="ptype"
          className={selectClass}
          value={type}
          onChange={(e) => {
            setTouched((t) => ({ ...t, type: true }));
            setPickedType(e.target.value as ProjectType | "");
          }}
        >
          <option value="">Select</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {cap(t)}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="scale">Approximate scale</Label>
        <select id="scale" name="scale" className={selectClass} defaultValue="">
          <option value="">Select</option>
          {contact.scaleBands.value.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <select id="timeline" name="timeline" className={selectClass} defaultValue="">
          <option value="">Select</option>
          {contact.timelines.value.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3 sm:col-span-2">
        <legend className="text-sm font-medium">Divisions relevant</legend>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {divisions.map((d) => (
            <div key={d.id} className="flex items-center gap-2">
              <Checkbox
                id={`div-${d.id}`}
                checked={selectedDivisions.includes(d.id)}
                onCheckedChange={(v) => toggleDivision(d.id, v === true)}
                className="data-checked:border-line-strong data-checked:bg-secondary data-checked:text-secondary-foreground dark:data-checked:bg-secondary"
              />
              <Label htmlFor={`div-${d.id}`} className="font-normal">
                {d.name}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:col-span-2">
        <Button type="submit" size="lg" className="h-10 px-5 text-sm">
          Send RFP by email
        </Button>
        <p className="num text-xs text-muted-foreground">
          Response time: <Val datum={contact.responseTime} />
        </p>
      </div>
    </form>
  );
}
