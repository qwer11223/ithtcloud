<template>
	<div>
		<total></total>
		<div class="emptytip">
			<div class="emptybox">
				<div class="img"></div>
				<p>暂无文件，上传一个吧~</p>
			</div>
		</div>
	</div>
</template>

<script>
import total from '@/components/subcomponents/Total.vue'

export default {
	components: {
		total
	}
}
</script>

<style lang="scss" scoped>
.emptytip {
	display: flex;
	justify-content: center;

	.emptybox {
		margin-top: 150px;
		.img {
			width: 200px;
			height: 130px;
			background: url(../../public/images/emptyfile.png) center center
				no-repeat;
			background-size: cover;
		}

		p {
			text-align: center;
			padding-top: 10px;
			color: #999;
		}
	}
}
</style>