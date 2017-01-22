$(function(){
    $('.modal').modal();
	updateTestInfoDefault();
	updateActiveMenu();
	activateDropdowns();
  });

$('#menu').sideNav();

$('#hideDiagrams').click(function(){
	var isDiagramDisplayed = isDiagramsDisplayed();
	var diagrams = $('.total-suite-info');
	if(isDiagramDisplayed){
		collapseAll();
		$('#hideDiagrams i').css('transform', 'rotate(90deg)');
	}
	else{
		expandAll();
		$('#hideDiagrams i').css('transform', 'rotate(0deg)');
	}
});

$('.suite-details-button').click(function(e){
	e.stopPropagation();
	var suiteInfo = $(this).closest('.suite-info');
	var	suiteDetails = getSuiteDetails(suiteInfo);
	updateDynamicModalSuiteDetails(suiteDetails);
	$('#suiteInfoDynamicModal').modal('open');
});



$('.suite-info').click(function(){
	var suite = $(this);
	$('.suite-active').removeClass('suite-active');
	suite.addClass('suite-active');
	updateTestSection();
});

$('#tests').on('click', '.test-name', function(){
	var testInfo = getTestInfo($(this));
	var testInfoModalWindow = $('#testinfoDynamicModal');
	updateTestInfoDynamicModalWindow(testInfo, testInfoModalWindow);
	testInfoModalWindow.modal('open');
});

$('#tests').on('click', '.test-error', function(){
	var testBlock = $(this).closest('.test');
	var testName = testBlock.find('.test-name').text();
	var errorMessage = testBlock.find('.test-error-message').text();
	var errorModalWindow = $('#testErrorDynamicModal');
	errorModalWindow.find('.test-name').text(testName);
	$('#errorMessage').text(errorMessage);
	
	var linkOnImage = testBlock.find('.image-link').text();
	var linkOnImageBlock = $('#linkOnImage');
	if(linkOnImage.length > 0){
		linkOnImageBlock.find('a').attr('href', linkOnImage);
		showElement(linkOnImageBlock);
	}
	else{
		hideElement(linkOnImageBlock);
	}
	
	errorModalWindow.modal('open');
});

$('.suite-filter').click(function(){
	var choice = $(this).attr('suite-status');
	hideElement($('.suite-info'));
	showElement($('.suite-'.concat(choice)));
	updateTestInfoDefault();
});

$('#resetSuiteFilter').click(function(){
	showElement($('.suite-info'));
});

$('#testFilter').on('click', '.test-filter', function(){
	var choice = $(this).attr('test-status');
	hideElement($('#tests .test'));
	showElement($('#tests .test-'.concat(choice)));
});

$('#resetTestFilter').click(function(){
	showElement($('#tests .test'));
});

function updateTestInfoDefault(){
	$('.suite-info').removeClass('suite-active');
	$('.suite-info:visible:first').addClass('suite-active');
	updateTestSection();	
}

function updateActiveMenu(){
	var testSuiteName = $('.test-suite-name').text();
	$('#slide-out a span').each(function(){
		var currentMenu = $(this);
		if(currentMenu.text() === testSuiteName){
			currentMenu.parent().addClass('active');
		}
	});
}

function updateTestSection(){
	var testInfo = $('.suite-active').children('.test-section').html();
	$('#tests').html(testInfo);
	updateTestFilter();
}

function updateTestFilter(){
	var statuses = getAllowedStatuses();
	updateValuesInFilter(statuses);
}

function getAllowedStatuses(){
	var statuses = [];
	var statusesElement = $('#tests .test-status').each(function(){
		var currentStatus = $(this).text();
		if(jQuery.inArray(currentStatus, statuses) === -1){
			statuses.push(currentStatus);
		}
	});
	return statuses;
}

function updateValuesInFilter(alowedStatuses){
	var suiteFilterElement = $('#testFilter');
	suiteFilterElement.empty();
	
	var testStatusesHtml = [];
	alowedStatuses.forEach(function(item){
		testStatusesHtml.push("<li><a class='test-filter' test-status='" + item + "' href='javascript:void(0)'>" + item + "</a></li>");
	});
	suiteFilterElement.html(testStatusesHtml.join('\n'));
}

function getSuiteDetails(suiteInfoElement){
	var suiteDetails = new Object();
	suiteDetails.suiteName = suiteInfoElement.children('.suite-name').text();
	suiteDetails.startTime = suiteInfoElement.find('.suite-start-time').text();
	suiteDetails.endTime = suiteInfoElement.find('.suite-end-time').text();
	suiteDetails.totalDuration = suiteInfoElement.find('.total-duration').text();
	suiteDetails.suiteLink = suiteInfoElement.find('.test-suite-link').text();
	return suiteDetails;
}

function updateDynamicModalSuiteDetails(suiteDetails){
	$('#suiteName').text(suiteDetails.suiteName);
	$('#suiteStartTime').text(suiteDetails.startTime);
	$('#suiteEndTime').text(suiteDetails.endTime);
	$('#totalDuration').text(suiteDetails.totalDuration);
	
	var testSuiteLink = $('#testSuiteLink');
	if(suiteDetails.suiteLink.length > 0){
		$('#testSuiteLink  a').attr('href', suiteDetails.suiteLink);
		showElement(testSuiteLink);
	}
	else{
		hideElement(testSuiteLink);
	}
}

function getTestInfo(testInfoBlock){
	var testInfo = new Object();
	testInfo.testName = testInfoBlock.text();
	var info = testInfoBlock.siblings('.test-info');
	testInfo.startTime = info.children('.start-time').text();
	testInfo.endTime = info.children('.end-time').text();
	testInfo.duration = info.children('.duration').text();
	testInfo.description = info.children('.description').text();
	return testInfo;
}

function updateTestInfoDynamicModalWindow(testInfo, testInfoModalWindow){
	
	testInfoModalWindow.find('.test-name').text(testInfo.testName);
	testInfoModalWindow.find('.start-time').text(testInfo.startTime);
	testInfoModalWindow.find('.end-time').text(testInfo.endTime);
	testInfoModalWindow.find('.duration').text(testInfo.duration);
	
	var elementDescription = testInfoModalWindow.find('.description');
	if(testInfo.description.length > 0){
		$('#testDescription').text(testInfo.description);
		showElement(elementDescription);
	}
	else {
		hideElement(elementDescription);
	}
}

function changeIcon(isDiagramsDisplayed){
	var icon = $("#hideDiagrams > i");
	var iconClass;
	if(isDiagramsDisplayed){
		var iconClass = icon.attr('class').replace('right', 'down');
	}
	else{
		var iconClass = icon.attr('class').replace('down', 'right');
	}
	icon.attr('class', iconClass);
}

function isDiagramsDisplayed(){
	var isDiagramDisplayed = false;
	var diagramElements = $('.total-suite-info');
	diagramElements.each(function(index){
		var diagram = $(this);
		if(diagram.hasClass('active')){
			isDiagramDisplayed = true;
			return false;
		}
	});
	return isDiagramDisplayed;
};

function activateDropdowns(){
	$('.dropdown-button').dropdown({
      belowOrigin: true, // Displays dropdown below the button
    }
  );
}

function expandAll(){
  $(".collapsible-header").addClass("active");
  $(".collapsible").collapsible({accordion: false});
}

function collapseAll(){
  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});
}

function showElement(element){
	element.removeClass('hide');
}

function hideElement(element){
	element.addClass('hide');
}



