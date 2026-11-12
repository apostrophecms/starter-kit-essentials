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
  const { disableOptionalLabel } = apos.modules['@apostrophecms/form'].options;

  // `data-apos-form-checkboxes` is required for server-rendered forms. The
  // built-in checkboxes field's browser code uses it to collect the values
  // on submit and to run conditional groups.
  return (
    <fieldset
      data-apos-form-checkboxes
      className={`rich-check rich-text-checkboxes-field ${prependIfPrefix('__fieldset')}`}
    >
      <legend className={`rich-check__legend ${prependIfPrefix('__legend')}`}>
        {widget.fieldLabel}
        {widget.required && (
          <span className='rich-check__required'> {__t('project:required')}</span>
        )}
        {!widget.required && !disableOptionalLabel && (
          <span className='rich-check__optional'> {__t('aposForm:templateOptional')}</span>
        )}
      </legend>
      <div className='rich-check__options'>
        {(widget.choices || []).map(choice => {
          const choiceId = id + apos.util.slugify(choice.value);
          // No `key`: this is Apostrophe's server-side JSX, which has no
          // reconciler (see AGENTS.md). The lint rule is meant for React.
          return (
            // eslint-disable-next-line react/jsx-key
            <div className={`rich-check__option ${prependIfPrefix('__check-wrapper')}`}>
              <input
                type='checkbox'
                id={choiceId}
                className={`rich-check__input ${prependIfPrefix('__input')}`}
                name={widget.fieldName}
                value={choice.value}
              />
              <label
                htmlFor={choiceId}
                className={`rich-check__label ${prependIfPrefix('__label')}`}
              >
                {choice._richLabelHtml
                  // Inline HTML with links resolved, built by the module's `load`
                  ? <span dangerouslySetInnerHTML={{ __html: choice._richLabelHtml }} />
                  : choice.label}
              </label>
            </div>
          );
        })}
      </div>
      <p
        className='rich-check__message'
        data-apos-input-message={widget.fieldName}
        hidden
      />
    </fieldset>
  );
}
