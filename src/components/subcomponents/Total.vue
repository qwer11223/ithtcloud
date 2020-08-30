<template>
	<div class="chd">
		<div class="bread" v-show="!flag">
			<div class="break" @click="go(-1)">返回上级 </div>|
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in list" :key="index">{{item}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<span class="ctxtl" v-show="flag">全部文件</span>
		<span class="ctxtr">已全部加载，共{{filetotal}}个</span>
	</div>
</template>

<script>
export default {
	props: ['filetotal'],
	data() {
		return {
			flag: true,
			list: []
		}
	},
	methods: {
		go(step) {
			this.$router.go(step)
		}
	}
}
</script>

<style lang="scss" scoped>
.chd {
	display: flex;
	justify-content: space-between;
	padding: 0 15px;
	font-size: 14px;
	margin-bottom: 10px;

	.bread {
		display: flex;

		.break{
			transition: .3s;
			font-weight: bold;
			color: rgb(61, 61, 61);
			cursor: pointer;
			margin-right: 5px;

			&:hover{
				color: rgb(33, 164, 216);
			}
		}

		.el-breadcrumb {
			display: flex;
			align-items: center;
		}
	}
}
</style>