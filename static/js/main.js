(function($){
  $(function(){
    $('.button-collapse').sideNav();
  });

  function printDic(x){
      var stringOut="";
      for (var key in x)
      {
        if(key != parseInt(key, 10))
          stringOut+=key+": "+x[key]+"</td></tr><tr><td>";
      }
      return stringOut;
  };

  function printRealDic(x){
      var stringOut="";
      for (var key in x)
          stringOut+=key+": "+x[key]+"</td></tr><tr><td>";
      return stringOut;
  };

  function printDicnew(x){
      var stringOut="";
      for (var key in x)
      {
        if(key != parseInt(key, 10))
          stringOut+=key+"</td></tr><tr><td>";
      }
      return stringOut;
  };

  function printRealDicnew(x){
      var stringOut="";
      for (var key in x)
          stringOut+=key+"</td></tr><tr><td>";
      return stringOut;
  };

  function printRealDicSim(x, currNum, currText){
      var stringOut="";
      for (var key in x){
          if(currNum == key & currText == x[key]){
          stringOut+="<tr bgcolor='#88E06D'><td>"+key+": "+x[key]+"</td></tr>";
        } else {
          stringOut+="<tr><td>"+key+": "+x[key]+"</td></tr>";
        }
      }
      return stringOut;
  };

  function printRealDic2(x){
      var stringOut="";
      for (var key in x)
          if(x[key]===parseInt(x[key],10))
            stringOut+=key+": "+x[key]+"</td></tr><tr><td>";
      return stringOut;
  };
  var totalSize = 0;
  var idarr = ['input-files','pass1','pass2','linker','simulator'];
    for(i=0;i<idarr.length;i++)
    {
        $('#'+idarr[i]).hide();
    }
  $('#submit-button').click(function(){
      files = $('input[type=file]')[0].files;
      fileNames = []
      for(i=0;i<files.length;i++){
          fileNames[i] = files[i].name;
      }

      $.ajax({
            type : "POST",
            url : "/load_ajax",
            data: JSON.stringify({files: fileNames}),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
              response = $.parseJSON(result);
              // $('#registers').html("Registers ");
              // $('#memlocs').html("Variable Location");
              // $('#varlocs').html("Memory Location");
              $('#currentInst').html("Nothing Loaded yet");
              $('#stack').html("Stack");
              tabs = "";
              tabs += '<ul class="nav nav-tabs" id="myTab" role="tablist">';
              for(i=0;i<fileNames.length;i++){
                if(i == 0){
                  tabs += ' <li class="nav-item"><a class="nav-link active" data-toggle="tab" id="filetab-tab'+i+'" href="#filetab'+i+'" role="tab" aria-controls="filetab'+i+'" aria-selected="true">'+fileNames[i]+'</a></li>';
                }
                else {
                  tabs += ' <li class="nav-item"><a class="nav-link" data-toggle="tab" id="filetab-tab'+i+'" href="#filetab'+i+'" role="tab" aria-controls="filetab'+i+'" aria-selected="false">'+fileNames[i]+'</a></li>';
                }

              }
              tabs += '</ul>';
              tabs += '<div class="tab-content pl-3 p-1" id="myTabContent">'
              for(i=0;i<fileNames.length;i++){   
              if(i==0){            
                tabs += '<div id="filetab'+i+'" class="tab-pane fade show active" role="tabpanel" aria-labelledby="filetab-tab"'+i+'>';
                tabs+= '<div>'+response['filedata'][fileNames[i]].replace(/\n/g,"<br>")+'</div>';
                tabs+='</div>';
              }
              else{
                tabs += '<div id="filetab'+i+'" class="tab-pane fade" role="tabpanel" aria-labelledby="filetab-tab"'+i+'>';
                tabs+= '<div>'+response['filedata'][fileNames[i]].replace(/\n/g,"<br>")+'</div>';
                tabs+='</div>';
              }
            }
              tabs += '</div>';
              $('#file-data').html(tabs);



              tabs = "";
              tabs += '<ul class="nav nav-tabs" id="myTab1" role="tablist1">';
              for(i=0;i<fileNames.length;i++){
                if(i == 0){
                  tabs += ' <li class="nav-item"><a class="nav-link active" data-toggle="tab" id="pass1tab-tab'+i+'" href="#pass1tab'+i+'" role="tab" aria-controls="pass1tab'+i+'" aria-selected="true">'+fileNames[i]+'</a></li>';
                }
                else {
                  tabs += ' <li class="nav-item"><a class="nav-link" data-toggle="tab" id="pass1tab-tab'+i+'" href="#pass1tab'+i+'" role="tab" aria-controls="pass1tab'+i+'" aria-selected="false">'+fileNames[i]+'</a></li>';
                }
              }                    

              tabs += '</ul>';
              tabs += '<div class="tab-content pl-3 p-1" id="myTabContent1">'

              for(i=0;i<fileNames.length;i++){
                var tempname = fileNames[i].split('.')[0];
                if(i==0){
                  tabs += '<div id="pass1tab'+i+'" class="tab-pane fade show active" role="tabpanel" aria-labelledby="pass1tab-tab"'+i+'>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Assembler Pass1</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += response['pass1'][tempname].replace(/\n/g,"</td></tr><tr><td>") + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Symbol Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDicnew(response['symTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Literals Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printRealDicnew(response['litTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Global Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDicnew(response['globTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs+='</div>';
                }
                else {
                  tabs += '<div id="pass1tab'+i+'" class="tab-pane fade" role="tabpanel" aria-labelledby="pass1tab-tab"'+i+'>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Pass1</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += response['pass1'][tempname].replace(/\n/g,"</td></tr><tr><td>") + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Symbol Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDicnew(response['symTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Literals Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printRealDicnew(response['litTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Global Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDicnew(response['globTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs+='</div>';
                }
              }
              tabs += '</div>';
              $('#pass1final').html(tabs);

              tabs = "";
              tabs += '<ul class="nav nav-tabs" id="myTab2" role="tablist2">';
              for(i=0;i<fileNames.length;i++){
                if(i == 0){
                  tabs += ' <li class="nav-item"><a class="nav-link active" data-toggle="tab" id="pass2tab-tab'+i+'" href="#pass2tab'+i+'" role="tab" aria-controls="pass2tab'+i+'" aria-selected="true">'+fileNames[i]+'</a></li>';
                }
                else {
                  tabs += ' <li class="nav-item"><a class="nav-link" data-toggle="tab" id="pass2tab-tab'+i+'" href="#pass2tab'+i+'" role="tab" aria-controls="pass2tab'+i+'" aria-selected="false">'+fileNames[i]+'</a></li>';
                }
              }                    

              tabs += '</ul>';
              tabs += '<div class="tab-content pl-3 p-1" id="myTabContent2">'

              for(i=0;i<fileNames.length;i++){
                var tempname = fileNames[i].split('.')[0];
                if(i==0){
                  tabs += '<div id="pass2tab'+i+'" class="tab-pane fade show active" role="tabpanel" aria-labelledby="pass2tab-tab"'+i+'>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Assembler Pass2</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += response['pass2'][tempname].replace(/\n/g,"</td></tr><tr><td>") + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Symbol Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDic(response['symTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Literals Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printRealDic(response['litTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Global Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDic(response['globTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs+='</div>';
                }
                else {
                  tabs += '<div id="pass2tab'+i+'" class="tab-pane fade" role="tabpanel" aria-labelledby="pass2tab-tab"'+i+'>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Pass1</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += response['pass2'][tempname].replace(/\n/g,"</td></tr><tr><td>") + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Symbol Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDic(response['symTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Literals Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printRealDic(response['litTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs += '<div class="col-lg-6"><div class="card"><div class="card-header"><strong class="card-title">Global Table</strong></div><div class="card-body"><table class="table"><tbody><tr><td>';
                  tabs += printDic(response['globTable'][tempname]) + '</td></tr>';
                  tabs += '</tbody></table></div></div></div>';
                  tabs+='</div>';
                }
              }
              tabs += '</div>';
              $('#pass2final').html(tabs);
              tabs = "";
              tabs += '<table class="table"><tbody><tr><td>';
              tabs += response['lin'].replace(/\n/g,"</td></tr><tr><td>") + '</td></tr>';
              tabs += '</tbody></table>';
              totalSize = response['tot'];
              console.log(totalSize);

              $('ul.tabs').tabs();
              $('#linkerfinal').html(tabs);
            }
        });
  });

  function stackString(stack){
    output = '<b>STACK: </b><br>';
    for(i=0;i<stack.length;i++)
      {
        output+= stack[i]+'<br>';
      };
    return output;
  };

  function startsimulation(){
    offset = $('#offset').val();
    $.ajax({
          type : "POST",
          url : "/loadSimulator",
          data: JSON.stringify({file: fileNames[0].split('.')[0], 'offset':parseInt(offset)}),
          contentType: 'application/json;charset=UTF-8',
          success: function(result) {

          response = $.parseJSON(result);
          $('#registers').html("<tr><td>"+printDic(response['reg']));
          $('#memlocs').html(printRealDicSim(response['memory'], response['reg']['PC'], response['memory'][response['reg']['PC']]));
          $('#varlocs').html("<tr><td>"+printRealDic2(response['memoryData']));
          console.log(response['memoryData']);
          $('#currentInst').html(response['memory'][response['reg']['PC']]);
         }   
      });
  }

  var counter = 0;
  var ins = "";
  function runajax(){
    $.ajax({
        type : "POST",
        url : "/runSimulator",
        // data: JSON.stringify({file: fileNames[0].split('.')[0]}),
        // contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            response = $.parseJSON(result);
            counter = counter + 1;
            ins = response['memory'][response['reg']['PC']];
            // setTimeout(()=>console.log(i),3000);
            $('#registers').html("<tr><td>"+printDic(response['reg']));
            $('#memlocs').html(printRealDicSim(response['memory'], response['reg']['PC'], response['memory'][response['reg']['PC']]));
            $('#varlocs').html("<tr><td>"+printRealDic2(response['memoryData']));
            console.log(ins);
            $('#currentInst').html(response['memory'][response['reg']['PC']]); 
      
       },
       complete: function() {
          if(ins != "HLT")
          {
            var times = $("#speed").val();
            var speed = 0;
            if(times <= 0){
              speed = 1000;
            } else{
              speed = 1000/times;
            }
            setTimeout(runajax,speed);
          }
          else {
            isRunning = false;
          }
       }   
    });
  }
  var isRunning = false;
  $('#runButton').click(function(){
    console.log('hello');
    if(!isRunning){
      isRunning=true;
    startsimulation();
    setTimeout(runajax,1000);
  }
  });

  $('.ext').click(function(){
    var addressValue = $(this).attr("plink");
    console.log(addressValue);
    var idarr = ['titleBox','input-files','pass1','pass2','linker','simulator'];
    for(i=0;i<idarr.length;i++)
    {

      if(idarr[i]!=addressValue)
        $('#'+idarr[i]).hide();
      else
        $('#'+idarr[i]).show();
    }
  });
})(jQuery);