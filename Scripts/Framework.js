// Namespace to encapsulate all project-level functions
var ProjectNamespace = (function () {

    // Public functions
    return {
        onLoad: onLoad,
        onSave: onSave,
        handleFieldChanges: handleFieldChanges,
        setFieldRequirement: setFieldRequirement,
        toggleVisibility: toggleVisibility,
        validateLoanAmount: validateLoanAmount,
        validateWholeNumberField: validateWholeNumberField,
        handleTwoOptionField: handleTwoOptionField,
        handleDecimalField: handleDecimalField,
        populateLookupFields: populateLookupFields,
        fetchRelatedData: fetchRelatedData,
        checkUserRole: checkUserRole,
        enableDisableFieldsBasedOnRole: enableDisableFieldsBasedOnRole
    };

    // Function triggered on form load
    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();

        // ------------------- Loan Entity ------------------- //
        // Bind event listeners for specific fields in Loan entity
        formContext.getAttribute("loanamount").addOnChange(validateLoanAmount); // Loan entity: loanamount
        formContext.getAttribute("numberofemployees").addOnChange(validateWholeNumberField); // Loan entity: numberofemployees

        // ------------------- Contact Entity ------------------- //
        formContext.getAttribute("parentcustomerid").addOnChange(handleFieldChanges); // Contact entity: parentcustomerid

        // ------------------- Account Entity ------------------- //
        formContext.getAttribute("isactive").addOnChange(handleTwoOptionField); // Account entity: isactive
        formContext.getAttribute("discountrate").addOnChange(handleDecimalField); // Account entity: discountrate

        // Populate lookup fields from related entities and handle role-based control access
        populateLookupFields(formContext);
        enableDisableFieldsBasedOnRole(formContext);
    }

    // Function triggered on form save
    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();

        // Validate required fields before saving
        validateLoanAmount(executionContext); // Loan entity: loanamount
        validateWholeNumberField(executionContext); // Loan entity: numberofemployees
    }

    // Function to handle field changes dynamically
    function handleFieldChanges(executionContext) {
        var formContext = executionContext.getFormContext();
        var accountType = formContext.getAttribute("accounttype").getValue(); // Account entity: accounttype

        // Toggle visibility based on account type (Account Entity)
        toggleVisibility(formContext, "discount", accountType === "VIP"); // Account entity: discount

        // Set required level for fields based on conditions (Account Entity)
        setFieldRequirement(formContext, "discount", accountType === "VIP" ? "required" : "none"); // Account entity: discount
    }

    // Set required level for a field
    function setFieldRequirement(formContext, fieldName, requiredLevel) {
        formContext.getAttribute(fieldName).setRequiredLevel(requiredLevel);
    }

    // Toggle visibility of a form field
    function toggleVisibility(formContext, fieldName, isVisible) {
        formContext.getControl(fieldName).setVisible(isVisible);
    }

    // Validate loan amount (example for a currency field)
    function validateLoanAmount(executionContext) {
        var formContext = executionContext.getFormContext();
        var loanAmount = formContext.getAttribute("loanamount").getValue(); // Loan entity: loanamount

        if (loanAmount <= 0) {
            formContext.ui.setFormNotification("Loan amount must be greater than zero.", "ERROR", "loanAmountValidation");
            executionContext.getEventArgs().preventDefault();
        } else {
            formContext.ui.clearFormNotification("loanAmountValidation");
        }
    }

    // Validate whole number fields like number of employees
    function validateWholeNumberField(executionContext) {
        var formContext = executionContext.getFormContext();
        var numberOfEmployees = formContext.getAttribute("numberofemployees").getValue(); // Loan entity: numberofemployees

        if (numberOfEmployees < 0) {
            formContext.ui.setFormNotification("Number of employees cannot be negative.", "ERROR", "numberOfEmployeesValidation");
            executionContext.getEventArgs().preventDefault();
        } else {
            formContext.ui.clearFormNotification("numberOfEmployeesValidation");
        }
    }

    // Handle Two Option (Boolean) fields
    function handleTwoOptionField(executionContext) {
        var formContext = executionContext.getFormContext();
        var isActive = formContext.getAttribute("isactive").getValue(); // Account entity: isactive

        if (isActive === true) {
            formContext.ui.setFormNotification("This account is active.", "INFO", "isActiveNotification");
        } else {
            formContext.ui.clearFormNotification("isActiveNotification");
        }
    }

    // Handle Decimal fields (like discount rates)
    function handleDecimalField(executionContext) {
        var formContext = executionContext.getFormContext();
        var discountRate = formContext.getAttribute("discountrate").getValue(); // Account entity: discountrate

        if (discountRate < 0 || discountRate > 100) {
            formContext.ui.setFormNotification("Discount rate must be between 0% and 100%.", "ERROR", "discountRateValidation");
            executionContext.getEventArgs().preventDefault();
        } else {
            formContext.ui.clearFormNotification("discountRateValidation");
        }
    }

    // Populate lookup fields (e.g., fill in customer data based on lookup)
    function populateLookupFields(formContext) {
        var customer = formContext.getAttribute("parentcustomerid").getValue(); // Contact entity: parentcustomerid

        if (customer != null) {
            var customerId = customer[0].id.replace("{", "").replace("}", "");
            fetchRelatedData(formContext, "account", customerId, ["address1_line1", "address1_city"]); // Fetch related data from Account entity
        }
    }

    // Fetch related data using Web API and populate form fields
    function fetchRelatedData(formContext, entityName, recordId, fields) {
        var fieldString = fields.join(",");
        Xrm.WebApi.retrieveRecord(entityName, recordId, `?$select=${fieldString}`).then(
            function success(result) {
                fields.forEach(function (field) {
                    if (result[field]) {
                        formContext.getAttribute(field).setValue(result[field]);
                    }
                });
            },
            function (error) {
                console.error("Error fetching related data:", error.message);
            }
        );
    }

    // Check if the user has a specific security role
    function checkUserRole(roleName) {
        var roles = Xrm.Utility.getGlobalContext().userSettings.roles.getAll();
        var hasRole = false;

        roles.forEach(function (role) {
            if (role.name === roleName) {
                hasRole = true;
            }
        });

        return hasRole;
    }

    // Enable/Disable fields based on user's security role
    function enableDisableFieldsBasedOnRole(formContext) {
        var isManager = checkUserRole("Manager"); // Checking if user has 'Manager' role

        if (isManager) {
            // Enable special controls for managers (Example fields from Loan entity)
            formContext.getControl("managerapproval").setDisabled(false); // Loan entity: managerapproval
            formContext.getControl("specialdiscount").setDisabled(false); // Loan entity: specialdiscount
        } else {
            // Disable fields for non-managers
            formContext.getControl("managerapproval").setDisabled(true); // Loan entity: managerapproval
            formContext.getControl("specialdiscount").setDisabled(true); // Loan entity: specialdiscount
        }
    }

})();
