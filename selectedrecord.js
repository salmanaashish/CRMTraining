function deleteSelectedRecordsFromRibbon(selectedIds) {
    if (!selectedIds || selectedIds.length === 0) {
        alert("Please select at least one record.");
        return;
    }

    // Loop through selected records
    selectedIds.forEach(function (id) {
        var cleanId = id.replace("{", "").replace("}", "");
        
        // Replace 'contact' with your target entity logical name
        Xrm.WebApi.deleteRecord("contact", cleanId).then(
            function success(result) {
                console.log("Deleted record: " + cleanId);
                // Optionally refresh the subgrid if needed
                Xrm.Page.getControl("contacts").refresh(); // Replace with your subgrid name
            },
            function error(error) {
                console.error("Error deleting: " + error.message);
                alert("Error deleting record: " + error.message);
            }
        );
    });
}
