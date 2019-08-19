<template>
	<div>
		<div id="container">
			<div id="setting">
				<header id="header">
					<a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
					<h1>{{$t('禁言设置')}}</h1>
				</header>
				<article id="article">
					<section id="section" style="display: block;">
						<div>
							<div style="color: #ACB3BE;padding-left: 1rem;border-bottom: 1px solid #E3E3E3;line-height: 3rem;">
									{{$t('选择禁言的时长')}}</div>
							<div class="mui-content">
								<div class="mui-collapse-content">
									<ul class="mui-table-view mui-table-view-radio">
										<li class="mui-table-view-cell mui-selected" id="ten">
											<a class="mui-navigate-right">10分钟</a>
										</li>
										<li class="mui-table-view-cell">
											<a class="mui-navigate-right">1小时</a>
										</li>
										<li class="mui-table-view-cell">
											<a class="mui-navigate-right">12小时</a>
										</li>
										<li class="mui-table-view-cell">
											<a class="mui-navigate-right">1天</a>
										</li>
										<li class="mui-table-view-cell">
											<a class="mui-navigate-right" id="custom">
												{{$t('自定义')}}{{chooseTime}}
											</a>
										</li>
									</ul>
									
								</div>
							</div>
							<div><button type="button" class="sureBtn" @click="sure(0)">{{$t('确认')}}</button></div>
						</div>
					</section>
				</article>
			</div>
		</div>
	</div>
</template>
<script src="../../assets/js/chat/chatSetting.js"></script>
<style src="../../style/common/shijian.css" scoped></style>
<style src='../../style/chat/chatSetting.css' scoped></style>