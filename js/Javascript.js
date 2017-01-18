$(function(){
    $('.modal').modal();
	updateTestInfoFirstTime();
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
	updateTestInfo();
});

$('#tests').on('click', '.test-name', function(){
	var test = $(this);
	var testName = test.text();
	var testDescription = test.siblings('.description').text();
	$('#testDescriptionDynamicModal .test-name').text(testName);
	$('#testDescription').text(testDescription);
	$('#testDescriptionDynamicModal').modal('open');
});

$('#tests').on('click', '.test-error', function(){
	var testBlock = $(this).closest('.test');
	var testName = testBlock.find('.test-name').text();
	var errorMessage = testBlock.find('.test-error-message').text();
	var linkOnImage = testBlock.find('.image-link').text();
	var errorModalWindow = $('#testErrorDynamicModal');
	errorModalWindow.find('.test-name').text(testName);
	$('#errorMessage').text(errorMessage);
	$('#linkOnImage').attr('href', linkOnImage);
	errorModalWindow.modal('open');
});

function updateTestInfoFirstTime(){
	$('.suite-info').removeClass('suite-active');
	$('.suite-info').first().addClass('suite-active');
	updateTestInfo();
}

function updateTestInfo(){
	var testInfo = $('.suite-active').children('.test-info').html();
	$('#tests').html(testInfo);
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
	$('#testSuiteLink > a').attr('href', suiteDetails.suiteLink);
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



