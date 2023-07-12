
function getCarPrice() {
	var formContext = Xrm.Page;
	var carClassLookup = formContext.getAttribute("cds_carclass").getValue();
	var carPrice = 0;
	if (carClassLookup) {
		var carClassId = carClassLookup[0].id;
		var carClassEntity = {};

		Xrm.WebApi.retrieveRecord("cds_carsclass", carClassId, "?$select=cds_price").then(
			function success(result) {
				carClassEntity = result;
				carPrice = carClassEntity.cds_price;

				var pickupValue = formContext.getAttribute("cds_reservedpickup").getValue();
				var returnValue = formContext.getAttribute("cds_reservedhandover").getValue();
				var pickupDate = new Date(pickupValue);
				var returnDate = new Date(returnValue);
				
				var returnLocation = formContext.getAttribute("cds_returnlocation").getValue();
				var pickupLocation = formContext.getAttribute("cds_pickuplocation").getValue(); 
				
				var diffInMilliseconds = returnDate - pickupDate;
				var diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
				
				if(carPrice == null || carPrice == "")
				{
					carPrice = 0;
				}
				diffInDays = diffInDays < 0 ? 0 : diffInDays;
				carPrice = diffInDays > 0 ? carPrice*diffInDays : carPrice;

				if(returnLocation != 754300002 && returnLocation != null && returnLocation != "")//office
				{
					carPrice+=100;
				}
				if(pickupLocation != 754300002 && pickupLocation != null && pickupLocation != "")//office
				{
					carPrice+=100;
				}
				formContext.getAttribute("cds_price").setValue(carPrice);
			},
			function (error) {
				console.log(error.message);
			}
		);
	}

	
}
