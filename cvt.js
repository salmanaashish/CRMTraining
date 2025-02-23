1. Create mdf.common.js
This file will contain:

A retrieveRecord function for fetching records dynamically.
A setFieldRequirement function for setting required fields dynamically.
javascript
Copy
Edit
var mdf = mdf || {};

mdf.Common = (function () {
    "use strict";

    function retrieveRecord(entityName, filter, select, successCallback, errorCallback) {
        var query = `/api/data/v9.0/${entityName}?$filter=${filter}&$select=${select}`;

        Xrm.WebApi.retrieveMultipleRecords(entityName, query)
            .then(function (result) {
                if (result.entities.length > 0) {
                    successCallback(result.entities[0]);
                } else {
                    successCallback(null); // No record found
                }
            })
            .catch(function (error) {
                console.error("Error retrieving record:", error.message);
                if (errorCallback) errorCallback(error);
            });
    }

    function setFieldRequirement(formContext, fieldName, isRequired) {
        var control = formContext.getControl(fieldName);
        if (control) {
            control.setRequiredLevel(isRequired ? "required" : "none");
        }
    }

    return {
        retrieveRecord: retrieveRecord,
        setFieldRequirement: setFieldRequirement
    };
})();
2. Update mdf.CaseForm.js
This file will now call the functions from mdf.Common.js to retrieve records and set field requirements dynamically.

javascript
Copy
Edit
var mdf = mdf || {};

mdf.CaseForm = (function () {
    "use strict";

    var formContext;

    function onLoad(executionContext) {
        formContext = executionContext.getFormContext();
        formContext.getAttribute("subject").addOnChange(onChange);
    }

    function onSave(executionContext) {
        formContext = executionContext.getFormContext();
    }

    function onChange(executionContext) {
        formContext = executionContext.getFormContext();
        var subjectValue = formContext.getAttribute("subject").getValue();

        if (!subjectValue) {
            return;
        }

        // Retrieve entity configuration dynamically
        var entityName = "entityconfiguration";
        var filter = `subjectname eq '${subjectValue}'`;
        var select = "entityname,createformid,driverrequired,orderrequired,vehiclerequired";

        mdf.Common.retrieveRecord(entityName, filter, select, function (entityConfig) {
            if (entityConfig) {
                var driverRequired = entityConfig.driverrequired;
                var orderRequired = entityConfig.orderrequired;
                var vehicleRequired = entityConfig.vehiclerequired;

                var isRequired = driverRequired || orderRequired || vehicleRequired;
                formContext.getAttribute("isRequirementMet").setValue(isRequired ? "true" : "false");

                // Set required fields dynamically
                mdf.Common.setFieldRequirement(formContext, "driver", driverRequired);
                mdf.Common.setFieldRequirement(formContext, "order", orderRequired);
                mdf.Common.setFieldRequirement(formContext, "vehicle", vehicleRequired);
            }
        });
    }

    return {
        onLoad: onLoad,
        onSave: onSave,
        onChange: onChange
    };
})();
