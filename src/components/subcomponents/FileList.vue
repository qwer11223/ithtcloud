<template>
	<!--文件列表-->
	<div class="frame-content">
		<!--提示-->
		<total :filetotal="filetotal" ref="total"></total>

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
					<dd
						v-for="item in search($store.state.search_keywords)"
						:key="item.name"
						class="listrow"
						@dblclick="ch(item)"
					>
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
import total from '@/components/subcomponents/Total.vue'

var cityOptions = []
export default {
	mounted() {
		this.getList('suadmin')
	},
	data() {
		return {
			checkAll: false,
			checkedCities: [],
			cities: cityOptions,
			isIndeterminate: false,
			path_arg: ''
		}
	},
	methods: {
		getList(path) {
			// 挂载页面时自动取回目录文件
			//console.log('cloud_server/index.php?path='+path)
			this.$store.state.loading = true
			this.$axios.get('cloud_server/index.php?path=' + path).then(res => {
				this.cities = res.data
				this.$store.state.loading = false
			})
		},
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
		},
		ch: function(item) {
			if (item.type == '-') {
				if (this.path_arg === '/') this.path_arg = ''
				if (this.path_arg === '') this.path_arg = item.name
				else this.path_arg += '&' + item.name
				this.$router.push('/filecontent/' + this.path_arg)
				//this.cities = item.children
				this.$refs.total.flag = false
			}
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
		},

		'$route.params.path': function(newValue, oldValue) {
			var newValue = newValue
			if (newValue == 'root') {
				newValue = '/'
				this.$refs.total.flag = true
			}
			this.path_arg = newValue
			this.$refs.total.list = newValue.split('&')
			this.getList('suadmin/' + newValue.replace(/\&/g, '/'))
		}
	},
	components: {
		total
	}
}
</script>

<style lang="scss" scoped>
.chdun {
	.type {
		list-style-type: none;
		overflow: hidden;
		font-size: 13px;
		border-bottom: 1px solid #f2f6fd;
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
	user-select: none;

	.el-checkbox-group {
		font-size: 12px;
	}

	.listrow {
		display: flex;
		align-items: center;
		font-weight: bold;
		height: 50px;
		border-bottom: 1px solid #f2f6fd;

		&:hover {
			background-color: #f4fbff;
			border-top: 1px solid #cbedff;
			border-bottom: 1px solid #cbedff;
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