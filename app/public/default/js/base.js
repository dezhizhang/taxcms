(function($) {

  const app = {
    init() {

      this.initSwiper();

      this.initNavSlide();

      this.initContentTabs();

      this.initColorSelect();
    },
    initSwiper() {
      new Swiper('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: true,

      });
    },
    initNavSlide() {
      $('#nav_list>li').hover(function() {

        $(this).find('.children-list').show();
      }, function() {
        $(this).find('.children-list').hide();
      });

    },
    initContentTabs() {

      $('.detail_info .detail_info_item:first').addClass('active');
      $('.detail_list li:first').addClass('active');
      $('.detail_list li').click(function() {
        const index = $(this).index();
        $(this).addClass('active').siblings()
          .removeClass('active');

        $('.detail_info .detail_info_item').removeClass('active').eq(index)
          .addClass('active');

      });
    },
    initColorSelect() {


      const that = this;
      $('#color_list .banben').click(function() {


        $(this).addClass('active').siblings()
          .removeClass('active');

        // 获取当前商品的id
        const goods_id = $(this).attr('goods_id');

        // 当前的颜色值
        const color_id = $(this).attr('color_id');

        $.get('/getImagelist?goods_id=' + goods_id + '&color_id=' + color_id, function(response) {


          if (response.success) {

            console.log(response);
            const result = response.result;
            let str = '';
            for (let i = 0; i < result.length; i++) {
              str += '<div class="swiper-slide"><img src="' + result[i].img_url + '"> </div>';
            }
            $('#swiper-wrapper').html(str);

            // 改变轮播图以后重新初始化轮播图
            that.initSwiper();

          }

        });


      });
    },
  };

  $(function() {


    app.init();
  });


})($);
