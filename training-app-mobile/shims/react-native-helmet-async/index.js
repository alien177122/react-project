const React = require('react')

function HelmetProvider({ children }) {
  return React.createElement(React.Fragment, null, children)
}

function Helmet({ children }) {
  return React.createElement(React.Fragment, null, children)
}

module.exports = {
  Helmet,
  HelmetProvider,
}
