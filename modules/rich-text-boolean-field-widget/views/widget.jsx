// Server-rendered markup for the field. A headless front end does not use
// this template for visitors, but the form editor still uses it to preview
// the field, so keep it.
export default function ({ widget }, {
  apos, helpers, __t
}) {
  // ids must be unique doc-wide
  const id = apos.util.generateId();
  // Adds the form module's `classPrefix` classes, if that option is set.
  // It is a template helper, so it lives on `helpers`, not on `apos`.
  const { prependIfPrefix } = helpers.modules['@apostrophecms/form'];

  // `data-apos-form-boolean` is required for server-rendered forms. The
  // built-in checkbox field's browser code uses it to collect the value on
  // submit and to run conditional groups.
  return (
    <div
      data-apos-form-boolean
      className='rich-check rich-text-boolean-field'
    >
      <div className='rich-check__option'>
        <input
          type='checkbox'
          id={id}
          className={`rich-check__input ${prependIfPrefix('__input')}`}
          name={widget.fieldName}
          value='true'
          checked={!!widget.checked}
          required={!!widget.required}
        />
        <label
          htmlFor={id}
          className={`rich-check__label ${prependIfPrefix('_label')}`}
        >
          {widget._richLabelHtml
            // Inline HTML with links resolved, built by the module's `load`
            ? <span dangerouslySetInnerHTML={{ __html: widget._richLabelHtml }} />
            : widget.fieldLabel}
          {widget.required && (
            <span className='rich-check__required'> {__t('project:required')}</span>
          )}
        </label>
      </div>
      <span
        className={`rich-check__message ${prependIfPrefix('__label-message')}`}
        data-apos-input-message={widget.fieldName}
        hidden
      />
    </div>
  );
}
