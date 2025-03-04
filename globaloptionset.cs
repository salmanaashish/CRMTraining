using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using System.Collections.Generic;

public void GetOptionSetForSpecificLead(IOrganizationService service, Guid leadId, string leadAttributeName)
{
    try
    {
        // Step 1: Retrieve OptionSet Metadata
        RetrieveAttributeRequest request = new RetrieveAttributeRequest
        {
            EntityLogicalName = "lead",
            LogicalName = leadAttributeName,
            RetrieveAsIfPublished = true
        };

        RetrieveAttributeResponse response = (RetrieveAttributeResponse)service.Execute(request);

        if (response.AttributeMetadata is EnumAttributeMetadata optionSetMetadata)
        {
            Console.WriteLine($"Attribute: {optionSetMetadata.DisplayName.UserLocalizedLabel.Label}");

            // Store OptionSet values
            var optionSetValues = new Dictionary<int, string>();
            foreach (OptionMetadata option in optionSetMetadata.OptionSet.Options)
            {
                int value = option.Value ?? 0;
                string label = option.Label.UserLocalizedLabel?.Label ?? "Unknown";
                optionSetValues[value] = label;
            }

            // Step 2: Retrieve Specific Lead Record
            Entity lead = service.Retrieve("lead", leadId, new ColumnSet(leadAttributeName));

            if (lead.Contains(leadAttributeName))
            {
                int selectedValue = ((OptionSetValue)lead[leadAttributeName]).Value;
                string selectedLabel = optionSetValues.ContainsKey(selectedValue) ? optionSetValues[selectedValue] : "Unknown";

                Console.WriteLine($"Lead ID: {lead.Id}");
                Console.WriteLine($"Selected OptionSet Value: {selectedValue}");
                Console.WriteLine($"Label: {selectedLabel}");
            }
            else
            {
                Console.WriteLine("The Lead record does not contain a value for this OptionSet field.");
            }
        }
        else
        {
            Console.WriteLine("The specified attribute is not an OptionSet.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error: " + ex.Message);
    }
}
