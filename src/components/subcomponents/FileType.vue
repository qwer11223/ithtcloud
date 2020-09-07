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
			<div class="emptytip" v-show="cities==''?true:false">
				<div class="emptybox">
					<div class="img"></div>
					<p>暂无文件，上传一个吧~</p>
				</div>
			</div>

			<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				<dl>
					<dd v-for="item in search($store.state.search_keywords)" :key="item.path" class="listrow">
						<div class="fname">
							<el-checkbox :label="item">
								<img
									class="typeimg"
									:src="require('../../../public/images/type/'+matchType(item.type)+'.png')"
									alt
								/>
								<span>{{item.name}}</span>
							</el-checkbox>
						</div>
						<div class="ftype">{{item.type | formatType}}</div>
						<div class="fsize">{{item.size | formatSize(item)}}</div>
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
	props: ['path'],
	mounted() {
		this.getList(this.path)
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
			this.$store.state.loading = true
			this.$axios.get('cloud_server/' + path).then(res => {
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
		matchType(type) {
			var music = ['mp3', 'flac']
			var picture = ['png', 'jpg']
			var video = ['mp4', 'rm', 'rmvb']
			var iso = ['iso', 'dmg']
			var zip = ['zip', '7z', 'rar']
			var match = [
				'cad',
				'docx',
				'exe',
				'html',
				'txt',
				'pptx',
				'xlsx',
				'pdf',
				'psd'
			]
			if (match.includes(type)) return type
			if (music.includes(type)) return 'music'
			if (picture.includes(type)) return 'picture'
			if (video.includes(type)) return 'video'
			if (iso.includes(type)) return 'iso'
			if (zip.includes(type)) return 'zip'
			return 'unknow'
		}
	},
	filters: {
		formatType: function(str) {
			if (str === '-') return '文件夹'
			else return str
		},
		formatSize(str, arg) {
			if (arg.type === '-') return '-'
			else {
				let size = parseInt(str)
				if (size > 1024) {
					return parseInt(size / 1024) + 'Mb'
				} else return size + 'k'
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

	.emptytip {
		display: flex;
		justify-content: center;

		.emptybox {
			margin-top: 150px;
			.img {
				width: 200px;
				height: 130px;
				background: url(../../../public/images/emptyfile.png) center
					center no-repeat;
				background-size: cover;
			}

			p {
				text-align: center;
				padding-top: 10px;
				color: #999;
			}
		}
	}

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

.el-checkbox {
	display: flex;
	align-items: center;

	.typeimg {
		width: 32px;
		height: 35px;
		margin: 0 10px 0 5px;
	}
}
</style>

<style lang="scss">
.el-checkbox__label {
	display: flex !important;
	align-items: center;
}
</style>