export const NotFound = (req, res) => {
  return res.status(404).json({ status: 404, data: 'Page not found' });
};
