var AccountEntity = (function () {

    return {
        onLoad: onLoad,
        autoPopulateIndustry: autoPopulateIndustry,
        toggleControls: toggleControls
    };

    // OnLoad function to set initial state and bindings
    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();

        // Set an event listener for account type change
        formContext.getAttribute("accounttype").addOnChange(autoPopulateIndustry);

        // Toggle controls based on user roles
        toggleControls(formContext);
    }

    // Function to auto-populate the industry field
    function autoPopulateIndustry(executionContext) {
        var formContext = executionContext.getFormContext();
        var accountType = formContext.getAttribute("accounttype").getValue();

        switch (accountType) {
            case "Customer":
                formContext.getAttribute("industry").setValue("Retail");
                break;
            case "Supplier":
                formContext.getAttribute("industry").setValue("Manufacturing");
                break;
            default:
                formContext.getAttribute("industry").setValue("Other");
        }

        formContext.getAttribute("industry").setSubmitMode("always");
    }

    // Function to enable/disable fields based on user's security role
    function toggleControls(formContext) {
        var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles.getAll();
        var disableForRole = false;

        // Assuming a specific role GUID is the one to disable fields for
        var roleGuidToDisable = "11111111-1111-1111-1111-111111111111";

        userRoles.forEach(function (role) {
            if (role.id.replace("{", "").replace("}", "") === roleGuidToDisable) {
                disableForRole = true;
            }
        });

        if (disableForRole) {
            formContext.getControl("accountname").setDisabled(true);
            formContext.getControl("industry").setDisabled(true);
        }
    }

})();
