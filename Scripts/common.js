//Execute all On Load events here

function OnLoad(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Sample code for On Load Event
        Xrm.Utility.alertDialog("This is an alert for On Load Event.");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}

//Execute all OnSave events here

function OnSave(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Sample code for On Save Event
        Xrm.Utility.alertDialog("This is an alert for On Save Event.");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Execute Field on Change events here, This could be specific to each field

function OnChange(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Sample code for On Change Event
        Xrm.Utility.alertDialog("This is an alert for On Change Event.");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get Lookup ID

function GetLookupId(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get lookup ID here, Give lookup field logical name here
        var lookupId = formContext.getAttribute("new_organizationid").getValue()[0].id;
        Xrm.Utility.alertDialog(lookupId);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get Lookup Name

function GetLookupName(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get lookup name here, Give lookup field logical name here
        var lookupName = formContext.getAttribute("new_organizationid").getValue()[0].name;
        Xrm.Utility.alertDialog(lookupName);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Entity Logical Name

function GetEntityLogicalName(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get entity logical name here, Give lookup field logical name here
        var entityName = formContext.getAttribute("new_organizationid").getValue()[0].entityType;
        Xrm.Utility.alertDialog(entityName);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the text value from Filed

function GetTextValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get text value of the field here, Give field logical name here
        var textValue = formContext.getAttribute("new_employeebusinessid").getValue();
        Xrm.Utility.alertDialog(textValue);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Data base value from Option Set Field

function GetOptionSetDataBaseValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get data base value of the option set field here, Give field logical name here
        var databaseValue = formContext.getAttribute("new_gender").getValue();
        Xrm.Utility.alertDialog(databaseValue);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Option Set text value

function GetOptionSetTextValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get text value of the option set field here, Give field logical name here
        var optionSetTextValue = formContext.getAttribute("new_gender").getText();
        Xrm.Utility.alertDialog(optionSetTextValue);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Data base value from Two Option Set Field

function GetTwoOptionSetDataBaseValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the value of the two option set field here, Give field logical name here
        var databaseValue = formContext.getAttribute("new_type").getValue();
        Xrm.Utility.alertDialog(databaseValue);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Date Field Value

function GetDateFieldValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Getvalue of the field here, Give field logical name here
        var dateOfBirth = formContext.getAttribute("new_dateofbirth").getValue();
        Xrm.Utility.alertDialog(dateOfBirth);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Date, Month, Year from Date Field Value

function GetDateFieldValues(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get value of the field here, Give field logical name here
        var dateOfBirth = formContext.getAttribute("new_dateofbirth").getValue(); //22-12-2022
        //Get Year
        Xrm.Utility.alertDialog(dateOfBirth.getFullYear());
        //Get Month
        Xrm.Utility.alertDialog(dateOfBirth.getMonth());
        //Get Date(Day)
        Xrm.Utility.alertDialog(dateOfBirth.getDate());
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set the text value to Text Field

function SetTextFieldValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Set the field value here
        formContext.getAttribute("new_employeebusinessid").setValue("abcd");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set the Data base value to Option Set Field

function SetOptionSetDataBaseValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Set the field value here
        formContext.getAttribute("new_gender").setValue(123456);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set the Data base value to Two Option Set Field

function SetTwoOptionSetDataBaseValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Set the field value here - true
        formContext.getAttribute("new_type").setValue(true);
        //Set the field value here - false
        formContext.getAttribute("new_type").setValue(false);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set the Date Field Value

function SetDateFieldValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the current Date
        var dateOfBirth = new Date();
        //Set the Current Date to date field
        formContext.getAttribute("new_dateofbirth").setValue(dateOfBirth);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set the Lookup Field Value

function SetLookUpFieldValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var lookupValue = new Array();
        var lookupValue[0]= new Object();
        lookupValue[0].id = "919F28C4-F9BB-E911-A977-000D3AF04F8C";//Guid of the Record to be set
        lookupValue[0].name = "Tata Consultancy Services"; //Name of the record to be set
        lookupValue[0].entityType = "new_organization" //Entity Logical Name
        formContext.getAttribute("new_organizationid").setValue(lookupValue);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set the Field Requirement Level

function SetTheFieldRequirementLevel(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Set as Business Required
        formContext.getAttribute("new_dateofbirth").setRequiredLevel("required");
        //Set as Buiness Recommended
        formContext.getAttribute("new_dateofbirth").setRequiredLevel("recommended");
        //Set as Optional
        formContext.getAttribute("new_dateofbirth").setRequiredLevel("none");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Enable or Disable Field (Lock/Unlock)

function SetTheFieldState(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Set field as Read only
        formContext.getAttribute("new_dateofbirth").setDisabled(true);
        //Set field as Editable
        formContext.getAttribute("new_dateofbirth").setDisabled(false);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Apply Lookup Filter

function ApplyLookUpFilter(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the custom filter
        var filter = "";
        //Get the lookup field
        var lookupField = formContext.getAttribute("new_organizationid");

        //Apply custom Filter for lookup
        lookupField.addPreSearch(function () {
            lookupField.addCustomFilter(filter);
        });
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Show Hide Fields

function ShowHideFields(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Show Field
        formContext.getAttribute("new_dateofbirth").setVisible(true);
        //Hide Field
        formContext.getAttribute("new_dateofbirth").setVisible(false);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Show or Hide Navigation Items

function ShowHideNavigationItems(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Show Organizations
        formContext.ui.navigation.items.get("organizations").setVisible(true);
        //Hide Organizations
        formContext.ui.navigation.items.get("organizations").setVisible(false);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Set Form Notification

function SetFormNotification(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Set Form Notification
        formContext.ui.setFormNotification("This is a MS DYNAMICS CRM Form Notification", "INFO", "1");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Clear Form Notification

function ClearFormNotification(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Clear Form Notification
        formContext.ui.clearFormNotification("1");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Show Progress Indicator

function ShowProgressIndicator() {
    try {
        Xrm.Utility.showProgressIndicator("The Page is Loading... Please wait...");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Clear Progress Indicator

function ClearProgressIndicator() {
    try {
        Xrm.Utility.closeProgressIndicator();
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Show Hide Tabs based on field values

function ShowHideTabs(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var isProcessed = formContext.getAttribute("progres_isprocessed").getValue(); //Two Option set field
        var generalTab = formContext.ui.tabs.get("GENERAL"); //Get Tab
        if (isProcessed === false) {
            generalTab.setVisible(false); //Hide Tab
        } else {
            generalTab.setVisible(true); //Show Tab
        }
        formContext.ui.tabs.get("CASH_PLAN_FLOW_DETAILS").setDisplayState("collapsed"); //Collapse Tab
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Show Hide Sections based on field values

function ShowHideSections(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var isProcessed = formContext.getAttribute("progres_isprocessed").getValue(); //Two Option set field
        var generalTab = formContext.ui.tabs.get("GENERAL"); //Get Tab
        var asstPackages = generalTab.sections.get("ASSISTANCE_PACKAGES"); //Get sections
        var payments = generalTab.sections.get("PAYMENT_RECORDS"); //Get sections
        if (isProcessed === false) {
            asstPackages.setVisible(true); //Show Section
            payments.setVisible(false); //Hide Section
        } else {
            asstPackages.setVisible(false); //Show Section
            payments.setVisible(true); //Show Section
        }
        formContext.ui.tabs.get("CASH_PLAN_FLOW_DETAILS").setDisplayState("collapsed"); //Collapse Tab
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Save Form

function SaveForm(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Save Form
        formContext.data.entity.save();
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Save Form and Close Record

function SaveFormAndClose(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Save Form and Close
        formContext.data.entity.save("saveandclose");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Save Form and Open Create Form

function SaveFormAndOpenCreateForm(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Save Form and Close
        formContext.data.entity.save("saveandnew");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Close Form

function CloseForm(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Close Form
        formContext.ui.close();
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Save the data on Read Only Field

function ForceSaveDataOnReadOnlyField(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Save forcefully
        formContext.getAttribute("new_employeetype").setSubmitMode("always");
        //Save forcefully
        formContext.getAttribute("new_employeetype").setSubmitMode("never");
        //Save forcefully
        formContext.getAttribute("new_employeetype").setSubmitMode("dirty");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get Dirty Fields from Form

function GetFormDirtyFields(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var attributes = formContext.data.entity.attributes.get()
        for (var i in attributes) {
            var attribute = attributes[i];
            if (attribute.getIsDirty()) {
                Xrm.Utility.alertDialog("Attribute dirty: " + attribute.getName());
            }
        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get Form Type

function GetFormType(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get Form Type
        var formType = formContext.ui.getFormType();
        Xrm.Utility.alertDialog(formType);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get GUID of the Current Record

function GetGuidOfTheRecord(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the current Record Guid
        var recordGuid = formContext.data.entity.getId();
        Xrm.Utility.alertDialog(recordGuid);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get GUID of the Current User

function GetGuidOfTheRecord(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the Current User Guid
        var userGuid = formContext.context.getUserId();
        Xrm.Utility.alertDialog(userGuid);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Security Roles of Current User

function GetSecurityRolesOfCurrentUser(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the Current User Guid
        var userRoles = formContext.context.getUserRoles();
        Xrm.Utility.alertDialog(userRoles);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the CRM Clinet Url

function GetTheCRMClientUrl(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the Client Url
        var clientUrl = formContext.context.getClientUrl();
        Xrm.Utility.alertDialog(clientUrl);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the User Language ID

function GetTheUserLanguageID(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the Current User Language ID
        var userLanguage = formContext.context.getUserLcid();
        Xrm.Utility.alertDialog(userLanguage);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Get the Current User Name

function GetTheCurrentUserName(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Get the Current User Name
        var userName = formContext.context.userSettings.userName;
        Xrm.Utility.alertDialog(userName);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Create Record using Xrm.WebApi

function CreateRecord() {
    try {
        var entityName = "new_organization"; //Entity Logical Name
        //Data used to Create record
        var data = {
            "new_organizationname": "Tata Consultancy Services",
            "new_description": "This is the description of Tata Consultancy Services",
            "new_noofemployees": 400000,
            "new_revenue": 20000000
        }
        Xrm.WebApi.createRecord(entityName, data).then(
            function success(result) {
                Xrm.Utility.alertDialog("Success");
            },
            function (error) {
                Xrm.Utility.alertDialog("Error");
            }
        );
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Update Record using Xrm.WebApi

function UpdateRecord() {
    try {
        var entityName = "new_organization"; //Entity Logical Name
        var recordId = "919F28C4-F9BB-E911-A977-000D3AF04F8C"; //Guid of the Record
        //Data used to Create record
        var data = {
            "new_organizationname": "Tata Consultancy Services",
            "new_description": "This is the description of Tata Consultancy Services",
            "new_noofemployees": 450000,
            "new_revenue": 30000000
        }
        Xrm.WebApi.updateRecord(entityName, recordId, data).then(
            function success(result) {
                Xrm.Utility.alertDialog("Success");
            },
            function (error) {
                Xrm.Utility.alertDialog("Error");
            }
        );
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Delete Record using Xrm.WebApi

function DeleteRecord() {
    try {
        var entityName = "new_organization"; //Entity Logical Name
        var recordId = "919F28C4-F9BB-E911-A977-000D3AF04F8C"; //Guid of the Record
        Xrm.WebApi.deleteRecord(entityName, recordId).then(
            function success(result) {
                Xrm.Utility.alertDialog("Success");
            },
            function (error) {
                Xrm.Utility.alertDialog("Error");
            }
        );
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Retrieve Record using Xrm.WebApi

function RetrieveRecord() {
    try {
        var entityName = "new_organization"; //Entity Logical Name
        var recordId = "919F28C4-F9BB-E911-A977-000D3AF04F8C"; //Guid of the Record
        var columnsToRetrieve = "$select=new_organizationname, new_noofemployees, new_revenue"; //Columns to Retrieve
        Xrm.WebApi.retrieveRecord(entityName, recordId, columnsToRetrieve).then(
            function success(result) {
                Xrm.Utility.alertDialog("Success");
            },
            function (error) {
                Xrm.Utility.alertDialog("Error");
            }
        );
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Retrieve Multiple Record using Xrm.WebApi

function RetrieveMultipleRecords() {
    try {
        var entityName = "new_organization"; //Entity Logical Name
        var query = "?$select=new_organizationname, new_noofemployees, new_revenue&$top=3"; //Columns to Retrieve
        Xrm.WebApi.retrieveMultipleRecords(entityName, query).then(
            function success(result) {
                Xrm.Utility.alertDialog("Success");
            },
            function (error) {
                Xrm.Utility.alertDialog("Error");
            }
        );
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Call Asynchronous Action

function CallAsynchronousAction(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var webApiVersionNumber = "v9.1";
        var serverURL = formContext.context.getClientUrl() + "/api/data/" + webApiVersionNumber + "/";;
        var actionName = "new_customaction"; //Action name
        var data = {}; //Action Parameters
        if (typeof (data) === "undefined") {
            data = {};
        }
        var oDataEndPoint = serverURL + actionName;
        var req = new XMLHttpRequest();
        req.open("POST", oDataEndPoint, true); //Action will be invoked Asynchronously
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204 || this.status === 200) {
                    if (this.statusText === "No Content" || this.statusText === "") // In case of 204
                        var response = req.response;
                    else {
                        var response = JSON.parse(req.response);
                    }
                } else {
                    var error = JSON.parse(req.response).error;
                    Xrm.Utility.alertDialog(error.message);
                }
            }
        };
        req.send(JSON.stringify(data));
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Call Synchronous Action

function CallSynchronousAction(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var webApiVersionNumber = "v9.1";
        var serverURL = formContext.context.getClientUrl() + "/api/data/" + webApiVersionNumber + "/";;
        var actionName = "new_customaction"; //Action name
        var data = {}; //Action Parameters
        if (typeof (data) === "undefined") {
            data = {};
        }
        var oDataEndPoint = serverURL + actionName;
        var req = new XMLHttpRequest();
        req.open("POST", oDataEndPoint, false); //Action will be invoked synchronously
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204 || this.status === 200) {
                    if (this.statusText === "No Content" || this.statusText === "") // In case of 204
                        var response = req.response;
                    else {
                        var response = JSON.parse(req.response);
                    }
                } else {
                    var error = JSON.parse(req.response).error;
                    Xrm.Utility.alertDialog(error.message);
                }
            }
        };
        req.send(JSON.stringify(data));
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//Associate request using Web Api

function AssociateRequest(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var serverURL = formContext.context.getClientUrl();
        var currentEntityPlurarName = "fieldsecurityprofiles";
        var currentEntityId = "4E7C654C-7150-E711-811F-C4346BACBA84";//Get Field Security Profile id
        var relationShipName = "systemuserprofiles_association";
        var otherEntityPlurarName = "systemusers";
        var otherEntityId = "2F5FC0F6-F247-E811-810F-C4346BDCF131"; //Get System User id
        var associate = {}
        associate["@odata.id"] = serverURL + "/api/data/v9.1/" + otherEntityPlurarName + "(" + otherEntityId + ")";
        var req = new XMLHttpRequest();
        req.open("POST", serverURL + "/api/data/v9.1/" + currentEntityPlurarName + "(" + currentEntityId + ")/" + relationShipName + "/$ref", false);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204) {
                    //Success
                } else {
                    var error = JSON.parse(this.response).error;
                    Xrm.Utility.alertDialog(error.message);
                }
            }
        };
        req.send(JSON.stringify(associate));
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}