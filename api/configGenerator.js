import { check, validationResult } from "express-validator";
import Mustache from "mustache";
const fs = require("fs");

// Define checks
exports.validate = [
  check("hostname")
    .isString()
    .optional(),
  check("password")
    .isString()
    .optional(),
  check("passwordAdmin")
    .isString()
    .optional(),
  check("serverCommandPassword")
    .isString()
    .optional(),
  check("motd")
    .isArray()
    .optional(),
  check("motdInterval")
    .isString()
    .optional(),
  check("admins")
    .isArray()
    .optional(),
  check("headlessClients")
    .isArray()
    .optional(),
  check("localClient")
    .isArray()
    .optional(),
  check("maxPlayers")
    .isString()
    .optional(),
  check("kickDuplicate")
    .isString()
    .optional(),
  check("verifySignatures")
    .isString()
    .optional(),
  check("disconnectTimeout")
    .isString()
    .optional(),
  check("maxdesync")
    .isString()
    .optional(),
  check("maxping")
    .isString()
    .optional(),
  check("maxpacketloss")
    .isString()
    .optional(),
  check("allowedFilePatching")
    .isString()
    .optional(),
  check("upnp")
    .isString()
    .optional(),
  check("loopback")
    .isString()
    .optional(),
  check("BattlEye")
    .isString()
    .optional(),
  check("drawingInMap")
    .isString()
    .optional(),
  check("persistent")
    .isString()
    .optional(),
  check("forceRotorLibSimulation")
    .isString()
    .optional(),
  check("voteThreshold")
    .isString()
    .optional(),
  check("voteMissionPlayers")
    .isString()
    .optional(),
  check("disableVoN")
    .isString()
    .optional(),
  check("vonCodec")
    .isString()
    .optional(),
  check("vonCodecQuality")
    .isString()
    .optional(),
  //Missions
  check("misssions")
    .isArray()
    .optional(),
  // Difficulty
  check("forcedDifficulty")
    .isString()
    .optional(),
  check("forcedDifficultyValue")
    .isString()
    .optional(),
  check("reducedDamage")
    .isString()
    .optional(),
  check("groupIndicators")
    .isString()
    .optional(),
  check("friendlyTags")
    .isString()
    .optional(),
  check("enemyTags")
    .isString()
    .optional(),
  check("detectedMines")
    .isString()
    .optional(),
  check("commands")
    .isString()
    .optional(),
  check("waypoints")
    .isString()
    .optional(),
  check("tacticalPing")
    .isString()
    .optional(),
  check("weaponInfo")
    .isString()
    .optional(),
  check("stanceIndicator")
    .isString()
    .optional(),
  check("staminaBar")
    .isString()
    .optional(),
  check("weaponCrosshair")
    .isString()
    .optional(),
  check("visionAid")
    .isString()
    .optional(),
  check("thirdPersonView")
    .isString()
    .optional(),
  check("cameraShake")
    .isString()
    .optional(),
  check("scoreTable")
    .isString()
    .optional(),
  check("deathMessages")
    .isString()
    .optional(),
  check("vonID")
    .isString()
    .optional(),
  check("mapContent")
    .isString()
    .optional(),
  check("autoReport")
    .isString()
    .optional(),
  check("multipleSaves")
    .isString()
    .optional(),
  check("skillAI")
    .isString()
    .optional(),
  check("precisionAI")
    .isString()
    .optional(),
  // Logs
  check("logFile")
    .isString()
    .optional(),
  check("timeStampFormat")
    .isString()
    .optional()
];

export function generate(req, res) {
  try {
    validationResult(req).throw();
    var data = {
      hostname: !req.body.hostname ? "Awesome server name! | Server Config generated with a3config.byjokese.com" : req.body.hostname,
      password: req.body.password,
      passwordAdmin: req.body.passwordAdmin,
      serverCommandPassword: req.body.serverCommandPassword ? req.body.passwordAdmin : req.body.serverCommandPassword,
      //----
      motd: req.body.motd && req.body.motd.length ? proccessStringArray("motd", req.body.motd) : "",
      motdInterval: !req.body.motdInterval ? 5 : req.body.motdInterval,
      admins: req.body.admins && req.body.admins.length ? proccessStringArray("admins", req.body.admins) : "",
      headlessClients:
        req.body.headlessClients && req.body.headlessClients.length ? proccessStringArray("headlessClients", req.body.headlessClients) : "",
      localClient: req.body.localClient && req.body.localClient.length ? proccessStringArray("localClient", req.body.localClient) : "",
      maxPlayers: !req.body.maxPlayers ? 8 : req.body.maxPlayers,
      kickDuplicate: !req.body.kickDuplicate ? 1 : req.body.kickDuplicate,
      verifySignatures: !req.body.verifySignatures ? 0 : req.body.verifySignatures,
      disconnectTimeout: !req.body.disconnectTimeout ? 90 : req.body.disconnectTimeout,
      maxdesync: !req.body.maxdesync ? 150 : req.body.maxdesync,
      maxping: !req.body.maxping ? 200 : req.body.maxping,
      maxpacketloss: !req.body.maxpacketloss ? 50 : req.body.maxpacketloss,
      allowedFilePatching: !req.body.allowedFilePatching ? 0 : req.body.allowedFilePatching,
      upnp: !req.body.upnp ? 0 : req.body.upnp, //$("#upnp").is(":checked") ? 1 : 0,
      loopback: !req.body.loopback ? 0 : req.body.loopback, //$("#loopback").is(":checked") ? 1 : 0,
      BattlEye: !req.body.BattlEye ? 1 : req.body.BattlEye, //$("#BattlEye").is(":checked") ? 1 : 0,
      drawingInMap: !req.body.drawingInMap ? 1 : req.body.drawingInMap, //$("#drawingInMap").is(":checked") ? 1 : 0,
      persistent: !req.body.persistent ? 0 : req.body.persistent, //$("#persistent").is(":checked") ? 1 : 0,
      forceRotorLibSimulation: !req.body.forceRotorLibSimulation ? 0 : req.body.forceRotorLibSimulation,
      voteThreshold: !req.body.voteThreshold ? 33 : req.body.voteThreshold / 100,
      voteMissionPlayers: !req.body.voteMissionPlayers ? 1 : req.body.voteMissionPlayers,
      disableVoN: !req.body.disableVoN ? 0 : req.body.disableVoN,
      vonCodec: !req.body.vonCodec ? 0 : req.body.vonCodec,
      vonCodecQuality: !req.body.vonCodecQuality ? 3 : req.body.vonCodecQuality,
      //Missions
      misssions: proccessMissionData(req.body.missions),
      // Difficulty
      forcedDifficulty: !req.body.forcedDifficulty ? 0 : req.body.forcedDifficulty,
      forcedDifficultyValue: !req.body.forcedDifficultyValue ? "Recruit" : !req.body.forcedDifficultyValue,
      reducedDamage: !req.body.reducedDamage ? 0 : req.body.reducedDamage,
      groupIndicators: !req.body.groupIndicators ? 1 : req.body.groupIndicators,
      friendlyTags: !req.body.friendlyTags ? 1 : req.body.friendlyTags,
      enemyTags: !req.body.enemyTags ? 1 : req.body.enemyTags,
      detectedMines: !req.body.detectedMines ? 1 : req.body.detectedMines,
      commands: !req.body.commands ? 1 : req.body.commands,
      waypoints: !req.body.waypoints ? 1 : req.body.waypoints,
      tacticalPing: !req.body.tacticalPing ? 0 : req.body.tacticalPing,
      weaponInfo: !req.body.weaponInfo ? 2 : req.body.weaponInfo,
      stanceIndicator: !req.body.stanceIndicator ? 2 : req.body.stanceIndicator,
      staminaBar: !req.body.staminaBar ? 1 : req.body.staminaBar,
      weaponCrosshair: !req.body.weaponCrosshair ? 0 : req.body.weaponCrosshair,
      visionAid: !req.body.visionAid ? 1 : req.body.visionAid,
      thirdPersonView: !req.body.thirdPersonView ? 1 : req.body.thirdPersonView,
      cameraShake: !req.body.cameraShake ? 0 : req.body.cameraShake,
      scoreTable: !req.body.scoreTable ? 1 : req.body.scoreTable,
      deathMessages: !req.body.deathMessages ? 1 : req.body.deathMessages,
      vonID: !req.body.deatvonIDMessages ? 1 : req.body.vonID,
      mapContent: !req.body.mapContent ? 0 : req.body.mapContent,
      autoReport: !req.body.autoReport ? 1 : req.body.autoReport,
      multipleSaves: !req.body.multipleSaves ? 1 : req.body.multipleSaves,
      skillAI: !req.body.skillAI ? 0.5 : req.body.skillAI,
      precisionAI: !req.body.precisionAI ? 0.5 : req.body.precisionAI,
      // Logs
      logFile: !req.body.logFile ? "server_console.log" : req.body.logFile,
      timeStampFormat: !req.body.timeStampFormat ? "none" : req.body.timeStampFormat
    };
    fs.readFile("../templates/server.cfg", (err, template) => {
      if (err) res.send(err);
      var rendered = Mustache.render(template.toString(), data);
      //res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", "attachment; filename=server.cfg");
      res.send(rendered);
    });
  } catch (err) {
    res.status(422).json({ err: err.array() });
  }
}

function proccessStringArray(type, string) {
  var data = [];
  if (string != "") {
    var messagues = string.split(",");
    var mesgArraylenght = messagues.length;
    var index = 0;
    messagues.forEach(function(element) {
      // Delete white space for second and on elements
      if (element.charAt(0) == " ") element = element.substr(1);
      // If last element dont add any commas, else add a comma at the end
      if (index == mesgArraylenght - 1) var msg = '"' + element + '"';
      else var msg = '"' + element + '",';
      //Add messague to the list of messagues.
      switch (type) {
        case "motd":
          data.push({
            motd: msg
          });
          break;
        case "admins":
          data.push({
            admins: msg
          });
          break;
        case "headlessClients":
          data.push({
            headlessClients: msg
          });
          break;
        case "localClient":
          data.push({
            localClient: msg
          });
          break;
        default:
          break;
      }
      index++;
    });
  }
  return data;
}

function proccessMissionData(missions) {
  var data = [];

  missions.forEach((mission, index) => {
    data.push({
      missionClassName: "mission_" + index,
      missionName: mission.missionName,
      missionDifficulty: mission.missionDifficulty
    });
  });
  return data;
}

/*const {
    // Server
    hostname,
    password,
    passwordAdmin,
    serverCommandPassword,
    motd,
    motdInterval,
    admins,
    headlessClients,
    localClient,
    maxPlayers,
    kickDuplicate,
    verifySignatures,
    disconnectTimeout,
    maxdesync,
    maxping,
    maxpacketloss,
    allowedFilePatching,
    upnp,
    loopback,
    BattlEye,
    drawingInMap,
    persistent,
    forceRotorLibSimulation,
    voteThreshold,
    voteMissionPlayers,
    disableVoN,
    vonCodec,
    vonCodecQuality,
    //Missions
    misssions,
    // Difficulty
    forcedDifficulty,
    forcedDifficultyValue,
    reducedDamage,
    groupIndicators,
    friendlyTags,
    enemyTags,
    detectedMines,
    commands,
    waypoints,
    tacticalPing,
    weaponInfo,
    stanceIndicator,
    staminaBar,
    weaponCrosshair,
    visionAid,
    thirdPersonView,
    cameraShake,
    scoreTable,
    deathMessages,
    vonID,
    mapContent,
    autoReport,
    multipleSaves,
    skillAI,
    precisionAI,
    // Logs
    logFile,
    timeStampFormat
  } = req.body;*/
