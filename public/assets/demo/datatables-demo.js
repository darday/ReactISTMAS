// Call the dataTables jQuery plugin
// $(document).ready(function() {
//   $('#dataTable').DataTable();

// });

$(function(){
  var table = $('#dataTable').DataTable(
    {
      // colReorder: true,
      // fixedHeader: true,
       retrieve: true,
      dom: 'Bfrtip',
      lengthMenu: [
        [ 10, 25, 50, -1 ],
        [ '10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo' ]
      ],

     
      
      buttons: [
        
          {
            extend: 'pageLength',
            text: "<i class='fas fa-list-ol'></i> Filas"
          },
          {
            extend: 'colvis',
            text:"<i class='far fa-eye'></i> Ocultar",
            collectionLayout: 'fixed two-column',
            postfixButtons: [ {extend:'colvisRestore',text:"Mostrar Todo"} ],
          },
        
        
          {
              extend: 'excel',
              text:"<i class='far fa-file-alt'></i> Excell",
              className:'btn ',
              title: '<b>INSTITUTO SUPERIOR TECNOLÓGICO MISAEL ACOSTA SOLÍS<b>',
              messageTop: 'Listado de Datos',
              exportOptions: {
                columns: ':visible',
                download: 'open',
              }
          },
          {
            title: 'INSTITUTO SUPERIOR TECNOLÓGICO MISAEL ACOSTA SOLÍS',

            extend: 'pdf',
            text:"<i class='far fa-file-pdf'></i> PDF",
            messageTop: 'Descripcion del listado de datos:',
            className:' ' ,
            //orientation: 'landscape',
            pageSize: 'A4',
            exportOptions: {
              columns: ':visible',
              download: 'open',
            },
          //   customize: function ( win ) {
          //     $(win.document.body)
          //         .css( 'font-size', '10pt' )
          //         .prepend(
          //             '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
          //         );

          //     $(win.document.body).find( 'table' )
          //         .addClass( 'compact' )
          //         .css( 'font-size', 'inherit' );
          // }
          },
          

          
          // {
          //     extend: 'print',
          //     messageTop: function () {
          //         printCounter++;

          //         if ( printCounter === 1 ) {
          //             return 'This is the first time you have printed this document.';
          //         }
          //         else {
          //             return 'You have printed this document '+printCounter+' times';
          //         }
          //     },
          //     messageBottom: null
          // }
      ],

      "language":{
        "decimal":        "",
        "emptyTable":     "Por Favor Recarge la página",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_ Datos",
        "infoEmpty":      "Mostrando 0 a 0 de 0 Datos",
        "infoFiltered":   "(Encontrada de un Total de _MAX_ Datos)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Mostrar _MENU_ entries",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "Buscar:",
        "zeroRecords":    "No Se han encontado Datos",
        "paginate": {
            "first":      "Primera",
            "last":       "Última",
            "next":       "Siguiente",
            "previous":   "Anterior"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
      }
      
    }

    );

  //Tabla 2




   var table2 = $('#dataTableListarMatriculas').DataTable(
    {

    
      //-***********************
      orderCellsTop: true,
        fixedHeader: true,
        colReorder: true,
      retrieve: true,
      dom: 'Bfrtip',
      lengthMenu: [
        [ 10, 25, 50, -1 ],
        [ '10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo' ]
      ],

     
      
      buttons: [
        
          {
            extend: 'pageLength',
            text: "<i class='fas fa-list-ol'></i> Filas"
          },
          {
            extend: 'colvis',
            text:"<i class='far fa-eye'></i> Ocultar",
            collectionLayout: 'fixed two-column',
            postfixButtons: [ {extend:'colvisRestore',text:"Mostrar Todo"} ],
          },
        
        
          {
              extend: 'excel',
              text:"<i class='far fa-file-alt'></i> Excell",
              className:'btn ',
              title: '<b>INSTITUTO SUPERIOR TECNOLÓGICO MISAEL ACOSTA SOLÍS<b>',
              messageTop: 'Listado de Datos',
              exportOptions: {
                columns: ':visible',
                download: 'open',
              }
          },
          {
            title: 'INSTITUTO SUPERIOR TECNOLÓGICO MISAEL ACOSTA SOLÍS',

            extend: 'pdf',
            text:"<i class='far fa-file-pdf'></i> PDF",
            messageTop: 'Descripcion del listado de datos:',
            className:' ' ,
            //orientation: 'landscape',
            pageSize: 'A4',
            exportOptions: {
              columns: ':visible',
              download: 'open',
            },
      
          },
          

       
      ],

      "language":{
        "decimal":        "",
        "emptyTable":     "Por Favor Recarge la página",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_ Datos",
        "infoEmpty":      "Mostrando 0 a 0 de 0 Datos",
        "infoFiltered":   "(Encontrada de un Total de _MAX_ Datos)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Mostrar _MENU_ entries",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "Buscar:",
        "zeroRecords":    "No Se han encontado Datos",
        "paginate": {
            "first":      "Primera",
            "last":       "Última",
            "next":       "Siguiente",
            "previous":   "Anterior"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
      }
      
    }

    );

   

    
   
    //  //Creamos una fila en el head de la tabla y lo clonamos para cada columna
    //  $('#dataTableListarMatriculas thead tr').clone(true).appendTo( '#dataTableListarMatriculas thead' );
    //  $('#dataTableListarMatriculas thead tr:eq(1) th').each( function (i) {
    //      var title = $(this).text();
    //      $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
  
    //      $( 'input', this ).on( 'keyup change', function () {
    //          if ( table2.column(i).search() !== this.value ) {
    //              table2
    //                  .column(i)
    //                  .search( this.value )
    //                  .draw();
    //          }
    //      } );
    //  } );
   

  
 
})