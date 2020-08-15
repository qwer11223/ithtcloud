<template>
	<div class="app">
		<!-- header -->
		<el-row>
			<el-col :span="24">
				<div class="header">
					<div class="logo">
						<i class="fa fa-mixcloud" aria-hidden="true" style="margin-right:15px"></i>Cloud
					</div>

					<div class="user">
						<div class="head"></div>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row class="content">
			<!-- aside -->
			<el-col :span="3" class="aside">
				<div class="as-menu">
					<el-menu default-active="2" class="el-menu-vertical-demo">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>全部文件</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">图片</el-menu-item>
								<el-menu-item index="1-3">文档</el-menu-item>
								<el-menu-item index="1-4">视频</el-menu-item>
								<el-menu-item index="1-5">音乐</el-menu-item>
								<el-menu-item index="1-6">其他</el-menu-item>
							</el-menu-item-group>
						</el-submenu>

						<el-menu-item index="2">
							<i class="el-icon-menu"></i>
							<span slot="title">我的分享</span>
						</el-menu-item>

						<el-menu-item index="3">
							<i class="el-icon-setting"></i>
							<span slot="title">回收站</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">多设备同步</span>
						</el-menu-item>
					</el-menu>
				</div>

				<div class="as-storage">
					<el-progress :text-inside="true" :stroke-width="18" :percentage="storage"></el-progress>
					<span id="statistics">{{sused}}GB/{{smax}}GB</span>
				</div>
			</el-col>

			<!-- main -->
			<el-col :span="21" class="main">
				<div class="main-func">
					<div class="f-btn">
						<el-button type="primary" @click="drawer = true">
							<i class="fa fa-upload" aria-hidden="true"></i>上传文件
						</el-button>
						<el-button type="primary" plain>新建文件夹</el-button>
						<el-button
							type="primary"
							plain
							v-show="this.$store.state.checkedCities == ''?false:true"
							@click="download"
						>下载</el-button>
					</div>

					<div class="search">
						<input type="text" placeholder="搜索您的文件" v-model="keywords" />
						<i class="fa fa-search" aria-hidden="true"></i>
					</div>
				</div>

				<div class="main-view">
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>

		<!-- 上传面板 -->
		<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
			<el-upload
				class="upload-demo"
				ref="upload"
				action="http://192.168.0.184/cloud_server/upload.php"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:file-list="fileList"
				:auto-upload="false"
				:drag="true"
				multiple
			>
				<el-button slot="trigger" size="small" type="primary" class="ch-btn">选取文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" class="up-btn">上传到服务器</el-button>
			</el-upload>
		</el-drawer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			smax: 150,
			sused: 10,
			storage: 50,
			keywords: '',

			//上传面板属性
			fileList: []
		}
	},
	methods: {
		download() {
			let temparr = []
			this.$store.state.checkedCities.forEach(e => {
				temparr.push(e.basename)
			})
			this.$axios
				.post(
					'cloud_server/index.php',
					{
						file: temparr
					},
					{ responseType: 'blob' }
				)
				.then(res => {
					let filename = res.headers['content-disposition'].split(
						'='
					)[1]
					let link = document.createElement('a')
					link.href = window.URL.createObjectURL(new Blob([res.data]))
					link.download = filename
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
				})
		},

		//上传面板方法
		submitUpload() {
			console.log(this.fileList)
			console.log(this.$refs)
			this.$refs.upload.submit()
		},
		handleRemove(file, fileList) {
			console.log(file, fileList)
		},
		handlePreview(file) {
			console.log(file)
		}
	},
	mounted() {
		document.querySelector('.el-submenu__title').click()
	},
	watch: {
		keywords: function(n) {
			this.$store.commit('search', n)
		}
	}
}
</script>

<style lang="scss" scoped>
$t-height: 70px;
$b-height: calc(100% - 70px);
$func-height: 70px;

.header {
	background: rgb(43, 43, 43);
	height: $t-height;

	.logo {
		display: inline-block;
		width: 200px;
		height: inherit;
		line-height: 70px;
		color: white;
		font-size: 2.5em;
		margin: 0 16px;
	}

	.user {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 50px;

		.head {
			width: 45px;
			height: 45px;
			border-radius: 50%;
			border: 2px solid rgb(255, 255, 255);
			background: url(../../public/images/default.jpg);
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
}

.content {
	height: $b-height;
}

.aside {
	position: relative;
	//background: #666;
	height: 100%;

	.as-storage {
		position: absolute;
		width: 100%;
		bottom: 0;
		background-color: rgb(66, 66, 66);
		padding: 10px;
		text-align: right;

		#statistics {
			display: block;
			font-size: 14px;
			margin-top: 10px;
		}
	}
}
.main {
	background: rgb(233, 241, 243);
	height: 100%;

	.main-func {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		height: $func-height;

		.search {
			background-color: rgb(221, 221, 221);
			width: 250px;
			height: 30px;
			border-radius: 15px;
			padding: 0 10px;

			input {
				border: none;
				background-color: transparent;
				outline: none;
				height: 30px;
				width: 200px;
				margin: 0 5px;
			}
		}
	}
}

</style>
