function validateLoanApplication(executionContext) {
    var formContext = executionContext.getFormContext();
    
    // Get the values of the fields
    var creditScore = formContext.getAttribute("cr36c_creditscore").getValue();
    var incomeDetails = formContext.getAttribute("cr36c_incomedetails").getValue();

    // Validate if the fields are filled
    if (!creditScore || !incomeDetails) {
        formContext.ui.setFormNotification("Please provide the credit score and income details.", "ERROR", "loanValidation");
        executionContext.getEventArgs().preventDefault(); // Prevent form submission
    } else {
        formContext.ui.clearFormNotification("loanValidation");
    }
}
