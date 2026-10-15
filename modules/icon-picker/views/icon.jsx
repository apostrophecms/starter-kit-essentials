// Renders an `iconPicker` field value as an inline Lucide SVG.
//
//   <Template templateName="icon-picker:icon" icon={widget.icon} />
//
// Pass `label` for a meaningful icon; without one the icon is decorative
// and hidden from assistive technology.

export default function ({ icon, label }, { apos }) {
  const picker = apos.modules['icon-picker'];
  const node = picker.getIconNode(icon?.name);
  if (!node) {
    return null;
  }
  const size = picker.options.sizes[icon.size] || picker.options.sizes.m;
  const color = picker.getCssColor(icon.color);
  const shape = icon.shape || 'none';

  return (
    <span
      className={`icon icon--${shape}`}
      style={color ? `color: ${color}` : null}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={icon.strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={label ? 'img' : null}
        aria-label={label || null}
        aria-hidden={label ? null : 'true'}
      >
        {node.map(([ Tag, attrs ]) => <Tag {...attrs} />)}
      </svg>
    </span>
  );
}
