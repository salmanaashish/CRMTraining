function OnLoadAccount(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Sample code for On Load Event
        var parentaccount = formContext.getAttribute("parentaccountid").getValue();
        if (parentaccount!=null)
        var lookupId = formContext.getAttribute("parentaccountid").getValue()[0].id;
        var lookupName = formContext.getAttribute("parentaccountid").getValue()[0].name;
        var entityName = formContext.getAttribute("parentaccountid").getValue()[0].entityType;
        console.log("Accountid" + lookupId);
        console.log("Accountname" + lookupName);
        console.log("entityName" + entityName);
        var userGuid = formContext.context.getUserId();
        console.log("userid" + userGuid);
        var userRoles = formContext.context.getUserRoles();
        console.log("userrolee" + userRoles);
        var clientUrl = formContext.context.getClientUrl();
        console.log("clientUrl" + clientUrl);
        var userName = formContext.context.userSettings.userName;
        console.log("userName" + userName);
        var customertypecode = formContext.getAttribute("customertypecode").getValue();
        var customertypecodename = formContext.getAttribute("customertypecode").getText();
        console.log("customertypecode" + customertypecode);
        console.log("customertypecodename" + customertypecodename);

        //Xrm.Utility.alertDialog("This is an alert for On Load Event.");
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}