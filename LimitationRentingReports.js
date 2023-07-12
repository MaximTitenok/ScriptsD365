function IsLimitRentingReports(context) {
	
	var formContext = Xrm.Page;
	var statusFieldControl = formContext.getControl("statuscode");
	if(formContext.getAttribute("statuscode").getValue() == 754300002)
	{
		var customer = formContext.getAttribute("cds_customer").getValue();
		if(customer == null || customer == "")
		{
			formContext.getControl("cds_customer").setNotification("Add the customer!", "ADDCUSTOMER");
		}
		else
		{
			formContext.getControl("cds_customer").clearNotification("ADDCUSTOMER");
			var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
					   "<entity name='cds_rent'>" +
					   "<filter type='and'>" +
					   "<condition attribute='statuscode' operator='eq' value='754300002' />" +
					   "<condition attribute='cds_customer' operator='eq' value='"+customer[0].id+"' />" +
					   "</filter>" +
					   "</entity>" +
					   "</fetch>";
			Xrm.WebApi.online.retrieveMultipleRecords("cds_rent", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
			  function success(result) {
				var recordCount = result.entities.length;

				if(recordCount > 10)
				{
					statusFieldControl.setNotification("Rents with statuscode=Renting more than 10 for this customer!", "RENTLIM");
					//context.getEventArgs().preventDefault();
				}
				else
				{
					statusFieldControl.clearNotification("RENTLIM");
				}
			  },
			  function(error) {
				console.error(error.message);
			  }
			);
		}
	}
	else
	{
		statusFieldControl.clearNotification("RENTLIM");
	}
}