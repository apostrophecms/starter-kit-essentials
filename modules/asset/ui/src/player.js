export function parse(el) {
  if (!el) {
    return {};
  }

  const id = el.dataset.aposWidgetId;
  const editMode = el.dataset.aposEditMode;
  const widget = el.dataset.aposWidget;
  const options = el.dataset.aposOptions;

  return {
    id,
    editMode,
    widget: JSON.parse(widget || '{}'),
    options: JSON.parse(options || '{}')
  };
}
