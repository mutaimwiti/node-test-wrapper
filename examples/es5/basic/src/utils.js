function renderUnAuthorized(res) {
  res.status(401).json({
    message: 'Unauthorized'
  });
}

module.exports.renderUnAuthorized = renderUnAuthorized;
