$(function(){
    $('.modal').modal();
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



