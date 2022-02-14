var count = 0;
        var itemData = "";
        var buttonData = "";

        $(document).on('click', '.remove', function(){ 

          var itemRowCount = $(this).data("count");

          $('.item'+itemRowCount).html(" ");

          calculation();

        })

        $(document).on('click', '.add', function(){ 

          count++;

          itemData += '<tr class="item'+count+'">'
          itemData += '<td>'+(count + 1)+'</td>'
          itemData += '<td><select class="form-control-sm form-control itemGroup" data-count="'+count+'" id="itemGroup'+count+'" name="itemGroupId['+count+']"></select></td>'
          
          itemGroupList();

          itemData += '<td><select class="form-control-sm form-control"  id="itemName'+count+'" name="itemId['+count+']"></select></td>'

          itemData += '<td><input type="text" id="input-small" class="input-sm form-control-sm form-control" name="size['+count+']" placeholder="Enter Size"></td>'
          itemData += '<td></td>'
          itemData += '</tr>'
          itemData += '<tr class="item'+count+'">'
          itemData += '<td id="addItemButton'+(count+1)+'"><div class="table-data-feature"><button class="item add" type="button" data-placement="top"><i class="zmdi zmdi-plus-square"></i></button></div></td>'

          itemData += '<td><input type="number" id="quantity'+count+'" class="input-sm form-control-sm form-control" step=".01" name="quantity['+count+']" placeholder="Enter Quantity"></td>'

          itemData += '<td><input type="number" id="totalSqft'+count+'" class="input-sm form-control-sm form-control change" step=".01" data-count="'+count+'" name="totalSqft['+count+']" placeholder="Enter Total Sq.Ft."></td>'


          itemData += '<td><input type="number" id="rate'+count+'" class="input-sm form-control-sm form-control change" step=".01" data-count="'+count+'" name="rate['+count+']" placeholder="Enter Rate"></td>'
          
          itemData += '<td><input type="number" class="input-sm form-control-sm form-control" placeholder="Amount" id="amount'+count+'" disabled></td>'                                            
          itemData += '</tr>'   

          if (count == 1) {

            buttonData = "";
          } else {

            buttonData += '<div class="table-data-feature">';
            buttonData += '<button class="item remove" type="button" data-count="'+(count-1)+'" data-placement="top"><i class="zmdi zmdi-minus-square"></i></button>'
            buttonData += '</div>'
          }  


          $('#addItem').append(itemData);
          $('#addItemButton'+count).html(buttonData);
          $('#totalItemNo').val(count);


          itemData = "";   
          buttonData = "";
                     
        });

          itemGroupList();

      //Item Group

      var selectItemGroup = '<option>Select Item Group</option>';

      function itemGroup(data, index) {

        selectItemGroup += '<option value="' + data._id + '">' + data.itemGroupName + '</option>'
      }

      

      function itemGroupList() {
        var modelData = "";
        $.ajax({
          url: '/all-item-group',
          method: 'get',
          dataType: 'json',
          success: function(response) {
            if(response.msg == 'success') {
              selectItemGroup = "'<option>Select Item Group</option>'";
              response.itemGroup.forEach((data, index) => {
                itemGroup(data, index);
              });
              $('#itemGroup'+count).html(selectItemGroup);
            }
          }
        })
      }

      //Item Name
      var selectItemName = "";

      function itemName(data, index) {

        selectItemName += '<option value="' + data._id + '">' + data.itemName + '</option>'
      }

      $(document).on('change', '.itemGroup', function(){

        console.log('1');

        var itemGroupId = $(this).val();
        var itemGroupCount = $(this).data("count");  

        $.ajax({
          url:'/all-item-name/'+itemGroupId,
          method:'get',
          dataType: 'json',
          success:function(response)
          {
            selectItemName = "";
            response.itemName.forEach((data, index) => {
              itemName(data, index);
            });
            $('#itemName'+itemGroupCount).html(selectItemName);
          }
        })
      });

                //Amount Calculation

          var quantity = 0;
          var rate = 0;
          var amount = 0;
          var itemAmount = 0;
          var itemTotalAmount = 0;
          var packingCharge = 0;
          var transportCharge = 0;
          var fittingCharge = 0;
          var totalAmount = 0;
          var gst = 0;
          var gstAmount = 0;
          var discount = 0;
          var finalAmount = 0;


          $(document).on('change', '.change', function(){
                
                var changeCount = $(this).data("count");  

                quantity = parseFloat(document.getElementById('totalSqft'+changeCount).value);
                rate = parseFloat(document.getElementById('rate'+changeCount).value);

                amount = (quantity*rate).toFixed(2);
                $('#amount'+changeCount).val(amount);

                calculation();

                

            });

          $(document).on('change', '.calculationChange', function(){

            calculation();
          });

          function calculation(){

              for (var i = 0; i <= count; i++) {

                  itemAmount = parseFloat(document.getElementById('amount'+i).value);

                  if (Number.isNaN(itemAmount)) {

                    itemAmount = 0;
                  }

                  itemTotalAmount = parseFloat((itemTotalAmount + itemAmount).toFixed(2));
                  itemAmount = 0;
                  
                }
                $('#itemTotalAmount').val(itemTotalAmount);


                totalAmount = parseFloat((itemTotalAmount).toFixed(2));

                $('#totalAmount').val(totalAmount);


                discount = parseFloat(document.getElementById('discount').value);

                finalAmount = totalAmount - discount;

                $('#finalAmount').val(finalAmount);

                quantity = 0;
                rate = 0;
                amount = 0;
                itemAmount = 0;
                itemTotalAmount = 0;
                packingCharge = 0;
                transportCharge = 0;
                fittingCharge = 0;
                totalAmount = 0;
                gst = 0;
                gstAmount = 0;
                discount = 0;
                finalAmount = 0;
          }