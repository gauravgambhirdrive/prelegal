"use client";

import { NDAFormData, PartyDetails } from "@/lib/types";

interface NDAFormProps {
  formData: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

function PartySection({
  label,
  party,
  onChange,
}: {
  label: string;
  party: PartyDetails;
  onChange: (party: PartyDetails) => void;
}) {
  return (
    <fieldset className="space-y-3 rounded-lg border border-gray-200 p-4">
      <legend className="px-2 text-sm font-semibold text-gray-700">
        {label}
      </legend>
      <Input
        label="Full Name"
        value={party.name}
        onChange={(v) => onChange({ ...party, name: v })}
        placeholder="Jane Smith"
      />
      <Input
        label="Title"
        value={party.title}
        onChange={(v) => onChange({ ...party, title: v })}
        placeholder="Chief Executive Officer"
      />
      <Input
        label="Company"
        value={party.company}
        onChange={(v) => onChange({ ...party, company: v })}
        placeholder="Acme Corp."
      />
      <Input
        label="Notice Address"
        value={party.noticeAddress}
        onChange={(v) => onChange({ ...party, noticeAddress: v })}
        placeholder="jane@acme.com"
      />
    </fieldset>
  );
}

const inputClasses =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none";

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
      />
    </label>
  );
}

export default function NDAForm({ formData, onChange }: NDAFormProps) {
  const update = (patch: Partial<NDAFormData>) =>
    onChange({ ...formData, ...patch });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-lg font-semibold text-gray-900">NDA Details</h2>

      <div>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">
            Purpose
          </span>
          <textarea
            value={formData.purpose}
            onChange={(e) => update({ purpose: e.target.value })}
            rows={3}
            className={inputClasses}
          />
        </label>
      </div>

      <Input
        label="Effective Date"
        type="date"
        value={formData.effectiveDate}
        onChange={(v) => update({ effectiveDate: v })}
      />

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">MNDA Term</legend>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            name="mndaTermType"
            checked={formData.mndaTermType === "expires"}
            onChange={() => update({ mndaTermType: "expires" })}
            className="text-blue-600"
          />
          Expires after
        </label>
        {formData.mndaTermType === "expires" && (
          <Input
            label=""
            value={formData.mndaTermDuration}
            onChange={(v) => update({ mndaTermDuration: v })}
            placeholder="1 year"
          />
        )}
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            name="mndaTermType"
            checked={formData.mndaTermType === "continues"}
            onChange={() => update({ mndaTermType: "continues" })}
            className="text-blue-600"
          />
          Continues until terminated
        </label>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Term of Confidentiality
        </legend>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            name="confidentialityTermType"
            checked={formData.confidentialityTermType === "years"}
            onChange={() => update({ confidentialityTermType: "years" })}
            className="text-blue-600"
          />
          Fixed duration
        </label>
        {formData.confidentialityTermType === "years" && (
          <Input
            label=""
            value={formData.confidentialityTermDuration}
            onChange={(v) => update({ confidentialityTermDuration: v })}
            placeholder="1 year"
          />
        )}
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            name="confidentialityTermType"
            checked={formData.confidentialityTermType === "perpetuity"}
            onChange={() => update({ confidentialityTermType: "perpetuity" })}
            className="text-blue-600"
          />
          In perpetuity
        </label>
      </fieldset>

      <Input
        label="Governing Law (State)"
        value={formData.governingLaw}
        onChange={(v) => update({ governingLaw: v })}
        placeholder="Delaware"
      />

      <Input
        label="Jurisdiction"
        value={formData.jurisdiction}
        onChange={(v) => update({ jurisdiction: v })}
        placeholder="courts located in New Castle, DE"
      />

      <div>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">
            MNDA Modifications (optional)
          </span>
          <textarea
            value={formData.modifications}
            onChange={(e) => update({ modifications: e.target.value })}
            rows={2}
            placeholder="List any modifications to the MNDA"
            className={inputClasses}
          />
        </label>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">Parties</h2>

      <PartySection
        label="Party 1"
        party={formData.party1}
        onChange={(p) => update({ party1: p })}
      />

      <PartySection
        label="Party 2"
        party={formData.party2}
        onChange={(p) => update({ party2: p })}
      />
    </form>
  );
}
