import { company, meta } from "@/data/beone";
import { Val } from "@/components/primitives/Val";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-semibold">{meta.name}</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            <Val datum={company.address} />
          </p>
        </div>
        <dl className="num grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-muted-foreground">Phone</dt>
          <dd>
            <a className="hover:underline" href={`tel:${company.phone.value.replace(/\s/g, "")}`}>
              {company.phone.value}
            </a>
          </dd>
          <dt className="text-muted-foreground">Sales</dt>
          <dd>
            <a className="hover:underline" href={`mailto:${company.emails.sales.value}`}>
              {company.emails.sales.value}
            </a>
          </dd>
          <dt className="text-muted-foreground">General</dt>
          <dd>
            <a className="hover:underline" href={`mailto:${company.emails.general.value}`}>
              {company.emails.general.value}
            </a>
          </dd>
          <dt className="text-muted-foreground">Instagram</dt>
          <dd>
            <a className="hover:underline" href={company.instagram.value} rel="noopener noreferrer" target="_blank">
              @beoneinfra_pune
            </a>
          </dd>
        </dl>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span className="placeholder-mark">Placeholder</span> marks content not yet supplied.{" "}
          <span className="draft-mark">Draft</span> marks wording awaiting approval.
        </p>
      </div>
    </footer>
  );
}
