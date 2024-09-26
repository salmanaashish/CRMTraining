var CaseManagement = (function () {

    return {
        onLoad: onLoad,
        handleCaseTypeChange: handleCaseTypeChange
    };

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        formContext.getAttribute("casetypecode").addOnChange(handleCaseTypeChange);
        handleCaseTypeChange(executionContext);  // Run on load to handle existing data
    }

    // Function to show/hide fields based on case type
    function handleCaseTypeChange(executionContext) {
        var formContext = executionContext.getFormContext();
        var caseType = formContext.getAttribute("casetypecode").getValue();

        if (caseType === 1) { // Assuming '1' is Complaint
            formContext.getControl("complaintdetails").setVisible(true);
            formContext.getAttribute("complaintdetails").setRequiredLevel("required");
        } else {
            formContext.getControl("complaintdetails").setVisible(false);
            formContext.getAttribute("complaintdetails").setRequiredLevel("none");
        }

        if (caseType === 2) { // Assuming '2' is Request
            formContext.getControl("requestdetails").setVisible(true);
            formContext.getAttribute("requestdetails").setRequiredLevel("required");
        } else {
            formContext.getControl("requestdetails").setVisible(false);
            formContext.getAttribute("requestdetails").setRequiredLevel("none");
        }
    }

})();
