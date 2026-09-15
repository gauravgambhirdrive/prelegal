"use client";

import { useCallback } from "react";

interface DownloadButtonProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
}

function getDocumentStyles(): string {
  const styles: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        styles.push(rule.cssText);
      }
    } catch {
      if (sheet.href) {
        styles.push(`@import url("${sheet.href}");`);
      }
    }
  }
  return styles.join("\n");
}

export default function DownloadButton({ previewRef }: DownloadButtonProps) {
  const handleDownload = useCallback(() => {
    const element = previewRef.current;
    if (!element) return;

    const cssText = getDocumentStyles();
    const content = element.outerHTML;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.opacity = "0";
    document.body.appendChild(iframe);

    const iframeWin = iframe.contentWindow;
    const iframeDoc = iframe.contentDocument;
    if (!iframeWin || !iframeDoc) {
      document.body.removeChild(iframe);
      alert(
        "Unable to generate PDF. Please try using your browser's print function (Ctrl+P / Cmd+P)."
      );
      return;
    }

    iframeDoc.open();
    iframeDoc.write(`<!DOCTYPE html>
<html>
  <head>
    <title>Mutual NDA</title>
    <style>${cssText}</style>
    <style>
      html, body {
        background: white !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .nda-document {
        max-width: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        padding: 40px !important;
      }
      @page { margin: 15mm; size: A4; }
      @media print {
        .nda-document { padding: 0 !important; }
      }
    </style>
  </head>
  <body>${content}</body>
</html>`);
    iframeDoc.close();

    // Use setTimeout instead of onload — onload doesn't fire reliably
    // for iframes populated via document.write()
    setTimeout(() => {
      try {
        iframeWin.focus();
        iframeWin.print();
      } catch (err) {
        console.error("Print failed:", err);
        alert(
          "Unable to generate PDF. Please try using your browser's print function (Ctrl+P / Cmd+P)."
        );
      }
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 500);
    }, 250);
  }, [previewRef]);

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      Download PDF
    </button>
  );
}
