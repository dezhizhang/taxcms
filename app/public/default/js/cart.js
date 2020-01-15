(function($) {

  const app = {
    init() {
      this.initCheckBox();

      this.changeCartNum();


      this.isCheckedAll();


      this.deleteConfirm();
    },
    deleteConfirm() {
      $('.delete').click(function() {

        const flag = confirm('您确定要删除吗?');

        return flag;

      });

    },
    initCheckBox() {
      $('#checkAll').click(function() {
        if (this.checked) {
          $(':checkbox').prop('checked', true);
          $.get('/changeAllCart?type=1', function(response) {
            if (response.success) {
              $('#allPrice').html(response.allPrice + '元');
            }
          });

        } else {
          $(':checkbox').prop('checked', false);
          $.get('/changeAllCart?type=0', function(response) {
            if (response.success) {
              $('#allPrice').html(response.allPrice + '元');
            }
          });
        }
      });

      const _that = this;
      $('.cart_list input:checkbox').click(function() {
        _that.isCheckedAll();

        const goods_id = $(this).attr('goods_id');

        const color = $(this).attr('color');


        $.get('/changeOneCart?goods_id=' + goods_id + '&color=' + color, function(response) {
          if (response.success) {
            $('#allPrice').html(response.allPrice + '元');
          }
        });


      });
    },
    // 判断全选是否选择
    isCheckedAll() {
      const chknum = $('.cart_list input:checkbox').size();// checkbox总个数
      let chk = 0; // checkbox checked=true总个数
      $('.cart_list input:checkbox').each(function() {
        if ($(this).prop('checked') == true) {
          chk++;
        }
      });
      if (chknum == chk) { // 全选
        $('#checkAll').prop('checked', true);
      } else { // 不全选
        $('#checkAll').prop('checked', false);
      }

    },
    changeCartNum() {

      $('.decCart').click(function() {

        const goods_id = $(this).attr('goods_id');
        const color = $(this).attr('color');

        // alert(color);

        $.get('/decCart?goods_id=' + goods_id + '&color=' + color, function(response) {
          if (response.success) {
            $('#allPrice').html(response.allPrice + '元');
            $(this).siblings('.input_center').find('input')
              .val(response.num);
            const price = parseFloat($(this).parent().parent()
              .siblings('.price')
              .html());
            $(this).parent().parent()
              .siblings('.totalPrice')
              .html(response.num * price + '元');
          }
        }.bind(this)); // 注意this指向

      });

      $('.incCart').click(function() {
        const goods_id = $(this).attr('goods_id');
        const color = $(this).attr('color');
        $.get('/incCart?goods_id=' + goods_id + '&color=' + color, function(response) {
          if (response.success) {
            $('#allPrice').html(response.allPrice + '元');
            $(this).siblings('.input_center').find('input')
              .val(response.num);
            const price = parseFloat($(this).parent().parent()
              .siblings('.price')
              .html());
            $(this).parent().parent()
              .siblings('.totalPrice')
              .html(response.num * price + '元');
          }
        }.bind(this));
      });


    },


  };


  $(function() {
    app.init();
  });

})($);
