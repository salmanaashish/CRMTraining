var LeadEntity = (function () {

    return {
        onLoad: onLoad,
        checkLeadStatus: checkLeadStatus
    };

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();

        // Check the lead status on load
        checkLeadStatus(formContext);
    }

    // Function to check lead status and apply logic accordingly
    function checkLeadStatus(formContext) {
        var status = formContext.getAttribute("statuscode").getValue();

        // Assuming 'Qualified' status has a value of 3
        if (status === 3) {
            formContext.ui.setFormNotification("This lead has already been qualified.", "INFO", "leadQualified");

            // Disable all fields if lead is qualified
            var controls = formContext.ui.controls.get();
            for (var i in controls) {
                var control = controls[i];
                control.setDisabled(true);
            }
        }
    }

})();
