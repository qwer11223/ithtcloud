<template>
	<div class="app">
		<!-- header -->
		<el-row class="top">
			<el-col :span="24">
				<div class="header">
					<div class="logo">
						<i class="fa fa-mixcloud" aria-hidden="true" style="margin-right:15px"></i>Cloud
					</div>

					<div class="user" @click="verifyToken" @mouseover="popflag=1" @mouseout="popflag=0">
						<div class="head">
							<img :src="user_info.hd_img" />
						</div>
						<span>{{user_info.uid}}</span>

						<div class="popover" v-show="popflag" @mouseover="popflag=1" @mouseout="popflag=0">
							<div class="popheader">
								<div class="popuser">
									<div class="head">
										<img :src="user_info.hd_img" />
									</div>
									<span>{{user_info.uid}}</span>
								</div>
							</div>
							<div class="poplist">
								<ul>
									<li>个人资料</li>
									<li>偏好设置</li>
									<li @click="logOut">退出</li>
								</ul>
							</div>
						</div>
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
								<i class="el-icon-menu"></i>
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
							<i class="el-icon-share"></i>
							<span slot="title">我的分享</span>
						</el-menu-item>

						<el-menu-item index="3">
							<i class="el-icon-delete"></i>
							<span slot="title">回收站</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-refresh"></i>
							<span slot="title">多设备同步</span>
						</el-menu-item>
					</el-menu>
				</div>

				<div class="as-storage">
					<el-progress :text-inside="true" :stroke-width="15" :percentage="storage"></el-progress>
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
				<el-button
					style="margin-left: 10px;"
					size="small"
					type="success"
					@click="submitUpload"
					class="up-btn"
				>上传到服务器</el-button>
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
			storage: 30,
			keywords: '',
			popflag: false,
			user_info: [],

			//上传面板属性
			fileList: []
		}
	},
	created(){
		this.verifyToken()
	},
	methods: {
		verifyToken() {
			// 验证token有效，并自动登录
			this.$axios({
				methods: 'POST',
				url: 'cloud_server/token.php',
				headers: {
					TOKEN: localStorage.getItem('token')
				}
			}).then(res => {
				//console.log(res)
				if (res.data.state == 401) {
					this.$router.push('/login')
				} else {
					this.user_info = res.data
				}
			})
		},
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
		logOut() {
			localStorage.clear()
			this.$router.push('/login')
		},

		//上传面板方法
		submitUpload() {
			//console.log(this.fileList)
			//console.log(this.$refs)
			this.$refs.upload.submit()
		},
		handleRemove(file, fileList) {
			//console.log(file, fileList)
		},
		handlePreview(file) {
			//console.log(file)
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

.app{
	min-width: 1440px;
}

.top {
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
	z-index: 99;
}

.header {
	background: #fff;
	height: $t-height;
	padding: 0 10px;
	position: relative;

	.logo {
		display: inline-block;
		width: 200px;
		height: inherit;
		line-height: 70px;
		color: #09aaff;
		font-size: 2.5em;
		margin: 0 16px;
	}

	.user {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 50px;
		display: flex;
		align-items: center;
		color: #333;

		&:hover .popover {
			display: block;
		}

		.head {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			border: 2px solid rgb(233, 233, 233);
			margin-right: 10px;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.popover {
			position: absolute;
			top: 55px;
			right: -20px;
			width: 200px;
			box-shadow: 0 1px 5px #999;
			border-radius: 5px;
			background-color: #fff;

			.popheader {
				background: url(../../public/images/user-level-bg.png);
				padding: 20px;

				.popuser {
					display: flex;
					align-items: center;
				}
			}

			.poplist {
				ul {
					list-style: none;
				}

				li {
					padding: 10px;
					font-size: 14px;
					cursor: pointer;
					user-select: none;

					&:hover {
						background-color: #eaf7ff;
					}
				}
			}
		}

		.popover::before {
			content: '';
			position: absolute;
			width: 15px;
			height: 15px;
			background-color: #24b9fd;
			transform: rotate(45deg);
			top: -7px;
			right: 20%;
			z-index: -10;
		}

		.popover::after {
			content: '';
			position: absolute;
			width: inherit;
			height: 50px;
			top: -30px;
			left: 0;
			z-index: -99;
		}
	}
}

.content {
	height: $b-height;
}

.aside {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #f7f7f7;
	height: 100%;

	.el-menu {
		background-color: #f7f7f7 !important;
		border-right: 1px solid #eee;
		overflow: hidden;
	}

	.as-storage {
		width: 100%;
		padding: 10px;
		text-align: right;
		background-color: #fff;

		#statistics {
			display: block;
			font-size: 14px;
			margin-top: 10px;
		}
	}
}
.main {
	background: #fff;
	height: 100%;

	.main-func {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		height: $func-height;

		.search {
			background-color: rgb(235, 235, 235);
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
