// TODO: initialize stuff here

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./Components/', true, /\/script\.js$/));
