import React, { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function AiMessage({ markdownText }) {
  // Convert Markdown → HTML → Safe HTML
  const safeHtml = useMemo(() => {
    const rawHtml = marked(markdownText || "", {
      breaks: true,        // Line breaks like in Markdown
      gfm: true            // GitHub-flavored Markdown
    });
    return DOMPurify.sanitize(rawHtml);
  }, [markdownText]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
