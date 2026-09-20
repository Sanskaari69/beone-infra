import { proofItems } from "@/data/beone";
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
      </div>
    </section>
  );
}
