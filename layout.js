function layout(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel='stylesheet' src='styles.css'>
  <title>${title}</title>
  
</head>
<body>
  ${content}
</body>
</html>`
  ;
}

module.exports = layout;