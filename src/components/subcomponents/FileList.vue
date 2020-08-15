<template>
	<!--文件列表-->
	<div class="frame-content">
		<!--提示-->
		<div class="chd">
			<span class="ctxtl">全部文件</span>
			<span class="ctxtr">已全部加载，共{{filetotal}}个</span>
		</div>

		<div class="chdun">
			<ul class="type">
				<li data-key="name" class="tname">
					<el-checkbox
						:indeterminate="isIndeterminate"
						v-model="checkAll"
						@change="handleCheckAllChange"
					>文件名</el-checkbox>
				</li>
				<li data-key="type" class="ttype">
					<span>类型</span>
				</li>
				<li data-key="size" class="tsize">
					<span>大小</span>
				</li>
				<li data-key="date" class="tdate">
					<span>修改日期</span>
				</li>
			</ul>
		</div>

		<div class="chlist">
			<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				<dl>
					<dd v-for="item in search($store.state.search_keywords)" :key="item.name" class="listrow">
						<div class="fname">
							<el-checkbox :label="item">{{item.name}}</el-checkbox>
						</div>
						<div class="ftype">{{item.type}}</div>
						<div class="fsize">{{item.size}}k</div>
						<div class="fdate">{{item.modtime}}</div>
					</dd>
				</dl>
			</el-checkbox-group>
		</div>
	</div>
</template>

<script>
var cityOptions = []
export default {
	mounted() {
		this.$axios.get('cloud_server/index.php').then(res => {
			this.cities = res.data
		})
	},
	data() {
		return {
			checkAll: false,
			checkedCities: [],
			cities: cityOptions,
			isIndeterminate: false
		}
	},
	methods: {
		handleCheckAllChange(val) {
			this.checkedCities = val ? this.cities : []
			this.isIndeterminate = false
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.cities.length
			this.isIndeterminate =
				checkedCount > 0 && checkedCount < this.cities.length
		},
		search: function(keyword) {
			return this.cities.filter(item => {
				if (item.name.includes(keyword)) return item
			})
		}
	},
	computed: {
		filetotal: function() {
			return this.cities.length
		}
	},
	watch: {
		checkedCities: function(n) {
			this.$store.commit('checked', n)
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
}

.chdun {
	.type {
		list-style-type: none;
		overflow: hidden;
		font-size: 13px;
		border-bottom: 1px solid rgb(235, 235, 235);
		color: rgb(119, 119, 119);
		/* width: 100%; */

		.tname {
			width: 50%;
		}

		.ttype {
			width: 10%;
		}

		.tsize {
			width: 15%;
		}

		.tdate {
			width: 25%;
		}
	}

	li {
		/* display: block; */
		height: 30px;
		line-height: 30px;
		padding: 0 15px;
		float: left;
	}

	li:hover {
		background-color: rgb(223, 236, 248);
	}
}

.chlist {
	.el-checkbox-group {
		font-size: 12px;
	}

	.listrow {
		display: flex;
		align-items: center;
		font-weight: bold;
		height: 50px;
		border-bottom: 1px solid #ccc;

		&:hover {
			background-color: rgba(170, 170, 170, 0.281);
		}

		.fname {
			padding-left: 15px;
			width: 51%;
		}

		.ftype {
			color: #666;
			width: 10%;
		}

		.fsize {
			width: 15%;
		}

		.fdate {
			width: 24%;
		}
	}
}
</style>