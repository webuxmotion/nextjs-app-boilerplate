export default function post(req, res) {
  res.json({yourId: req.query.id});
}
