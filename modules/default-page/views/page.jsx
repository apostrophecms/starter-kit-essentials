// The project's custom page type: the site layout wrapping a heading and a
// single editable area.

export default function ({ page }, { Extend, Area }) {
  return (
    <Extend
      templateName="layout.jsx"
      main={
        <section className="bp-content">
          <h1>{page.title}</h1>
          <Area doc={page} name="main" />
        </section>
      }
    />
  );
}
