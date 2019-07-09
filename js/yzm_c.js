// JavaScript Document

$(function(){
	//倒计时函数
	function runcount(t){
		 if(t>0){
			 document.getElementById('daojishi').innerHTML=t+'S后重新获取';
			 t--;
			 setTimeout(function(){
			 runcount(t)
		 },1000)
		 $('#getyzm').hide()
		 $('#daojishi').show();
		 }else{
		   $('#getyzm').show();
		   $('#daojishi').hide();
		 }
	 }
	  $(".m3_r .st").click(function(){
	  	if(Cookies.get("phone")){
	  		$(".mask,.p_frame").fadeIn()
	  	}else{
	  		 $(".mask,.form").fadeIn()
	  	}
    	});
      $(".p_close").click(function(){
        $(".mask,.p_frame").hide()
    	});
	 // 利用注册登录功能实现
 	 $(".zgm2 a").click(function(){
 	 	if(Cookies.get("phone")){
 	 	 $(this).attr({"href":"http://bjoffcn66.mikecrm.com/oKXTj3h","target":"_blank"})
 	 	}else{
 	 		  $(".mask,.form").fadeIn()
 	 	}
	    });
 	  $(".zgm4 a").click(function(){
 	 	if(Cookies.get("phone")){
 	 	 $(this).attr({"href":"http://bj.offcn.com/zg/2020gkmokao/","target":"_blank"})
 	 	}else{
 	 		 $(".mask,.form").fadeIn()
 	 		}
	    });
    $(".form_close").click(function(){
        $(".mask,.form").hide()
    });




	$('#dosubmit').click(function(){
		var info = {};
		info.name=$('#name').val()
		info.tel=$('#tel').val()
		info.fb=$('#xz_fb').val()
		info.yzm=$('#yzm').val()
		if(info.tel == '') { //验证手机号是否为空
			alert('请填写手机号');
			return false;
		}
		var reg = /^0?1[3456789]\d{9}$/; //手机号正则
		if(!reg.test(info.tel)) { //验证手机号是否正确
			alert('请填写正确的手机号!');
			return false;
		}
		$.ajax({
			url:"http://bj.offcn.com/index.php?m=formguide&c=forms&a=show&formid=323&action=jsonp&siteid=1&verify=true",
			data: {info},
			dataType:"jsonp",
			type:"GET",
			success:function(json){
				if(json.status == 1){
					Cookies.set("phone",info.tel)
					// crm调用导入crm
					$.get("http://dc.offcn.com:8100/a.gif", {sid:'10f4c25efa7dd756b8f8f175a19ba1d1', mobile:info.tel, name:info.name})
					alert("提交成功");
					$('#getyzm').show();
					$('#daojishi').hide();
					 $(".form").hide();
                     $(".mask").hide()
				}else if(json.status==-2){
					alert("验证码错误");
					$('#getyzm').show();
					$('#daojishi').hide();
				}else if(json.status==-1){
					alert("已注册");
					Cookies.set("phone",info.tel)
					$('#getyzm').show();
					$('#daojishi').hide();
					 $(".form").hide();
                     $(".mask").hide()
				}
			}
		})
	});

	// 发送验证码
	$("#getyzm").click(function(event) {
		var phone = $("#tel").val();
			$.ajax({
			  url: 'http://bj.offcn.com/index.php?m=formguide&c=forms&a=send_sms&formid=323&siteid=1',
			  type: 'GET',
			  dataType: 'jsonp',
			  data: {phone: phone},
			  success: function(json) {
				if (json.status == 1) {
					// $('#daojishi').css('display','inline-block')
					// $('#getyzm').css('display','none')
					$('#daojishi').show()
					$('#getyzm').hide()
					runcount(60)
					alert('发送成功')
				}  else {
					alert(json.msg);

				}
			}
		})
	})
})
