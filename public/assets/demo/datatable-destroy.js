// Call the dataTables jQuery plugin
// $(document).ready(function() {
//   $('#dataTable').DataTable();

// });

$(function(){
     
     var table2 = $('#dataTableListarMatriculas').DataTable();  
      table2.destroy();  

      var table = $('#dataTable').DataTable();  
      table.destroy(); 
  })