$(function(){
   app.init();
});

let app = {
	init:function() {
		this.toggleAside();
		this.deleteConfirm();
	},
	toggleAside:function() {
		$('.aside h4').click(function() {
			if($(this).find('span').hasClass('.nav_close')){
				$(this).find('span').removeClass('nav_close').addClass('nav_open');
			} else {
				$(this).find('span').removeClass('nav_open').addClass('nav_close');
			}
			$(this).siblings('ul').slideToggle();
		});

	},
	changeStatus:function(el,model,attr,id) {
		$.get('/admin/changeStatus',{model,attr,id},function(res) {
			if(res.code == 200) {
				if(el.src.indexOf('yes')!=-1) {
					el.src = '/public/admin/images/no.gif';
				} else {
					el.src = '/public/admin/images/yes.gif';
				}
			}
		})
	},
	deleteConfirm:function() {
		$('.delete').click(function(){
			let flag = confirm('你确定要删除吗');
			return flag;
		})
	},
	editNum:function(el,model,attr,id) {
		let value = $(el).html()
		let input = $('<input value=""/>');
		$(el).html(input);
		$(input).click(function() {
			return false;
		});
		//让input自动获取焦点
		$(input).trigger('focus').val(value);
		$(input).blur(function(){
			$(el).html($(this).val());
			$.get('/admin/editNumber',{model,attr,id,num:value},function(res){
				if(res.code == 200) {
					$(input).val(val)
				} else {

				}
			})

		});

	},

}

