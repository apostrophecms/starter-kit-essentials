export default {
  // When not in production, refresh the page on restart
  options: {
    // Change to `apos` for admin UI HMR
    // `public` is the default and provides HMR for project UI code
    hmr: 'public',
    refreshOnRestart: true,
    breakpointPreviewMode: {
      // Enable breakpoint preview mode
      enable: true,
      // Warn during build about unsupported media queries.
      debug: false,
      // Screens with icons
      // For adding icons, please refer to the icons documentation
      // https://docs.apostrophecms.org/reference/module-api/module-overview.html#icons
      screens: {
        desktop: {
          label: 'apostrophe:breakpointPreviewDesktop',
          width: '1440px',
          height: '900px',
          icon: 'monitor-icon',
          shortcut: true
        },
        tablet: {
          label: 'apostrophe:breakpointPreviewTablet',
          width: '1024px',
          height: '768px',
          icon: 'tablet-icon',
          shortcut: true
        },
        mobile: {
          label: 'apostrophe:breakpointPreviewMobile',
          width: '414px',
          height: '896px',
          icon: 'cellphone-icon',
          shortcut: true
        },
        landscape: {
          label: 'landscape',
          width: '896px',
          height: '414px'
        },
        smallMobile: {
          label: 'small mobile',
          width: '320px',
          height: '568px'
        },
        largeDesktop: {
          label: 'large desktop',
          width: '2560px',
          height: '1440px'
        },
        square: {
          label: 'square',
          width: '768px',
          height: '768px'
        }
      }
    }
  }
};
