// Top-level project layout. Extends Apostrophe's outerLayout — a Nunjucks
// template — through the bridge in `jsxRender.js`: each prop below becomes a
// {% block %} override on that template.
//
// Accepts these named props from page templates:
//
//   title  string used as the <title>, overriding the piece/page title
//   main   JSX node providing the page's content
//
// `data` is deliberately not destructured here. Props passed by a page
// template arrive as this template's data, so `data.main` is the `main` prop
// rather than anything belonging to the page document.

function Header({ user }) {
  return (
    <header className="bp-header">
      <img className="bp-header__logo" src="/images/logo.png" alt="ApostropheCMS logo" />
      <nav className="bp-nav"></nav>
      {!user && (
        <a className="bp-button bp-header__login" href="/login">Login</a>
      )}
    </header>
  );
}

const footerLinks = [
  {
    url: 'https://apostrophecms.com/',
    label: 'About ApostropheCMS'
  },
  {
    url: 'https://chat.apostrophecms.com/',
    label: 'Discord'
  },
  {
    url: 'https://twitter.com/apostrophecms',
    label: 'Twitter'
  },
  {
    url: 'https://github.com/apostrophecms/apostrophe/discussions',
    label: 'GitHub Discussions'
  }
];

function Footer() {
  return (
    <footer className="bp-footer">
      <h3>Essential Links</h3>
      <ul className="bp-footer__links">
        {footerLinks.map(({ url, label }) => (
          <li>
            <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default function (data, { Extend, apos }) {
  // `data.title` is how a page template overrides the title — the JSX
  // equivalent of Nunjucks `{% block title %}`. Templates without a page or
  // piece in context (notFound.jsx) rely on it.
  const title = data.title ||
    (data.piece && data.piece.title) ||
    (data.page && data.page.title);

  if (!title) {
    apos.util.log('Looks like you forgot to override the title block in a template that does not have access to an Apostrophe page or piece.');
  }

  return (
    <Extend
      templateName={data.outerLayout}
      title={title}
      main={
        <div className="bp-wrapper">
          <Header user={data.user} />
          <main className="bp-main">
            {data.main}
          </main>
          <Footer />
        </div>
      }
    />
  );
}
