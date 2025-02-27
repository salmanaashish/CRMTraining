public class UpdateChildOpportunitiesAsync : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
        IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
        IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

        if (context.MessageName.ToLower() != "update" || !context.InputParameters.Contains("Target"))
            return;

        Entity entity = (Entity)context.InputParameters["Target"];
        if (!entity.Contains("statuscode"))
            return;

        OptionSetValue newStatus = entity.GetAttributeValue<OptionSetValue>("statuscode");
        if (newStatus == null || newStatus.Value != 3) // 3 = Closed as Won
            return;

        Guid parentOpportunityId = entity.Id;

        // Introduce a slight delay (simulate async execution)
        System.Threading.Tasks.Task.Delay(TimeSpan.FromMinutes(1)).Wait();

        QueryExpression query = new QueryExpression("opportunity")
        {
            ColumnSet = new ColumnSet("estimatedvalue"),
            Criteria = { Conditions = { new ConditionExpression("parentopportunityid", ConditionOperator.Equal, parentOpportunityId) } }
        };

        EntityCollection childOpportunities = service.RetrieveMultiple(query);

        foreach (Entity childOpportunity in childOpportunities.Entities)
        {
            decimal? previousEstimatedRevenue = childOpportunity.Contains("estimatedvalue")
                ? childOpportunity.GetAttributeValue<Money>("estimatedvalue")?.Value
                : (decimal?)null;

            if (previousEstimatedRevenue.HasValue)
            {
                childOpportunity["estimatedvalue"] = new Money(previousEstimatedRevenue.Value + 1);
            }

            service.Update(childOpportunity);

            SetStateRequest setStateRequest = new SetStateRequest()
            {
                EntityMoniker = new EntityReference("opportunity", childOpportunity.Id),
                State = new OptionSetValue(1), // Inactive
                Status = new OptionSetValue(6)  // Canceled
            };

            service.Execute(setStateRequest);
        }
    }
}
