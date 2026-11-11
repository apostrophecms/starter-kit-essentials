// Server-rendered markup for the field. A headless front end does not use
// this template for visitors, but the form editor still uses it to preview
// the field, so keep it.
export default function ({ widget }, {
  apos, helpers, Area, __t
}) {
  // ids must be unique doc-wide
  const id = apos.util.generateId();
  const labelId = `${id}-label`;
  // Adds the form module's `classPrefix` classes, if that option is set.
  // It is a template helper, so it lives on `helpers`, not on `apos`.
  const { prependIfPrefix } = helpers.modules['@apostrophecms/form'];
  const hasRichLabel = !apos.area.isEmpty(widget, 'richLabel');
  const required = widget.required
    ? <span> {__t('project:required')}</span>
    : null;

  // `data-apos-form-boolean` is required for server-rendered forms. The
  // built-in checkbox field's browser code uses it to collect the value on
  // submit and to run conditional groups.
  return (
    <div
      data-apos-form-boolean
      className='apos-form-input-wrapper rich-text-boolean-field'
    >
      <input
        type='checkbox'
        id={id}
        className={`apos-form-input ${prependIfPrefix('__input')}`}
        name={widget.fieldName}
        value='true'
        aria-labelledby={hasRichLabel ? labelId : null}
        checked={!!widget.checked}
        required={!!widget.required}
      />
      {hasRichLabel
        ? (
          // Rich text renders block elements (div, p), which are not valid
          // inside <label>. The input is named by aria-labelledby instead.
          // Visitors tick the box itself; links in the text open normally.
          <div
            id={labelId}
            className={`apos-form-label rich-text-boolean-field__label ${prependIfPrefix('_label')}`}
          >
            <Area doc={widget} name='richLabel' />
            {required}
          </div>
        )
        : (
          // No rich text yet: fall back to the plain-text label
          <label
            htmlFor={id}
            className={`apos-form-label ${prependIfPrefix('_label')}`}
          >
            {widget.fieldLabel}
            {required}
          </label>
        )}
      <span
        className={`apos-form-label-message ${prependIfPrefix('__label-message')}`}
        data-apos-input-message={widget.fieldName}
        hidden
      />
    </div>
  );
}
