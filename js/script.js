function getplayerrow(player) {
var playerRow = "";
if(player){
    playerRow = `<tr>
    <td class="align-middle"><img src="uploads/${player.photo}" class="img-thumbnail rounded float-left"></td>
    <td class="align-middle">${player.pname}</td>
    <td class="align-middle">${player.email}</td>
    <td class="align-middle">${player.phone}</td>
    <td class="align-middle">
    <a href="#" class="btn btn-success mr-3 profile" data-toggle="modal" data-target="#userViewModal" title="Prfile" data-id="${player.id}"><i class="fa fa-address-card-o" aria-hidden="true"></i></a>
    <a href="#" class="btn btn-warning mr-3 edituser" data-toggle="modal" data-target="#userModal" title="Edit" data-id="${player.id}"><i class="fa fa-pencil-square-o fa-lg"></i></a>
    <a href="#" class="btn btn-danger deleteuser" data-userid="14" title="Delete" data-id="${player.id}"><i class="fa fa-trash-o fa-lg"></i></a>
    </td>
    </tr>`;
}
return playerRow;
}




function getplayers(){
    var pageno = $('#currentpage').val();
    $.ajax({
        url:"/phptutorial/crudphp/ajax.php",
        type:"GET",
        dataType:"json",
        data:{page: pageno, action:"getusers"},
        beforeSend: function(){
            $("#overlay").fadeIn();
        },
        success:function(rows){
            if(rows.players){
                var playerslist = '';
                $.each(rows.players, function(index,player){
                    playerslist+= getplayerrow(player);
                });
                $('#userstable tbody').html(playerslist);
                $("#overlay").fadeOut();
            }
        },
        error:function(){
            console.log("Oops! something went wrong");
        }
    });
}



$(document).ready(function(){
    $(document).on("submit","#addform",function(event){
        event.preventDefault();
        $.ajax({
            url:"/phptutorial/crudphp/ajax.php",
            type:"POST",
            dataType:"json",
            data: new FormData(this),
            processData: false,
            contentType: false,
            beforeSend: function(){
                $("#overlay").fadeIn();
            },
            success:function(response){
                console.log(response);
                if(response) {
                    $("#userModal").modal("hide");
                    $("#addform")[0].reset();
                    $('#overlay').fadeOut();
                }
            },
            error: function(){
                console.log("Oops! something went wrong");
            },
        });
      });
      getplayers();
});