export default function ({ widget }, { Template }) {
  return (
    <div className="icon-widget">
      <Template templateName="icon-picker:icon" icon={widget.icon} label={widget.label} />
    </div>
  );
}
