using System;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

public class LeadPlugin : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
        IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
        IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
        IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

        if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
        {
            Entity lead = (Entity)context.InputParameters["Target"];
            try
            {
                // Retrieve Lead details
                Guid leadId = lead.Id;
                ColumnSet leadColumns = new ColumnSet("ownerid", "parentaccountid", "parentcontactid", "syn_country", "syn_state", "jobtitle");
                Entity leadDetails = service.Retrieve("lead", leadId, leadColumns);

                // Retrieve Account details
                if (leadDetails.Contains("parentaccountid"))
                {
                    EntityReference accountRef = (EntityReference)leadDetails["parentaccountid"];
                    ColumnSet accountColumns = new ColumnSet("address1_city", "address1_line1", "address1_line2", "address1_postalcode", "telephone1");
                    Entity accountDetails = service.Retrieve("account", accountRef.Id, accountColumns);
                }

                // Retrieve Contact details
                if (leadDetails.Contains("parentcontactid"))
                {
                    EntityReference contactRef = (EntityReference)leadDetails["parentcontactid"];
                    ColumnSet contactColumns = new ColumnSet("fullname", "emailaddress1", "telephone1");
                    Entity contactDetails = service.Retrieve("contact", contactRef.Id, contactColumns);
                }

                // Fetch system user details based on owner
                if (leadDetails.Contains("ownerid"))
                {
                    EntityReference ownerRef = (EntityReference)leadDetails["ownerid"];
                    string fetchXml = $@"
                    <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name='systemuser'>
                        <attribute name='fullname' />
                        <attribute name='businessunitid' />
                        <attribute name='title' />
                        <attribute name='address1_telephone1' />
                        <attribute name='positionid' />
                        <attribute name='systemuserid' />
                        <order attribute='fullname' descending='false' />
                        <filter type='and'>
                          <condition attribute='systemuserid' operator='eq' value='{ownerRef.Id}' />
                        </filter>
                        <link-entity name='businessunit' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>
                          <filter type='and'>
                            <condition attribute='businessunitid' operator='eq' value='69E95289-E010-EE15-8F6D-002248244F45' />
                          </filter>
                        </link-entity>
                      </entity>
                    </fetch>";

                    EntityCollection systemUsers = service.RetrieveMultiple(new FetchExpression(fetchXml));
                    if (systemUsers.Entities.Count > 0)
                    {
                        Entity systemUser = systemUsers.Entities[0];
                        // Update contact with system user details (Example: updating job title)
                        if (leadDetails.Contains("parentcontactid"))
                        {
                            EntityReference contactRef = (EntityReference)leadDetails["parentcontactid"];
                            Entity updateContact = new Entity("contact", contactRef.Id);
                            updateContact["jobtitle"] = systemUser.Contains("title") ? systemUser["title"] : "Unknown";
                            service.Update(updateContact);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                tracingService.Trace("Lead Plugin Error: {0}", ex.ToString());
                throw new InvalidPluginExecutionException("An error occurred in Lead Plugin", ex);
            }
        }
    }
}
