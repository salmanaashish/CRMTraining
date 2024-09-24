function checkAccountBalance(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the value of the balance field
    var accountBalance = formContext.getAttribute("cr36c_balance").getValue();

    // Threshold for overdraft
    var overdraftThreshold = 2;

    // Check if the balance is below the threshold (i.e., overdraft)
    if (accountBalance < overdraftThreshold) {
        formContext.ui.setFormNotification("Warning: Account is in overdraft!", "ERROR", "overdraftWarning");
    } else {
        formContext.ui.clearFormNotification("overdraftWarning");
    }
}
