import { clientLogos, proofItems, pullQuote } from "@/data/beone";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Val } from "@/components/primitives/Val";

const COLS = "sm:grid-cols-[1.3fr_1fr_1fr_1fr]";

export function ProofWall() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="05"
          id="proof-title"
          lead="Registrations, certifications, insurance and safety record as line items."
        >
          Proof wall
        </SectionHeading>

        <Reveal>
          <div className="num hidden gap-4 border-b border-border pb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground sm:grid sm:[grid-template-columns:1.3fr_1fr_1fr_1fr]" aria-hidden="true">
            <span>Item</span>
            <span>Issuing body</span>
            <span>Reference</span>
            <span>Valid until</span>
          </div>
          <ul>
            {proofItems.map((item) => (
              <li key={item.id} className="border-b border-border py-4">
                <dl className={`num grid gap-x-4 gap-y-2 text-sm ${COLS}`}>
                  <div>
                    <dt className="sr-only">Item</dt>
                    <dd className="font-sans text-base">{item.title}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground sm:sr-only">Issuing body</dt>
                    <dd>
                      <Val datum={item.issuingBody} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground sm:sr-only">Reference</dt>
                    <dd>
                      {item.verifyUrl && item.reference.status !== "PLACEHOLDER" ? (
                        <a
                          href={item.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:no-underline"
                        >
                          {item.reference.value}
                        </a>
                      ) : (
                        <Val datum={item.reference} />
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground sm:sr-only">Valid until</dt>
                    <dd>
                      <Val datum={item.validUntil} mono />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="num text-xs uppercase tracking-[0.14em] text-muted-foreground">Clients</h3>
            {/* Client logos appear once: static, monochrome, low contrast. */}
            <ul className="mt-4 flex flex-wrap items-center gap-6">
              {clientLogos.map((logo, i) => (
                <li key={i} className={logo.status === "PLACEHOLDER" ? "text-sm" : "text-sm opacity-60 grayscale"}>
                  <Val datum={logo} />
                </li>
              ))}
            </ul>
          </div>

          <figure>
            {/* Serif only for real client quotes; the placeholder stays sans so the serif file is not fetched. */}
            <blockquote className={pullQuote.quote.status === "PLACEHOLDER" ? "text-xl leading-relaxed" : "font-serif text-xl leading-relaxed"}>
              <Val datum={pullQuote.quote} />
            </blockquote>
            <figcaption className="num mt-4 text-sm text-muted-foreground">
              <Val datum={pullQuote.name} />, <Val datum={pullQuote.title} />, <Val datum={pullQuote.company} />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
