function filterPriceList(executionContext) {
    var formContext = executionContext.getFormContext();
    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");

    // Fetch the Business Unit of the logged-in user
    Xrm.WebApi.retrieveRecord("systemuser", userId, "?$select=_businessunitid_value").then(function (userResult) {
        var businessUnitId = userResult["_businessunitid_value"];
        
        if (businessUnitId) {
            // Fetch Price Lists where Company field matches the Business Unit
            var fetchXml = [
                "<fetch>",
                "  <entity name='pricelevel'>",
                "    <attribute name='pricelevelid' />",
                "    <attribute name='name' />",
                "    <filter>",
                "      <condition attribute='company' operator='eq' value='" + businessUnitId + "' />",
                "    </filter>",
                "  </entity>",
                "</fetch>"
            ].join("");

            var fetchXmlEncoded = "?fetchXml=" + encodeURIComponent(fetchXml);

            Xrm.WebApi.retrieveMultipleRecords("pricelevel", fetchXmlEncoded).then(function (priceListResult) {
                if (priceListResult.entities.length > 0) {
                    var lookupValues = [];
                    priceListResult.entities.forEach(function (priceList) {
                        lookupValues.push({
                            entityType: "pricelevel",
                            id: priceList.pricelevelid,
                            name: priceList.name
                        });
                    });

                    // Apply filter to Price List lookup
                    formContext.getControl("pricelevelid").addPreSearch(function () {
                        formContext.getControl("pricelevelid").addCustomFilter(fetchXml, "pricelevel");
                    });
                }
            }, function (error) {
                console.log("Error fetching Price Lists: " + error.message);
            });
        }
    }, function (error) {
        console.log("Error fetching Business Unit: " + error.message);
    });
}
