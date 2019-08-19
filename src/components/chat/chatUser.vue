<template>
	<div>
		<div id="container">
			<div id="main">
				<header id="header">
					<span class="goBack" href="javascript:void(0)" @click="routerBack"></span>
					<h1>
						{{$t('聊天室成员')}}
					</h1>
				</header>
				<article id="chatUser">
					<div id="search">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABxElEQVQ4T6WVwW3bQBBFZ1agrlYHliuwVIGtCoJ0EFfg6KAd6GafBKwOSgeJO2AqiDqwXEHYQeybIGH1jS+QBr0iY9meA0Fyl29m/s4MVRKbzWZ959y1qg4A9FW1APAoIrmZ3aX702etvwgh/BCRa74D8KCqBNH6InIKoHDOXU0mk2Ub+AUYQshF5IuI/I4xfp9Op0X9o/l8fgngF8EicuW95/2B7YG1yFo3ct9isehtNpulqp7GGIepU+5RatbpdP4CuDOzb29pVEILVb333o8ONKyiizGeNXlscvC/bzSEsATQM7PBW9FV66WefwB8NTNq/2IEUvzCe395LJBpb7fbfwBuzewmBe5L4D3AEAKzuW8D5gDOzezs2AhDCDy8n6o6SmuSKbcutjkodR+YWa+xU6gjAHS73eF4PK66o5FXBdCU7r4OealOTURWWZaN2qAlbCEijGzovV81Rlh2yz51EXlki6lqnmXZw3q97jnnLlSV6/VKYCajFJoOB54eB8RF6hnAE9ecc8vdbper6gmdp9BXwApStiOHAacMbVUvYJYNAPb0AbQReEz5tEE/DCx1P4j0U8AUygH8aWAF5S+C1fEMMrEQh277ZCIAAAAASUVORK5CYII=" />
						<input type="search" placeholder="搜索" v-model="searchUser" />
						<a href="javascript:void(0)">{{$t('取消')}}</a>
					</div>
					<div v-if="onlineAdmin.length!=0">
						<p>
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjZJREFUeNrsV81xgkAURsaZXEkHnHPCCiSTBrCCQAViBWoFmgrUCtQCMtJByCVXKYFrbnkv863zXFmBxeSSvJkdkH37fr73tzrOX6ee7cGP1zufHj5+Fg9Pn4WNHLeD8TGtA1ZsK6SLAZnh/WdDQNCH9JjS8mgF+JzTKmnNKRTZbyAQCuUO3kMbQf0WXitPOdkSWiuNbYK9E38TNHpXlHqAOtW2FNxhRU54GjJMS4SmbIvA1gBrcCUsVZTizGMtAvA6QH2vbtxzEvSL7MIAUsxKFzWJlIs4+whPKOCfi73FFaQUf8LNqwevj4ifiVjwQMaRzs1ghIMYzzQk30SnrCKWNXBhrVcD38aURFUE3k0N23eSswFRhWW7BnqGhncT7SBbUuRWeD9CPG9Nc8g+Q6FfAV+GOBYihkMLhfIMZ38OuRet2AT3i6xxjN82ozo0yDoLCxuw1w7HQGKpWqsYv21GtfR+KWUL2ru0uUaNK3rW8kHRuAkK4BkbZEjZOet2RZeScKdAIRd7Hkq2jmRZJyL2qRaW5DSOwTQRm1N0RwcIrVXZ0PfoivexKOs1zqpOO5WTUxmmz4KViB8zPHJTAaxbtNcSe4HwtMBS33h/xK0WXfEgWjMblhjHsWaESkLfsvb182fKjfcBrc/frBHJedHkQhJhJHsdFZdIxl3rSymuVoeOBoxMyhvdismIY4ccKEn5fddL6Qb5wF684zJx8U9I3KYCzIFIlK89sWAItzrr/FMNfQkwAJi12pjgiYaZAAAAAElFTkSuQmCC" /> 在线管理/{{$t('客服')}}
						</p>
						<ul v-for="item in onlineAdmin">
							<li><img src="../../assets/images/chat/m_ico3.gif" /></li>
							<li>{{item.name}}</li>
						</ul>
					</div>
					<div v-if="onlineUser.length!=0">
						<p style="position: relative;">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADiUlEQVRYR+1WQU7bQBR93zRVIY4gUnGWDTtCF6QnaDhBwwkKJwBOUHqCwgmAEzQ9QdMTFBaN2ZEuCZWSKk6oSPGvxvbY47GdpBAkKtUrmMz8efP+++9/wiP56JHgwH8geiYePyNOp3IAYH3GGjo1LXsvLWYqI4MflTq79HHGILxwZPBm/rndmCo1/U6lSaDXweYzZiQOAqgS4Y0akBmfAJwmLiHUI3a5aVr2xkQgTudlFeCvciMDvYLVKsYu7JaXnNHCBQFLweUQoMReMzdcoWK7p+7vdyo9Ai3KtbmcuzJfPG+rexKpcTqVY4DeehcQ1/wA7rZpnR/LgyFjzN/zT6+rYn1wM38KohdA/MVOZ3ULMI4Y/BNMTZ9FPjEteysTCHfLS4PRQldsYHI3iKkO0I4a3Bcx7YjABKNmWt+8VAgmGa5I6SLAh6Zl74r1KM18yMQNYuOzWM/nhkWVuRgj/cu1fSK8A3BmWq3qdXe1fDsyLsRBQad7S9VIxHGWfDD+66Uo2TXaMs0yHc5lpS2YY8b7Qqm1L1mJAwlzGV3Sv1xrBHQ2GVQVukijVgYMUwv0CHwKUE2kuVBqCcFGYJnbZsleSQBRXzNHbk1ucGGIQCFyIcgn5HpBs77fbDR8wP5HhH0DblP+f8tG8Hf04JARp7Mmcj1rAxuHFwz+UrBs79EKEF+EY0/O/MdI1CGQoGIEZeu6H+jVVFg+D2lOw9a/Wq2lVYeII/1HFkSqWFUwwiHzueGGLDEpwnFC1QWr7g1ii9IVvnOWzw1rmeWr+wEzNwole9Pzg4xX6oxksSf9RPefVEaiF8Vs/ti0WtseyAwPUMHoXuQ/LnBrzQTVc5nziFrOIN4zl+2DcE3zADWgBCvbgnNV2QXTB39P0gTHMhIyowXJ5341nNF8W9h4WjuX44Og38xdlwejZ3XptPIxWYU3cUKLROpV+yvA3ZVNUbqlDK648AlgHERdPNnkdEATgXhCDeYTUdaGwduy36jtXO1Lgi3XpSM5JuiA01iZCohe1oERrqtdVnZlUZqieWeV6Z1TIw/6ZuTrI1xThiZ9+JE60YekewPRPSYK6HqlHYrSoyM+q2RdPlX5Zh1ODtbcBEiMkmHDFEPVpDZwJ7Hqh2Iek0Cc7RXjmJlKrGkBFHEqP0fddJp03Cs1MRcNrNtfm+wVD8KId7WopJsFb7qfxiseDMjf0v9PAPkDqNUYQfkeoDsAAAAASUVORK5CYII=" /> 会员
							<span  id="allUser">
									<div class="mui-switch mui-active" @click="chatSetting(0,0)"  v-if="status==2&&userType==3">
									  <div class="mui-switch-handle"></div>
									</div>
									<div class="mui-switch" @click="chatSetting(2,0)"  v-else-if="userType==3">
									  <div class="mui-switch-handle"></div>
									</div>
							</span>
						</p>
						<ul v-for="(item,index) in onlineUser">
							<li><img src="../../assets/images/chat/m_ico3.gif" /></li>
							<li>{{item.name}}</li>
							<span v-if="userType==3" id="user">
								<div class="mui-switch mui-active" v-if="item.ForbiddentFlag==1"   @click="chatSetting(1,item,index)">
								  <div class="mui-switch-handle"></div>
								</div>
								<div class="mui-switch" v-else   @click="chatSetting(2,item,index)">
								  <div class="mui-switch-handle"></div>
								</div>
							</span>
							<!--<span v-if="item.ForbiddentFlag==1">已禁言</span>-->
						</ul>
						<!--加载更多-->
	        	<div class="has-more" style="text-align: center;line-height: 40px;color: #666;" @click="clickLoad">{{$t('点击加载')}}</div>
					</div>
					<div v-if="onlineFree.length!=0">
						<p>
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQOSURBVHjajJVBbBtVEIb/9b639q7fZt3ESY3j2lIhVXFC2lAaJBqknKnElQM9ICEkDqBy5cKVC0ipKKceClIvleDKAQ6kQkhpEe0hJBFNgsImcQxeq6y9fi/79jnLIXGUtk7suexoRjPfzOx7b7Q4jnGS/PDw70+Xtr2XATAA2oE5BhCMj2ZX3nq19PlJ8QQ9ZCHITcLJXQLgVNcfJAAg4+T2UtmivxaGtFd8T8Bnb+glzvnwjzspu7oOLePkMD1eiq8W2wZAS73iteNGpJT6inP+CoAxANnmXpJen481ALgxq8V2IowAeABWLctaJIR83HcH1Wr1DoBJQki+vqsxAGSxldLKg/v+pGpqXCniKzr0wgBNep43COBOLpe7diJAKTXned64lPKsZVkj6XTarLRp4rs/29r+fwUmT2tIp9MAkHAAA0CGEJLknKer1epP2Wx2iRDyyXMApdRcpVJ5E0ARgA2A/l5tJ+6uAWMsQn4whXOZBMYGIgBAFEWglGoAdKWUBWB0Z2dnQEo5mM/n5zqQQ0ClUilLKYsAMoZh6PVdTbu7pmOMRXj/NYa2CEApRRTtAzo6pRQAEgAM27YzUkpUKpVysVhEx4FGo3FbSlkSQjAAupRSW2zZeOelNt4bBxIqPFr1U3oH6Pu+JoTQATDf90vb/4W3DwHfLGH0cYM6AKgQQgOAc5kELuX0w4SU0mN1y7KglAIATQhBfw5Kzvcr4ejRERkLQU5fo6dwObUJ88DYSdKP2LaNWjPEb7tnsBpQfYxFycMOLoQPW0/Cvdb9J+nw5s75NoB4JPbAOT8cB+ccnufB8/btndFwztFqtQAgvrlzvn3/SVoCaF0IHzYOO7gyM7NIHzzAr/Xki7VoIHtvpcauXmaUc57oQI5KF9vevZV/o9EoDoZpw7uSCf+anp7547mb7Lru11tbW2eXl5fPzM7OFhhjdqfLE2QvCAIxPz+/WS6XVwuFglssFj868akQQnzw6NGjd0dGRl7PZDJJpZR2XHYppdza2tqYmpq6ZZrmF8/6u1ZnmuYt27Z/EUI0D07HcRJLKdumaW53S44e7V90HMfo9VgyxnRCyBml1Id9A1zX/dY0zbJlWamDMUBKiW46IUR3HOfUxsbG230BXNf9Ukp5kTE2opSiUkrtyLzxrM45TxiGkWaMnXVd90ZPQL1ezzPGhqWUKSlloo87pkkpKYCBer1+uidACGHUajX9IPCpak/61mo1veH7tJ+Fw5vNZkspZRNCjM6i75ZUCAEhRNxsNiWAFjUM3hMwMTHxeGFh4VQQBGHSMBwAlBrdD1MkJUIpozAM/aGhofXp6enHfe9kz/NubG5unm74frLRbD7nTyaTYIyhUCiE+Xz+H0LI9W55/h8AB50O3eybPDQAAAAASUVORK5CYII=" /> 游客
						</p>
						<ul v-for="item in onlineFree">
							<li><img src="../../assets/images/chat/m_ico3.gif" /></li>
							<li>{{item.name}}</li>
						</ul>
					</div>
					<div class="background_gray">
						<div v-for="item in allSearch"   @click="chatSetting(item.name,item.ForbiddentFlag,item.userType)">
							<ul>
								<li><img src="../../assets/images/chat/m_ico3.gif" /></li>
								<li>{{item.name}}</li>
								<li>{{item.userType==0?'试玩用户':(item.userType==1?'会员':'管理员')}}</li>
							</ul>
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script src="../../assets/js/chat/chatUser.js"></script>

<style src='../../style/chat/chatUser.css' scoped></style>