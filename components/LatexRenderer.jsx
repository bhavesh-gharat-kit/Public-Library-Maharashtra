"use client";
import { BlockMath, InlineMath } from "react-katex";

/**
 * LatexRenderer
 * -------------
 * Renders text with inline/block LaTeX using KaTeX.
 *
 * Supports:
 *   - \( ... \)   → inline math
 *   - \[ ... \]   → block math
 *   - $$ ... $$   → block math
 *   - \begin{...}...\end{...} → block math
 *   - auto-detection of raw LaTeX commands (\frac, \left, etc.)
 *
 * Usage:
 *   <LatexRenderer text="The solution is \(x^2+1\)" />
 */
export default function LatexRenderer({ text }) {
  if (!text) return null;

  const parts = [];
  const regex =
    /(\$\$.*?\$\$|\\\(.*?\\\)|\\\[.*?\\\]|\\begin\{[\s\S]*?\\end\{[a-zA-Z*]+\})/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      // plain text before math
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }

    let mathContent = match[0];

    if (mathContent.startsWith("$$")) {
      mathContent = mathContent.slice(2, -2).trim();
      parts.push({ type: "block", content: mathContent });
    } else if (mathContent.startsWith("\\(")) {
      mathContent = mathContent.slice(2, -2).trim();
      parts.push({ type: "inline", content: mathContent });
    } else if (mathContent.startsWith("\\[")) {
      mathContent = mathContent.slice(2, -2).trim();
      parts.push({ type: "block", content: mathContent });
    } else if (mathContent.startsWith("\\begin")) {
      // full environment → block
      parts.push({ type: "block", content: mathContent.trim() });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((part, idx) => {
        if (part.type === "text") return <span key={idx}>{part.content}</span>;
        if (part.type === "inline")
          return <InlineMath key={idx} math={part.content} />;
        if (part.type === "block")
          return <BlockMath key={idx} math={part.content} />;
      })}
    </>
  );
}
