// The home page. Shows setup guidance to logged-out visitors, an editing hint
// to logged-in ones, and the page's `main` area to everyone.

export default function ({ page, user, query }, { Extend, Area }) {
  return (
    <Extend
      templateName="layout.jsx"
      main={
        <section className="bp-welcome">
          <h1 className="bp-welcome__headline">
            Welcome to ApostropheCMS
          </h1>
          {/* Message only for logged out users. */}
          {!user && (
            <>
              <h3 className="bp-welcome__help">First time spinning up your ApostropheCMS project?</h3>
              <p>
                Log in with the admin username and password you chose during setup. If you haven&apos;t created a user yet, add one from the command line:
              </p>
              <pre className="bp-welcome__code">
                <span className="bp-welcome__code__context">Command Line</span>
                <code>
                  node app @apostrophecms/user:add myUsername admin
                </code>
              </pre>
              <p className="bp-welcome__cta">
                <a className="bp-button bp-button--cta" href="/login">Then log in here</a>
              </p>
            </>
          )}
          <p>
            For a guide on how to configure and customize this project, <a href="https://apostrophecms.com/docs">please check out the Apostrophe documentation</a>.
          </p>
          <div className="bp-welcome__area">
            {/* Message only for logged in users. */}
            {user && (query['apos-edit'] ? (
              <p>
                Add and edit content below in the content area. 👇
              </p>
            ) : (
              <p>
                Enter <span className="bp-mode">Edit</span> mode from the admin bar <span style="display:inline-block; transform: rotate(45deg)">👆</span> to begin.
              </p>
            ))}
            <Area doc={page} name="main" />
          </div>
        </section>
      }
    />
  );
}
