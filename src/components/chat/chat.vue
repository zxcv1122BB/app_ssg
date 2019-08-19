<template>
	<div>
		<div id="container">
			<div id="main">
				<header id="header">
					<span class="goBack" href="javascript:void(0)" @click="routerBack" style="padding-left: 2.5rem;">{{$t('返回')}}</span>
					<h1 style="line-height: 1.5rem;">
						{{$t('聊天室')}}
						<span style="line-height: 1.38rem; font-size: .8rem;display: block;" v-if="id==1">{{$t('私聊')}}{{uName}}</span>
						<span style="line-height: 1.38rem;font-size: .8rem;display: block;" v-else>{{onlineNum}}{{$t('人在线')}}</span>
					</h1>
					<span style="position: absolute;top: .6rem;right: 2rem;" @click="togoChatUser()" v-if="id==0"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEEUlEQVRoQ92Zj1EVMRDG96tAqUCpQKxArECsQKlArECtQKxArUCoQKlAqECoQKxgnc/ZvNmXl7vLJjlGzQyOaC63v+z/PcgKS1Xvi8gjEXloP3zLN/4B4GKFVwpGHWrCvxCRlyJyMHPurYicichnAH/gRqwhIKpKgFMRoSYiiyCvAVxGHirt7QIxLXwRkcNOQY4BfOo5oxlEVWn/hMjN6EpEKNQZgGsvnKoeGTTN714m+CcAx60wTSCmia8ZxI2InACg/c8ue/5ERN5kG2lmNNHwagWhJni7aVELhwDoyNXLNETtee08r7mM/CVhEHs5Qbog0sOqSv+idtO6BrBffRu2sQXkh8sNv/j3qCZyIVWVZvbe/XvYxEIgBW10RxunGQaGB/Z7WCtRENozcwbXDQBGriGrcEmPI/klCvLTJb0PAGgSQ5ZFMp6f1jsAb2sPj4KoO7gpuswJpqrM9E9szzkAHxlnmapBCtHl6chaiVKqKnPIK5P4AkB1xdAMAqD62VrzUFWaUkqSdwMiIv+mRkz13kfWAPE+wjKfNVnVCpmHqnqQoVHLLspHxVWjls8j4aS1ELEYoXzps2oeyV82MrOz3kpR6grAXJe5cych0zL1b5USIsKbC1W9uRSFrL5urWUguVa6GiJV5c1TG6lNDmuDcoU1YjBsnp65m22CMQj6ha/ZQr6RZGgF4Ys5MPANEX9n2bLV3k45uKoygzMB+oFF2KS6QEwrNAnG/Z3e2/r184Iv8AKoSRabeeXcFTiaNJIENNMowaQt1FIKBH5YlzN2QTT7iJei4KxVmdht4kUQpMokpw5v1ogB0M6ry4gFQiZbZvMmoDCIzbM+VgzlOB7KhaJf5T6V8zEiUkOh3BQCmYg0SRA6N81kZzBXcHpmcOYj/qQ+3W8jBGEWZ2ShqGVtKKccuRlxisJm6DR6gy5gMAjQrFJn6IGq89OiRiamit0AE1piXsmBqmBmQWYgOFXsnqCXnD9rd9OWRZglkCGj0Wg8VlWaME3WB4bZ/mQSpDD945emo1ZfaIBhhPuePTc5uSmCWI7whzCUHtwVhAsE1AxDfVqMZvslOaZAfJNDx17NJ5Y0VfCZYou9A7LmfHdJ6Kn/V1UGFn5cTYta2Uq2JRCaVGozh853O0DyTw87E5YtkIJvDB+LdsD4UdEtgD1/Vg7ipyRNLWeroEvPFUa2W6V/DuI/4jR3a0tCtf6/qvrBx9aQewNiVS1B0mrqnVuFrHlOVSfnah7Ex+y/wskL9Vg+wdlLOcWD+El46NtEzW2O2pONbTfzZw/io0Jo7jpKyJpz/icQlimpmFzUSPdUo+Z2W/Zkn+c2luNNy08P/7qI5QpJH7k2cnoQTvwYuS5HfxtsufmZuivJyc8am57+N9Fb60JVIYTDAAAAAElFTkSuQmCC" style="width: 1.5rem;"/></span>
				</header>
				<article>
					<section>
						<div id="publicChat" class="publicChat tabsnav tabsnav-d1 " style="overflow-y: auto; height: 38rem; margin-bottom: 3rem;position: relative;">
							<div v-if='id==0' id="content" >
								<ul v-for="(item,index) in userMess" v-if="item.userType==0">
									<li class="history-hr-wrap">
										<div class="history-hr"></div>
										<div class="history-hr-text more-message ">{{item.mess}}</div>
									</li>
								</ul>
								<div v-for="(item,index) in userMess" class="item">
									<div class="chat-item notmine" v-if="item.userType==2">
										<div class="user-img ">
											<div class="uimg "><img src="../../assets/images/chat/m_ico3.gif"></div>
											<!--<div class="gimg "><img src=""></div>-->
										</div>
										<div class="chat-info">
											<div class="chat-info-1 ">
												<span class="chat-name ">{{item.uName.substr(0,1)+'***'+item.uName.substr(item.uName.length-1)}}</span>
												<span class="chat-time ">{{item.uTime}}</span>
											</div>
											<div class="chat-info-2 ">
												<div class="chat-msg">
													<span v-html="item.mess">{{item.mess}}</span>
													<!--<span class="privateChat" v-if="item.messType==1">(来自私聊)</span>-->
												</div>
											</div>
										</div>
									</div>
									<div class="chat-item  mine" v-else-if="item.userType==1">
										<div class="user-img">
											<div class="uimg">
												<div class="uimg "><img src="../../assets/images/chat/m_ico3.gif"></div>
											</div>
										</div>
										<div class="chat-info" style="position: relative;">
											<div class="chat-info-1">
												<span class="chat-name">{{item.uName.substr(0,1)+'***'+item.uName.substr(item.uName.length-1)}}</span>
												<span class="chat-time">{{item.uTime}}</span>
												<!--<img src="/room/images/ios.png">-->
											</div>
											<div class="chat-info-2">
												<div class="chat-msg">
													<!--<span  v-if="item.messType==1">@{{item.toUserName}}</span>-->
													<span  v-html="item.mess">{{item.mess}}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-else-if="id==1">
								<div v-for="(item,index) in userPrivate">
									<div class="chat-item notmine" v-if="item.userType==2">
										<div class="user-img ">
											<div class="uimg "><img src="../../assets/images/chat/m_ico3.gif"></div>
										</div>
										<div class="chat-info">
											<div class="chat-info-1 ">
												<span class="chat-name ">{{item.uName}}</span>
												<span class="chat-time ">{{item.uTime}}</span>
											</div>
											<div class="chat-info-2 ">
												<div class="chat-msg">
													<span v-html="item.mess">{{item.mess}}</span>
													<!--<span class="privateChat" v-if="item.messType==1">(来自私聊)</span>-->
												</div>
											</div>
										</div>
									</div>
									<div class="chat-item  mine" v-else-if="item.userType==1">
										<div class="user-img">
											<div class="uimg">
												<div class="uimg "><img src="../../assets/images/chat/m_ico3.gif"></div>
											</div>
										</div>
										<div class="chat-info" style="position: relative;">
											<div class="chat-info-1">
												<span class="chat-name">{{item.uName}}</span>
												<span class="chat-time">{{item.uTime}}</span>
												<!--<img src="/room/images/ios.png">-->
											</div>
											<div class="chat-info-2">
												<div class="chat-msg">
													<!--<span  v-if="item.messType==1">@{{item.toUserName}}</span>-->
													<span  v-html="item.mess">{{item.mess}}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="clearMes" @click="clearMes">
                <span class="btn">{{$t('清屏')}}</span>
							</div>
						</div>
					</section>
				</article>

				<!--<input id="filedata " type="file " size="20 " name="filedata " accept="image/jpeg, image/x-png, image/gif " class="input " style="display:none " onchange="uploadAvatar( 'filedata', '#messageEditor') ">-->

        <div id="face" @click='choice_face($event)'></div>
      </div>
		</div>
    <div id="footer" class="footer">
      <div class="am-cf">
        <div class="am-btn1 am-fl smile" @click='make_face()'><img src="../../assets/images/chat/m_ico1.png" width="28 " height="28 "></div>
        <div class="am-btn1 am-fr sendBtn" id="sendBtn " @click="sendMessage"><img src="../../assets/images/chat/m_ico2.png" width="28 " height="28 "></div>

        <div id="editor" class="editor">
          <div class="messageEditor" id="messageEditor" contenteditable="true"></div>
        </div>
      </div>
    </div>
	</div>

</template>
<script src="../../assets/js/chat/chat.js"></script>
<!--<script src="../../assets/js/chat/jquery.qqFace.js"></script>-->
<style src='../../style/chat/chat.css' scoped></style>
<!--<style src='../../style/chat/reset.css' scoped></style>-->
