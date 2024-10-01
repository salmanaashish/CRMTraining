function createaccount(executionContext) {
	var formContext = executionContext.getFormContext();]
	var Firstname = formContext.getAttribute("firstname").getValue();
	var Lastname = formContext.getAttribute("lastname").getValue();
	var Email = formContext.getAttribute("emailaddress1").getValue();
	var formtype = formContext.ui.getFormType();
	if (formtype == 1) { //create
		var record = {};
		record.name = Firstname + Lastname; // Text
		record.emailaddress1 = Email; // Text

		Xrm.WebApi.createRecord("account", record).then(
			function success(result) {
				var newId = result.id;
				console.log(newId);
			},
			function (error) {
				console.log(error.message);
			}
		);

	}
	else if (formtype == 2) {
		var recordid = formContext.data.entity.getId().replace("{", "").replace("}", "");

		var record = {};
		record.name = Firstname + Lastname; // Text
		record.emailaddress1 = Email; // Text

		Xrm.WebApi.updateRecord("account", recordid, record).then(
			function success(result) {
				var updatedId = result.id;
				console.log(updatedId);
			},
			function (error) {
				console.log(error.message);
			}
		);
	}

	
}






