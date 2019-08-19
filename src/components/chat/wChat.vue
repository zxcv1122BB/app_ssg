<template>
	<div>
		<div id="container">
			<div id="main">
				<header id="header">
					<span class="goBack" href="javascript:void(0)" @click="routerBack"></span>
					<h1>{{$t('聊天列表')}}</h1>
					<span style="position: absolute;top: .6rem;right: 1.5rem;" @click="getMore()">
						<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAb0lEQVRIS2NkoBFgpJG5DEQb/P//fwOQIxgZGS8Q4xhSDD4ANdhh1ODRoICkgf///5MXFNB02o8nKYHTMQMDA750XAhL5/B0DDV4AoUGF2AYTCjRkx0UowaPFkLwNEBKUNCmoCeUHNHliXYxqQYDAPg4TBfyIdx8AAAAAElFTkSuQmCC' />
					</span>
					<ul id="mores" style="width: 41%;">
						<li @click="togoPrivate()">{{$t('私聊')}}<span v-if="userType==3">{{$t('会员')}}</span><span v-else>{{$t('管理员')}}</span></li>
						<!--<li @click="togoCommon()">发起群聊</li>-->
					</ul>
				</header>
				<article id="wChat">
					<ul id="OA_task_1" class="mui-table-view">
						<li style="padding: .8rem 1rem;" @click="togoChat(0,index)">
							<span style="float: left;"><img src="../../assets/images/chat/m_ico3.gif" style="width: 2.5rem;"/></span>
							<span style="float: left;padding-top: .5rem;padding-left: 5rem;">{{$t('公共聊天室')}}</span>
						</li>
						<li style="clear: both;border-bottom: 1px solid #E3E3E3;"></li>
						<li class="mui-table-view-cell" v-for="(item,index) in chatList"  @click="togoChat(item.chatName,index)">
							<div class="mui-slider-right mui-disabled" @click="delectChat(index)">
								<a class="mui-btn mui-btn-red">{{$t('删除')}}</a>
							</div>
							<div class="mui-slider-handle">
								<span style="float: left;"><img src="../../assets/images/chat/m_ico3.gif" style="width: 2.5rem;"/></span>
								<span style="float: left;padding-top: .5rem;padding-left: 5rem;">{{item.chatName}}</span>
								<span style="float: right;padding-top: .6rem;" v-if="item.id==0">
									<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABVUlEQVQ4T7WUsVXDMBRF33cVaDAduBIVKA0ZgQ0wE5BsYCYgmSBsEHsCkg0YwRU+VIhGpDRNoLI4EnaIQZZ9OMalJV3995/eJ/T8kYv3FLCwAM6VwkjvI0JKQHomxarpnBWYHbGx8jAnwLcdVEBOBSK+FsnP9Rrw2Wf++x4WRAg7diIebHBzkou82l8DPh6zJREuLbBZ+e/WshZzKSa/gFomPCwaKnMBgQITvhax6XMFyAKmyz74C1D3dCjF4RZYunnv6Ju7QgAecHUqxdJUmAVsCsDWn+qOViCAGZdiaoAOMzoDlcJq+CrC3oAAEi7F+H8kt5qi8GC0Ey6ajKuZUhrjejZtwXnjUpiYfr/Dvh+2y22lcFdOm8hSqjHDmmU9HD72zeHrNo3lejLYIGocDtsYfsnXYGsUlcILKUyr/O5e3mXAjnYHrAekOmJNCpzAjrJr2z4B0R+FFYVOEKwAAAAASUVORK5CYII='/>
								</span>
							</div>
						</li>
					</ul>
					<!--<ul @click="togoChat(item.chatName,index)" v-for="(item,index) in chatList">
							<li>
								<img src="../../assets/images/chat/m_ico3.gif">
							</li>
							<li>{{item.chatName}}</li>
							<li style="float: right;margin-top: .6rem;" v-if="item.id==0">
								<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABVUlEQVQ4T7WUsVXDMBRF33cVaDAduBIVKA0ZgQ0wE5BsYCYgmSBsEHsCkg0YwRU+VIhGpDRNoLI4EnaIQZZ9OMalJV3995/eJ/T8kYv3FLCwAM6VwkjvI0JKQHomxarpnBWYHbGx8jAnwLcdVEBOBSK+FsnP9Rrw2Wf++x4WRAg7diIebHBzkou82l8DPh6zJREuLbBZ+e/WshZzKSa/gFomPCwaKnMBgQITvhax6XMFyAKmyz74C1D3dCjF4RZYunnv6Ju7QgAecHUqxdJUmAVsCsDWn+qOViCAGZdiaoAOMzoDlcJq+CrC3oAAEi7F+H8kt5qi8GC0Ey6ajKuZUhrjejZtwXnjUpiYfr/Dvh+2y22lcFdOm8hSqjHDmmU9HD72zeHrNo3lejLYIGocDtsYfsnXYGsUlcILKUyr/O5e3mXAjnYHrAekOmJNCpzAjrJr2z4B0R+FFYVOEKwAAAAASUVORK5CYII='/>
							</li>
						</ul>-->
					<div class="background_gray">
						<div v-if="userType==3">
							<p>{{$t('请选择你要私聊的会员')}}</p>
							<div v-for="item in onlineUser" @click="privateChat(item.name)">
								<ul>
									<li><img src="../../assets/images/chat/m_ico3.gif" /></li>
									<li>{{item.name}}</li>
								</ul>
							</div>
							<!--加载更多-->
	        				<div class="has-more" style="text-align: center;line-height: 40px;color: #666;" @click="clickLoad">{{$t('点击加载')}}</div>
						</div>
						<div v-else-if="userType==1">
							<p>{{$t('请选择你要私聊的管理员')}}</p>
							<div v-for="item in onlineAdmin" @click="privateChat(item.name)">
								<ul>
									<li><img src="../../assets/images/chat/m_ico3.gif" /></li>
									<li>{{item.name}}</li>
								</ul>
							</div>
							<!--加载更多-->
	        				<div class="has-more" style="text-align: center;line-height: 40px;color: #666;" @click="clickLoad">{{$t('点击加载')}}</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/chat/wChat.js"></script>

<style src='../../style/chat/wChat.css' scoped></style>
