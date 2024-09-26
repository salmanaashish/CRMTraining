var OpportunityEntity = (function () {

    return {
        onLoad: onLoad,
        calculateTotalValue: calculateTotalValue,
        fetchRelatedLineItems: fetchRelatedLineItems
    };

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        fetchRelatedLineItems(formContext);
    }

    // Fetch related opportunity products and calculate the total
    function fetchRelatedLineItems(formContext) {
        var opportunityId = formContext.data.entity.getId().replace("{", "").replace("}", "");

        Xrm.WebApi.retrieveMultipleRecords("opportunityproduct", `?$filter=opportunityid eq ${opportunityId}`).then(
            function success(result) {
                var totalValue = 0;
                result.entities.forEach(function (lineItem) {
                    totalValue += lineItem.priceperunit * lineItem.quantity;
                });

                // Set total value to the field
                formContext.getAttribute("totalvalue").setValue(totalValue);
                formContext.getAttribute("totalvalue").setSubmitMode("always");
            },
            function (error) {
                console.log("Error fetching opportunity line items: " + error.message);
            }
        );
    }

})();
