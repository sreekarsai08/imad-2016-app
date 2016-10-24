
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ac', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ac.html'));
});
app.get('/aboutschool', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'aboutschool.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
