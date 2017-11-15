function generateConfigFile() {
	if ($('#serverConfigForm')[0].checkValidity())
		$.get('templates/server.cfg', function (template) {
			var data = {
				hostname: $("#hostname").val(),
				password: $("#password").val(),
				passwordAdmin: $("#passwordAdmin").val(),
				serverCommandPassword: ($("#serverCommandPassword").val()) ? $("#serverCommandPassword").val() : $("#passwordAdmin").val(),
				//----
				motd: proccessStringArray($("#motd").val()),
				//----
				motdInterval: $("#motdInterval").val(),
				admins: proccessStringArray($("#admins").val()),
				headlessClients: proccessStringArray($("#headlessClients").val()),
				localClient: proccessStringArray($("#localClient").val()),
				maxPlayers: $("#maxPlayers").val(),
				kickDuplicate: (($("#kickDuplicate").is(':checked')) ? 1 : 0),
				verifySignatures: $("#verifySignatures").val(),
				disconnectTimeout: $("#disconnectTimeout").val(),
				maxdesync: $("#maxdesync").val(),
				maxping: $("#maxping").val(),
				maxpacketloss: $("#maxpacketloss").val(),
				allowedFilePatching: $("#allowedFilePatching").val(),
				upnp: (($("#upnp").is(':checked')) ? 1 : 0),
				BattlEye: (($("#BattlEye").is(':checked')) ? 1 : 0),
				drawingInMap: (($("#drawingInMap").is(':checked')) ? 1 : 0),
				persistent: (($("#persistent").is(':checked')) ? 1 : 0),
				forceRotorLibSimulation: $("#forceRotorLibSimulation").val(),
				voteThreshold: $("#voteThreshold").val(),
				voteMissionPlayers: $("#voteMissionPlayers").val(),
				disableVoN: $("#disableVoN").val(),
				vonCodec: $("#vonCodec").val(),
				vonCodecQuality: $("#vonCodecQuality").val(),
				//Missions
				misssions: proccessMissionData(),
				// Difficulty
				reducedDamage: (($("#reducedDamage").is(':checked')) ? 1 : 0),
				groupIndicators: $("#groupIndicators").val(),
				friendlyTags: $("#friendlyTags").val(),
				enemyTags: $("#enemyTags").val(),
				detectedMines: $("#detectedMines").val(),
				commands: $("#commands").val(),
				waypoints: $("#waypoints").val(),
				tacticalPing: $("#tacticalPing").val(),
				weaponInfo: $("#weaponInfo").val(),
				stanceIndicator: $("#stanceIndicator").val(),
				staminaBar: (($("#staminaBar").is(':checked')) ? 1 : 0),
				weaponCrosshair: (($("#weaponCrosshair").is(':checked')) ? 1 : 0),
				visionAid: (($("#visionAid").is(':checked')) ? 1 : 0),
				thirdPersonView: (($("#thirdPersonView").is(':checked')) ? 1 : 0),
				cameraShake: (($("#cameraShake").is(':checked')) ? 1 : 0),
				scoreTable: (($("#scoreTable").is(':checked')) ? 1 : 0),
				deathMessages: (($("#deathMessages").is(':checked')) ? 1 : 0),
				vonID: (($("#vonID").is(':checked')) ? 1 : 0),
				mapContent: (($("#mapContent").is(':checked')) ? 1 : 0),
				autoReport: (($("#autoReport").is(':checked')) ? 1 : 0),
				multipleSaves: (($("#multipleSaves").is(':checked')) ? 1 : 0),
				skillAI: $("#skillAI").val(),
				precisionAI: $("#precisionAI").val(),
				// Logs
				logFile: $("#logFile").val(),
				timeStampFormat: $("#multipleSaves").val()
			};
			var rendered = Mustache.render(template, data);
			download("server.cfg", rendered);
		});
}

function download(filename, text) {
	//Fixing the &quot problem.
	var text = text.replace(/&quot;/g, '\"');

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function proccessStringArray(string) {
	var messagues = string.split(",");
	var mesgArraylenght = messagues.length;
	var index = 0;
	var data = [];
	messagues.forEach(function (element) {
		// Delete white space for second and on elements
		if (element.charAt(0 == " "))
			element = element.substr(1);
		// If last element dont add any commas, else add a comma at the end
		if (index == mesgArraylenght - 1)
			var msg = '\"' + element + '\"';
		else
			var msg = '\"' + element + '\",';
		//Add messague to the list of messagues.
		data.push({
			motd: msg
		});
		index++;
	});
	return data;
}

function proccessMissionData() {
	var index = 0;
	var baseMissionName = "MissionFileName";
	var baseMissionDifficulty = "MissionDifficulty";
	var data = [];

	$('#missionSettings').children().each(function (i) {
		var missionId = this.getAttribute("idValue");
		data.push({
			"missionClassName": this.id,
			"missionName": $("#" + baseMissionName + missionId).val(),
			"missionDifficulty": $("#" + baseMissionDifficulty + missionId).val()
		});
	});
	return data;
}


/* misssions structure example
[{
		missionClassName: "TempMission1",
		missionName: "My Mission",
		missionDifficulty: "veteran"
	},
	{
		missionClassName: "TempMission2",
		missionName: "My Mission 2",
		missionDifficulty: "normal"
	}
]*/