$(function(){
    $('.modal').modal();
  });

$('#menu').sideNav();

$('#hideDiagrams').click(function(){
	var isDiagramDisplayed = isDiagramsDisplayed();
	var diagrams = $('.suiteInfo');
	if(isDiagramDisplayed){
		collapseAll();
		$('#hideDiagrams i').css('transform', 'rotate(90deg)');
	}
	else{
		expandAll();
		$('#hideDiagrams i').css('transform', 'rotate(0deg)');
	}
});

function changeContentHeight(isDiagramsDisplayed){
	var contentBlock = $('#content');
	var withDiagramClass = 'content-with-diagrams';
	var withoutDiagramClass = 'content-without-diagrams';
	if(isDiagramsDisplayed){
		contentBlock.removeClass(withoutDiagramClass);
		contentBlock.addClass(withDiagramClass);
	}
	else{
		contentBlock.removeClass(withDiagramClass);
		contentBlock.addClass(withoutDiagramClass);
	}
};

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
	var diagramElements = $('.suiteInfo');
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

