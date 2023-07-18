const logs = global.logs;

exports.getIndex = (req, res) => {
  let indexHTML = "<ul>";

  for (let i = 0; i < logs.length; i++) {
    indexHTML += `<li><a href="/v2/logs/${i}">${logs[i].title}</a></li>`;
  }

  indexHTML += "</ul>";

  res.send(indexHTML);
};

exports.getShow = (req, res) => {
  const index = req.params.index;
  const log = logs[index];

  if (log) {
    const showHTML = `
      <h1>${log.title}</h1>
      <p>${log.post}</p>
      <p>Captain: ${log.captainName}</p>
      <p>Mistakes were made today: ${log.mistakesWereMadeToday}</p>
      <p>Days since last crisis: ${log.daysSinceLastCrisis}</p>
      <a href="/v2/logs">Back</a>
    `;

    res.send(showHTML);
  } else {
    res.status(404).send("Log not found");
  }
};