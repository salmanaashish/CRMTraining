function openConfiguredForm(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the Subject lookup field value
    var subjectLookup = formContext.getAttribute("subject").getValue();
    
    if (!subjectLookup || subjectLookup.length === 0) {
        Xrm.Navigation.openAlertDialog({ text: "Please select a Subject before proceeding." });
        return;
    }
    
    var subjectId = subjectLookup[0].id.replace("{", "").replace("}", ""); // Extract GUID
    var subjectName = subjectLookup[0].name; // Subject Name

    // Get current Form ID
    var formId = formContext.ui.formSelector.getCurrentItem().getId();

    // Fetch Configuration entity based on Subject and Form ID
    var fetchXml = `
        <fetch top="1">
            <entity name="your_configuration_entity">
                <attribute name="your_form_id_field" />
                <filter>
                    <condition attribute="your_subject_field" operator="eq" value="${subjectId}" />
                    <condition attribute="your_form_id_field" operator="eq" value="${formId}" />
                </filter>
            </entity>
        </fetch>`;

    Xrm.WebApi.retrieveMultipleRecords("your_configuration_entity", "?fetchXml=" + encodeURIComponent(fetchXml))
        .then(function (result) {
            if (result.entities.length > 0) {
                var configuredFormId = result.entities[0]["your_form_id_field"];

                // Open the retrieved form
                var entityFormOptions = {
                    entityName: "case",
                    formId: configuredFormId
                };

                Xrm.Navigation.openForm(entityFormOptions).then(
                    function (success) {
                        console.log("Form opened successfully.");
                    },
                    function (error) {
                        console.error("Error opening form: ", error);
                    }
                );
            } else {
                Xrm.Navigation.openAlertDialog({ text: "No matching configuration found for the selected Subject." });
            }
        })
        .catch(function (error) {
            console.error("Error retrieving configuration entity: ", error);
        });
}
