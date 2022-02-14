$(document).ready(function(){  
    alert('application started');  
  
    getdata();  
  
    
    function getdata(){  
        $.ajax({  
            url:'/see-enquiry',  
            method:'get ',  
            dataType:'json',  
            success:function(response){  
                 if(response.msg=='success'){   
                     if(response.data==undefined || response.data==null || response.data==''){  
                         $('.getData').hide();  
                     }else{  
                        $('.getData').show();  
                     $.each(response.enquiry,function(index,data){  
            $('.getData').append(+data.shopName+);   
                     });  
                 }  
               }  
            },  
            error:function(response){  
                alert('server error');  
            }  
        });  
    }  
}); 