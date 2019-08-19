<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <!--编码格式-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <!--优先使用IE最高版本和chrome-->
    <meta name="viewport"
          content="width=device-width, target-densitydpi=high-dpi, initial-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"/>
    <!--支持移动端设备-->
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <!--是否启用 WebApp 全屏模式-->
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <!--设置状态栏的背景颜色-->
    <meta content="telephone=no" name="format-detection"/>
    <!--禁止数字自动识别为电话号码-->
    <meta name="keywords" content="彩票，福彩，体彩，竞技彩，彩票中奖，购买彩票，网上购彩，彩票"/>
    <!--页面关键词-->
    <meta name="description" content="彩票是最值得信赖的专业彩票网站,为彩民提供双色球,大乐透,3D,11选5,足彩,竞彩,北单等众多彩种的彩票代购、合买、开奖等服务，中奖福地，买彩票首选！"/>
    <!--页面描述-->
    <meta name="renderer" content="webkit">
    <!--使用360浏览器的极速模式-->
    <link rel="shortcut icon" href="../images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="../public/css/mui.min.css"/>
    <link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base.css"/>
    <link rel="stylesheet" type="text/css" href="css/customerService.css"/>
    <script type="text/javascript" src="../public/js/jquery.js"></script>
    <script type="text/javascript">
        var a = localStorage.sizes;
        var links = $('head>link#link_new');
        links.remove();
        if (a != undefined) {
            if (a == 1) {
                var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base.css"/>';
                $('head').append(new_link);
            } else if (a == 2) {
                var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base2.css"/>';
                $('head').append(new_link);
            } else if (a == 3) {
                var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base3.css"/>';
                $('head').append(new_link);
            }
        } else {
            var new_link = '<link rel="stylesheet" type="text/css" id="link_new" href="../public/css/base.css"/>';
            $('head').append(new_link);
            localStorage.sizes = 1;
        }
    </script>
    <title>{{$t('客服')}}</title>
</head>
<body>
<div id="app">
    <!--头部-->
    <header id="header">
        <h1>QQ{{$t('在线客服')}}</h1>
        <a class="goBack mui-action-back" href="javascript:void(0)">{{$t('返回')}}</a>
    </header>
    <img :src="imgSrc" width="100%" height="100%" >
</div>
<script type="text/javascript" src="../public/js/send_request.js"></script>
<script type="text/javascript" src="../public/js/security.js"></script>
<script type="text/javascript" src="../public/js/vue.min.js"></script>
<script type="text/javascript" src="../public/js/mui.min.js"></script>
<script type="text/javascript" src="js/qqCustomerService.js"></script>
</body>
</html>