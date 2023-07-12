function ChangeStatusCode() {
	var options = [
		[0,754300000,"Created"],
		[1,754300001,"Confirmed"],
		[2,754300002,"Renting"],
		[3,754300003,"Returned"],
		[4,754300004,"Canceled"]
	]
	var optionSetControl = Xrm.Page.getControl("statuscode");
	var recordId = Xrm.Page.data.entity.getId();

	var selectedValue = optionSetControl.getAttribute().getValue();
	if (recordId === null || recordId === "") {
		AddOption(754300000);//Created
		AddOption(754300001);//Confirmed
		AddOption(754300002);//Renting
		RemoveOption(754300003);//Returned
		RemoveOption(754300004);//Canceled
	}
	else
	{
		switch (selectedValue) {
			case 754300000:
			{
				AddOption(754300000); // Created
				AddOption(754300001); // Confirmed
				AddOption(754300002); // Renting
				RemoveOption(754300003); // Returned
				AddOption(754300004); // Canceled
				break;
			}
		  case 754300001:
			{
				RemoveOption(754300000); // Created
				AddOption(754300001); // Confirmed
				AddOption(754300002); // Renting
				RemoveOption(754300003); // Returned
				AddOption(754300004); // Canceled
				break;
			}
		  case 754300002:
			{
				RemoveOption(754300000); // Created
				RemoveOption(754300001); // Confirmed
				AddOption(754300002); // Renting
				AddOption(754300003); // Returned
				RemoveOption(754300004); // Canceled
				break;
			}
		  case 754300003:
			{
				RemoveOption(754300000); // Created
				RemoveOption(754300001); // Confirmed
				RemoveOption(754300002); // Renting
				AddOption(754300003); // Returned
				RemoveOption(754300004); // Canceled
				break;
			}
		  case 754300004:
			{
				RemoveOption(754300000); // Created
				RemoveOption(754300001); // Confirmed
				RemoveOption(754300002); // Renting
				RemoveOption(754300003); // Returned
				AddOption(754300004); // Canceled
				break;
			}
		}
	}

	/*else if (selectedValue === 754300000) {
		AddOption(754300000);//Created
		AddOption(754300001);//Confirmed
		AddOption(754300002);//Renting
		RemoveOption(754300003);//Returned
		AddOption(754300004);//Canceled
	} 
	else if (selectedValue === 754300001) {
		RemoveOption(754300000);//Created
		AddOption(754300001);//Confirmed
		AddOption(754300002);//Renting
		RemoveOption(754300003);//Returned
		AddOption(754300004);//Canceled
	} 
	else if (selectedValue === 754300002) {
		RemoveOption(754300000);//Created
		RemoveOption(754300001);//Confirmed
		AddOption(754300002);//Renting
		AddOption(754300003);//Returned
		RemoveOption(754300004);//Canceled
	}
	else if (selectedValue === 754300003) {
		RemoveOption(754300000);//Created
		RemoveOption(754300001);//Confirmed
		RemoveOption(754300002);//Renting
		AddOption(754300003);//Returned
		RemoveOption(754300004);//Canceled
	}
	else if (selectedValue === 754300004) {
		RemoveOption(754300000);//Created
		RemoveOption(754300001);//Confirmed
		RemoveOption(754300002);//Renting
		RemoveOption(754300003);//Returned
		AddOption(754300004);//Canceled
	}
	*/
	function AddOption(option) 
	{
		var options = optionSetControl.getAttribute().getOptions();
		var optionExists = options.some(function (optionFunc) {
		  return optionFunc.value !== option;
		});
		if(optionExists)
		{
			options.forEach(function(element) {
				if(element[1] == option)
				{
					optionSetControl.addOption({ value: element[1], text: element[2] }, element[0]);
				}
			});
		}
  
	}
	function RemoveOption(option) 
	{
		var options = optionSetControl.getAttribute().getOptions();
		var optionExists = options.some(function (optionFunc) {
		  return optionFunc.value === option;
		});
		if(optionExists)
		{
			var options = optionSetControl.getOptions();
			var optionToRemove = options.find(function(optionToFind) {
			  return optionToFind.value === option;
			});

			if (optionToRemove) {
			  optionSetControl.removeOption(option);
			}
		}
	}

}