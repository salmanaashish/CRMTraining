using System;
using System.Linq;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

public class PreventDuplicateCaseBySubject : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        // Obtain the execution context
        IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

        // Ensure the plugin is triggered on Create operation
        if (context.MessageName.ToLower() != "create" || !context.InputParameters.Contains("Target"))
            return;

        Entity caseEntity = context.InputParameters["Target"] as Entity;
        if (caseEntity == null || !caseEntity.Contains("title")) // Subject field in CRM
            return;

        string caseSubject = caseEntity.GetAttributeValue<string>("title");
        
        if (string.IsNullOrWhiteSpace(caseSubject))
            return; // Ignore if no subject provided

        // Get the organization service
        IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
        IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

        // Query to check if any existing Case has the same Subject
        QueryExpression query = new QueryExpression("incident")
        {
            ColumnSet = new ColumnSet("incidentid"),
            Criteria = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression("title", ConditionOperator.Equal, caseSubject)
                }
            }
        };

        EntityCollection existingCases = service.RetrieveMultiple(query);

        // If at least one case with the same subject exists, throw an exception
        if (existingCases.Entities.Count > 0)
        {
            throw new InvalidPluginExecutionException("A case with the same subject already exists. Duplicate cases are not allowed.");
        }
    }
}
