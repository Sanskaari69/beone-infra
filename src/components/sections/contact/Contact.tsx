import { company, contact } from "@/data/beone";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Val } from "@/components/primitives/Val";
import { RfpForm } from "./RfpForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="07"
          id="contact-title"
          lead="Project type, scale, location and timeline. Divisions are pre-selected from your earlier filter."
        >
          Request for proposal
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <RfpForm />

          <aside aria-labelledby="people-title">
            <h3 id="people-title" className="num text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Direct contacts
            </h3>
            <ul className="mt-4 space-y-6">
              {contact.people.map((p, i) => (
                <li key={i} className="border-t border-border pt-4">
                  <p className="text-lg font-medium">
                    <Val datum={p.name} />
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Val datum={p.role} />
                  </p>
                  <dl className="num mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <Val datum={p.phone} />
                    </dd>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <Val datum={p.email} />
                    </dd>
                  </dl>
                </li>
              ))}
              <li className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Company lines</p>
                <dl className="num mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>{company.phone.value}</dd>
                  <dt className="text-muted-foreground">Sales</dt>
                  <dd>{company.emails.sales.value}</dd>
                </dl>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
