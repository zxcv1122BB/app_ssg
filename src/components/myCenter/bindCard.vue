<template>
  <div>
    <div id="container">
      <div id="main" class="bindCard">
        <header id="header">
          <a href="javascript:void(0)" class="goBack"  @click="routerBack"></a>
          <h1>{{$t('绑定银行卡')}}</h1>
        </header>
        <article id="article">
          <form action="">
            <section>
              <p class="huiTi">{{$t('为了您的账户安全')}}，{{$t('真实姓名需要与绑定银行卡一致')}}</p>
              <div id="name">
                <span>{{$t('姓名')}}: </span>
                <input type="text" placeholder="请输入姓名" id="fullName" v-model="fullName"/>
              </div>
              <div id="info">
                <p><span>{{$t('银行名称')}}: </span><input type="text" placeholder="请输入银行名称" id="bankName" v-model="bankName" /></p>
                <p><span>{{$t('银行卡号')}}: </span><input type="text" placeholder="请输入银行卡号" id="bankAccount" v-model="bankAccount" /></p>
                <p><span>{{$t('开户银行地址')}}: </span><input type="text" placeholder="请输入开户行地址" id="bankAddress" v-model="bankAddress" /></p>
              </div>
              <p id="prompt"></p>
              <p><input type="button" value="确认" class="btnSure" @click="updateBank(fullName,bankAccount,bankName,bankAddress)"/></p>
            </section>
          </form>
        </article>
      </div>
    </div>
  </div>

</template>

<script src="../../assets/js/myCenter/bindCard.js"></script>
<style  src="../../style/myCenter/centerGlobal.css" scoped></style>

