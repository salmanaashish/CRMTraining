var MortgageRefinancing = (function () {
    // Private functions and variables can be defined here

    // Public functions
    return {
        onLoad: onLoad,
        onInterestRateChange: onInterestRateChange,
        validateForm: validateForm,
        autoPopulateFields: autoPopulateFields,
        toggleSections: toggleSections,
        onCustomerLookupChange: onCustomerLookupChange,
        fetchRelatedData: fetchRelatedData,
        toggleSubmitButton: toggleSubmitButton,
        evaluateRefinancingOptions: evaluateRefinancingOptions
    };
})();

//b. Form OnLoad Event
//Purpose: Initialize the form by checking eligibility, auto - populating fields, and toggling sections.

function onLoad(executionContext) {
    var formContext = executionContext.getFormContext();

    // Check refinancing eligibility
    MortgageRefinancing.checkEligibility(formContext);

    // Auto-populate fields based on customer type
    MortgageRefinancing.autoPopulateFields(formContext);

    // Toggle sections based on eligibility
    MortgageRefinancing.toggleSections(formContext);
}
//c.Field OnChange Event
//Purpose: Recalculate or validate fields when the interest rate changes.
MortgageRefinancing.checkEligibility = function (formContext) {
    var mortgageBalance = formContext.getAttribute("mortgagebalance").getValue();
    var interestRate = formContext.getAttribute("interestrate").getValue();

    if (mortgageBalance > 50000 && interestRate > 4.0) {
        formContext.ui.setFormNotification("Eligible for refinancing with better interest rates.", "INFO", "refinancingEligibility");
    } else {
        formContext.ui.setFormNotification("Not eligible for refinancing based on current criteria.", "WARNING", "refinancingEligibility");
    }
};
//d.Form Validation Before Save
//Purpose: Ensure that all required conditions are met before allowing the form to be saved.
function onInterestRateChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var interestRate = formContext.getAttribute("interestrate").getValue();

    // Example: Validate interest rate is within a reasonable range
    if (interestRate < 1.0 || interestRate > 15.0) {
        formContext.getControl("interestrate").setNotification("Interest rate must be between 1% and 15%.", "interestRateValidation");
    } else {
        formContext.getControl("interestrate").clearNotification("interestRateValidation");
    }

    // Re-check eligibility based on new interest rate
    MortgageRefinancing.checkEligibility(formContext);
};

//e.Auto - Populating Fields Based on Customer Type
//Purpose: Automatically fill in certain fields if the customer is classified as VIP.
function validateForm(executionContext) {
    var formContext = executionContext.getFormContext();
    var status = formContext.getAttribute("statuscode").getValue();

    // Prevent form save if status is not 'Submitted'
    if (status !== 1) { // Assuming '1' is the value for 'Submitted'
        formContext.ui.setFormNotification("Only submitted forms can be saved.", "ERROR", "saveValidation");
        executionContext.getEventArgs().preventDefault();
    }
}
//f.Showing / Hiding Sections Based on Eligibility
//Purpose: Display or hide certain sections of the form based on refinancing eligibility.
function autoPopulateFields(formContext) {
    var customerType = formContext.getAttribute("customertype").getValue();

    if (customerType === "VIP") { // Assuming "VIP" is the label
        // Example: Set a discount rate
        formContext.getAttribute("discountrate").setValue(5.0);
        formContext.getAttribute("discountrate").setSubmitMode("always");

        // Example: Enable a special note field
        formContext.getControl("specialnote").setVisible(true);
    } else {
        // Clear and hide the special note field
        formContext.getAttribute("discountrate").setValue(null);
        formContext.getAttribute("discountrate").setSubmitMode("always");
        formContext.getControl("specialnote").setVisible(false);
    }
}
//g. Handling Lookup Fields and Fetching Related Data
//Purpose: When a related record is selected, fetch additional data to display or process.
function toggleSections(formContext) {
    var mortgageBalance = formContext.getAttribute("mortgagebalance").getValue();
    var interestRate = formContext.getAttribute("interestrate").getValue();

    if (mortgageBalance > 50000 && interestRate > 4.0) {
        // Show the Refinancing Options section
        formContext.ui.tabs.get("RefinancingOptionsTab").sections.get("RefinancingDetailsSection").setVisible(true);
    } else {
        // Hide the Refinancing Options section
        formContext.ui.tabs.get("RefinancingOptionsTab").sections.get("RefinancingDetailsSection").setVisible(false);
    }
}
//g. Handling Lookup Fields and Fetching Related Data
//Purpose: When a related record is selected, fetch additional data to display or process.
function onCustomerLookupChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var customer = formContext.getAttribute("customerid").getValue();

    if (customer != null) {
        var customerId = customer[0].id.replace("{", "").replace("}", "");
        var customerEntity = customer[0].entityType;

        // Fetch customer details using Xrm.WebApi
        Xrm.WebApi.retrieveRecord(customerEntity, customerId, "?$select=creditScore,incomeDetails").then(
            function success(result) {
                var creditScore = result.creditScore;
                var incomeDetails = result.incomeDetails;

                // Populate fields based on fetched data
                formContext.getAttribute("customerscore").setValue(creditScore);
                formContext.getAttribute("customerincome").setValue(incomeDetails);
            },
            function (error) {
                console.log("Error fetching customer details: " + error.message);
            }
        );
    }
}
//a. Enabling/Disabling Controls Based on Conditions
//Purpose: Disable the "Submit Offer" button if the customer does not meet certain criteria.
MortgageRefinancing.toggleSubmitButton = function (formContext) {
    var creditScore = formContext.getAttribute("customerscore").getValue();

    if (creditScore < 600) {
        // Disable the Submit Offer button
        var submitButton = formContext.ui.controls.get("submit_offer_button");
        if (submitButton) {
            submitButton.setDisabled(true);
            formContext.ui.setFormNotification("Submit Offer is disabled due to low credit score.", "WARNING", "submitButtonDisabled");
        }
    } else {
        // Enable the Submit Offer button
        var submitButton = formContext.ui.controls.get("submit_offer_button");
        if (submitButton) {
            submitButton.setDisabled(false);
            formContext.ui.clearFormNotification("submitButtonDisabled");
        }
    }
};
//c. Handling Multiple Conditions and Complex Logic
//Purpose: Implement complex business logic that may involve multiple fields and conditions.

MortgageRefinancing.onInterestRateChange = function (executionContext) {
    var formContext = executionContext.getFormContext();
    var interestRate = formContext.getAttribute("interestrate").getValue();

    // Validate interest rate
    if (interestRate < 1.0 || interestRate > 15.0) {
        formContext.getControl("interestrate").setNotification("Interest rate must be between 1% and 15%.", "interestRateValidation");
    } else {
        formContext.getControl("interestrate").clearNotification("interestRateValidation");
    }

    // Re-check eligibility
    MortgageRefinancing.checkEligibility(formContext);

    // Re-evaluate refinancing options
    MortgageRefinancing.evaluateRefinancingOptions(formContext);
};