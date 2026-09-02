// Project-level 404 template.
//
// This shadows core's `notFound.html`, and it is NOT a redundant override.
// Core's version is Nunjucks and extends `layout.html`; a Nunjucks template
// cannot extend this project's JSX `layout.jsx`, so deleting this file makes
// every 404 throw instead of rendering. A project-level file wins over a
// core-level one regardless of extension, which is what makes the shadow work.

export default function (data, { Extend }) {
  return (
    <Extend
      templateName="layout.jsx"
      title="404 - Page not found"
      main={
        <>We&apos;re sorry. We couldn&apos;t find the page you&apos;re looking for.</>
      }
    />
  );
}
