"use client";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

/**
 * LatexRenderer
 * -------------
 * Renders inline and block LaTeX with KaTeX.
 *
 * Improvements:
 *   - Supports $...$, $$...$$, \(...\), \[...\], \begin...\end
 *   - Uses KaTeX's throwOnError=false → graceful rendering
 *   - Handles most invalid commands by showing them as text inside output
 */
export default function LatexRenderer({ text }) {
  if (!text) return null;

  // 🔥 Fix over-escaped LaTeX
  text = text.replace(/\\\\/g, "\\");

  const parts = [];
  const regex =
    /(\$\$[\s\S]*?\$\$|\$[^$]*\$|\\\(.*?\\\)|\\\[.*?\\\]|\\begin\{[\s\S]*?\\end\{[a-zA-Z*]+\})/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
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
    } else if (mathContent.startsWith("$")) {
      mathContent = mathContent.slice(1, -1).trim();
      parts.push({ type: "inline", content: mathContent });
    } else if (mathContent.startsWith("\\begin")) {
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

        if (part.type === "inline") {
          return (
            <InlineMath
              key={idx}
              math={part.content}
              errorColor="#cc0000"
              renderError={(err) => <span>{err.name}</span>}
              settings={{ throwOnError: false }}
            />
          );
        }

        if (part.type === "block") {
          return (
            <BlockMath
              key={idx}
              math={part.content}
              errorColor="#cc0000"
              renderError={(err) => <span>{err.name}</span>}
              settings={{ throwOnError: false }}
            />
          );
        }

        return null;
      })}
    </>
  );
}
