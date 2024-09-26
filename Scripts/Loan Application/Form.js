var LoanApplication = (function () {

    return {
        onLoad: onLoad,
        validateLoanAmount: validateLoanAmount,
        onCustomerChange: onCustomerChange,
        fetchCustomerData: fetchCustomerData
    };

    // Function triggered when form loads
    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        formContext.getAttribute("loanamount").addOnChange(validateLoanAmount);
        formContext.getAttribute("customerid").addOnChange(onCustomerChange);
    }

    // Function to validate loan amount
    function validateLoanAmount(executionContext) {
        var formContext = executionContext.getFormContext();
        var loanAmount = formContext.getAttribute("loanamount").getValue();
        var customerIncome = formContext.getAttribute("customerincome").getValue();

        if (loanAmount > (customerIncome * 0.5)) {  // Check if loan is greater than 50% of the income
            formContext.getControl("loanamount").setNotification("Loan amount exceeds 50% of the customer's income.", "loanValidation");
        } else {
            formContext.getControl("loanamount").clearNotification("loanValidation");
        }
    }

    // Function triggered when customer lookup field changes
    function onCustomerChange(executionContext) {
        var formContext = executionContext.getFormContext();
        var customer = formContext.getAttribute("customerid").getValue();

        if (customer != null) {
            var customerId = customer[0].id.replace("{", "").replace("}", "");
            fetchCustomerData(formContext, customerId);
        }
    }

    // Fetch customer income and credit score using Web API
    function fetchCustomerData(formContext, customerId) {
        Xrm.WebApi.retrieveRecord("contact", customerId, "?$select=income,creditscore").then(
            function success(result) {
                var income = result.income;
                var creditScore = result.creditscore;

                formContext.getAttribute("customerincome").setValue(income);
                formContext.getAttribute("creditscore").setValue(creditScore);
            },
            function (error) {
                console.log("Error retrieving customer data: " + error.message);
            }
        );
    }

})();