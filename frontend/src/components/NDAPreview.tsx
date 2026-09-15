"use client";

import { NDAFormData } from "@/lib/types";
import { STANDARD_TERMS } from "@/lib/nda-content";

interface NDAPreviewProps {
  formData: NDAFormData;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-b border-blue-300 bg-blue-50 px-0.5 font-medium text-blue-900">
      {children}
    </span>
  );
}

function Blank() {
  return (
    <span className="inline-block min-w-[120px] border-b-2 border-dashed border-gray-300 text-gray-400">
      &nbsp;_______________&nbsp;
    </span>
  );
}

function Value({ value }: { value: string }) {
  return value.trim() ? <Highlight>{value}</Highlight> : <Blank />;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NDAPreview({ formData, previewRef }: NDAPreviewProps) {
  const mndaTermText =
    formData.mndaTermType === "expires"
      ? `Expires ${formData.mndaTermDuration || "___"} from Effective Date.`
      : "Continues until terminated in accordance with the terms of the MNDA.";

  const confidentialityTermText =
    formData.confidentialityTermType === "years"
      ? `${formData.confidentialityTermDuration || "___"} from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
      : "In perpetuity.";

  return (
    <div
      ref={previewRef}
      className="nda-document mx-auto max-w-[800px] bg-white p-8 text-gray-900 leading-relaxed"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* Cover Page */}
      <div className="mb-8 border-b-2 border-gray-800 pb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Mutual Non-Disclosure Agreement
        </h1>
      </div>

      <p className="mb-6 text-sm text-gray-600">
        This Mutual Non-Disclosure Agreement (the &quot;MNDA&quot;) consists of:
        (1) this Cover Page (&quot;Cover Page&quot;) and (2) the Common Paper
        Mutual NDA Standard Terms Version 1.0 (&quot;Standard Terms&quot;). Any
        modifications of the Standard Terms should be made on the Cover Page,
        which will control over conflicts with the Standard Terms.
      </p>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
            Purpose
          </h3>
          <p className="text-sm">
            <Value value={formData.purpose} />
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
            Effective Date
          </h3>
          <p className="text-sm">
            <Value value={formatDate(formData.effectiveDate)} />
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
            MNDA Term
          </h3>
          <p className="text-sm">{mndaTermText}</p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
            Term of Confidentiality
          </h3>
          <p className="text-sm">{confidentialityTermText}</p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
            Governing Law &amp; Jurisdiction
          </h3>
          <p className="text-sm">
            Governing Law: <Value value={formData.governingLaw} />
          </p>
          <p className="mt-1 text-sm">
            Jurisdiction: <Value value={formData.jurisdiction} />
          </p>
        </div>

        {formData.modifications && (
          <div>
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
              MNDA Modifications
            </h3>
            <p className="text-sm">{formData.modifications}</p>
          </div>
        )}
      </div>

      <p className="mb-4 text-sm italic text-gray-600">
        By signing this Cover Page, each party agrees to enter into this MNDA as
        of the Effective Date.
      </p>

      {/* Signature Table */}
      <div className="mb-8 overflow-hidden rounded border border-gray-300">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-1/4 border-b border-r border-gray-300 px-3 py-2 text-left font-semibold"></th>
              <th className="w-[37.5%] border-b border-r border-gray-300 px-3 py-2 text-center font-semibold">
                Party 1
              </th>
              <th className="w-[37.5%] border-b border-gray-300 px-3 py-2 text-center font-semibold">
                Party 2
              </th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["Signature", "", ""],
                ["Print Name", formData.party1.name, formData.party2.name],
                ["Title", formData.party1.title, formData.party2.title],
                ["Company", formData.party1.company, formData.party2.company],
                [
                  "Notice Address",
                  formData.party1.noticeAddress,
                  formData.party2.noticeAddress,
                ],
                [
                  "Date",
                  formatDate(formData.effectiveDate),
                  formatDate(formData.effectiveDate),
                ],
              ] as const
            ).map(([label, v1, v2]) => (
              <tr key={label} className="border-b border-gray-200 last:border-0">
                <td className="border-r border-gray-300 px-3 py-2 font-medium text-gray-700">
                  {label}
                </td>
                <td className="border-r border-gray-300 px-3 py-2 text-center">
                  {label === "Signature" ? (
                    <div className="h-8 border-b border-gray-300" />
                  ) : (
                    <Value value={v1} />
                  )}
                </td>
                <td className="px-3 py-2 text-center">
                  {label === "Signature" ? (
                    <div className="h-8 border-b border-gray-300" />
                  ) : (
                    <Value value={v2} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Standard Terms */}
      <div className="border-t-2 border-gray-800 pt-6">
        <h2 className="mb-4 text-center text-xl font-bold">Standard Terms</h2>
        <div className="space-y-4">
          {STANDARD_TERMS.map((section) => (
            <p key={section.number} className="text-sm text-justify">
              <strong>
                {section.number}. {section.title}.
              </strong>{" "}
              {section.text}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use
        under CC BY 4.0.
      </p>
    </div>
  );
}
