<template>
  <div>
    <div id="container">
      <div id="app" style="padding-bottom: 30px;;">
    <!--头部-->
    <!--<header id="header">
        <h1>{{$t('测试')}}</h1>
        <a class="goBack mui-action-back" href="javascript:void(0)">{{$t('返回')}}</a>
    </header>-->
    <p>{{$t('测试')}}</p>
    .<p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <p>{{$t('测试')}}</p>
    <div style="position: fixed;bottom: 0;">
    	<input width="80%" v-model="msg" />
    	<button @click="add">{{$t('发送')}}</button>
    </div>
</div>
    </div>
  </div>
</template>
