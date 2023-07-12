
function UpdateCarReport() {
	var formContext = Xrm.Page;
	var lookupField = formContext.getAttribute("cds_rent");
	var type = formContext.getAttribute("cds_type").getValue();
	var isDamage = formContext.getAttribute("cds_damages").getValue();
	var damageDescription = formContext.getAttribute("cds_damagedescription").getValue();
	

	if(isDamage == true && lookupField != null && damageDescription != null 
	   && damageDescription != "")
	{
		var lookupValue = lookupField.getValue();
		var entityId = lookupValue[0].id;
		var rentEntity = {};
		if(type == false)//pickup
		{
		   rentEntity["cds_pickupreport"] = damageDescription;
		}
		else if(type == true)//return
		{
			rentEntity["cds_returnreport"] = damageDescription;
		}

		Xrm.WebApi.updateRecord("cds_rent", entityId, rentEntity).then(
			function success(result) {
			},
			function error(error) {
				console.error("Error: ", error.message);
			}
		);
	}
}
