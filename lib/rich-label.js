// Shared by the rich text checkbox field types.
//
// Turns the value of a `richText` label field into inline HTML that can go
// inside a <label> element:
//
// - Links to pages on this site are stored as placeholders
//   (`#apostrophe-permalink-...`). They are replaced with the page's current
//   URL, and the link text follows the page title. The REST API returns the
//   stored placeholders, so this matters for headless front ends.
// - The rich text editor wraps text in <p>. Block elements are not valid
//   inside <label>, so paragraphs are unwrapped and joined with <br>.
//
// Returns '' when the field is empty.
export async function renderRichLabel(apos, req, html) {
  const richText = apos.modules['@apostrophecms/rich-text-widget'];
  if ((typeof html !== 'string') || richText.isEmptyRichText(html)) {
    return '';
  }
  const resolved = await richText.renderRichText(req, html);
  return toInlineHtml(resolved);
}

// The markup has already been sanitized when it was saved, and the label
// toolbar only offers bold, italic and links, so only block wrappers need
// handling here.
export function toInlineHtml(html) {
  let inline = html
    .replace(/<\/(p|h[1-6]|div|li|blockquote)>\s*/gi, '<br>')
    .replace(/<\/?(p|h[1-6]|div|li|blockquote|ul|ol)(\s[^>]*)?>/gi, '')
    .trim();
  // Remove trailing line breaks one at a time. A single regular expression
  // for "any number of <br> and spaces at the end" is slow on long runs of
  // spaces (polynomial backtracking).
  const trailingBreak = /<br\s*\/?>$/i;
  while (trailingBreak.test(inline)) {
    inline = inline.replace(trailingBreak, '').trimEnd();
  }
  return inline;
}
