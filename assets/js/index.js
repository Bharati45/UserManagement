$('#add_user').submit(function(event){
    alert("User inserted successfully!")
})

$('#update_user').submit(function(event){
    event.preventDefault()
    
    //return serialized array of data
    var unindexed_array = $('#update_user').serializeArray();
    var data={};
    
    //n return all data from array and i returns index of array
    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })
    
    var request = {
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    
    $.ajax(request).done(function(response){
         alert("data updated successfully!")
         window.location.href="/"
    })
})

 $('#userData').DataTable({
    "columnDefs": [
        { "searchable": false, "targets": [5] }
    ]
 });


