<template>
	<div class="app">
		<!-- header -->
		<el-row class="top">
			<el-col :span="24">
				<div class="header">
					<div class="logo">
						<i class="fa fa-mixcloud" aria-hidden="true" style="margin-right:15px"></i>Cloud
					</div>

					<div class="user" @click="verifyToken" @mouseover="overpop" @mouseout="outpop">
						<div class="head">
							<img :src="user_info.hd_img" />
						</div>
						<span class="fc">{{user_info.uid}}</span>

						<transition name="fade">
							<div class="popover" v-show="popflag" @mouseover="overpop" @mouseout="outpop">
								<div class="popheader">
									<div class="popuser">
										<div class="head">
											<img :src="user_info.hd_img" />
										</div>
										<span title="超级权限用户" class="fc">{{user_info.uid}}</span>
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
						</transition>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row class="content">
			<!-- aside -->
			<el-col :span="3" class="aside">
				<div class="as-menu">
					<el-menu default-active="2" class="el-menu-vertical-demo" router>
						<el-menu-item index="/">
							<i class="el-icon-menu"></i>
							<span slot="title">全部文件</span>
						</el-menu-item>
						<ul class="el-menu-item-group">
							<el-menu-item index="/picture">图片</el-menu-item>
							<el-menu-item index="/document">文档</el-menu-item>
							<el-menu-item index="/video">视频</el-menu-item>
							<el-menu-item index="/music">音乐</el-menu-item>
							<el-menu-item index="/code">代码</el-menu-item>
							<el-menu-item index="/other">其他</el-menu-item>
						</ul>

						<el-menu-item index="/share" disabled>
							<i class="el-icon-share"></i>
							<span slot="title">我的分享</span>
						</el-menu-item>

						<el-menu-item index="/Recycle" disabled>
							<i class="el-icon-delete"></i>
							<span slot="title">回收站</span>
						</el-menu-item>
						<el-menu-item index="4" disabled>
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
						<el-button type="primary" @click="drawer = true" :disabled="funcbtn">
							<i class="fa fa-upload" aria-hidden="true"></i>上传文件
						</el-button>
						<el-button type="primary" plain @click="dialogFormVisible = true" :disabled="funcbtn">新建文件夹</el-button>

						<el-button
							type="primary"
							plain
							v-show="this.$store.state.checkedCities == ''?false:true"
							@click="download"
						>下载</el-button>

						<el-button
							type="primary"
							plain
							v-show="this.$store.state.checkedCities == ''?false:true"
							@click="dialogVisible=true"
						>删除</el-button>
					</div>

					<div class="search">
						<input type="text" placeholder="搜索您的文件" v-model="keywords" />
						<i class="fa fa-search" aria-hidden="true"></i>
					</div>
				</div>

				<div class="main-view" v-loading="this.$store.state.loading">
					<transition mode="out-in">
						<router-view ref="view"></router-view>
					</transition>
				</div>
			</el-col>
		</el-row>

		<!-- 上传面板 -->
		<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
			<el-upload
				class="upload-demo"
				ref="upload"
				action="http://192.168.1.100/cloud_server/upload.php"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:file-list="fileList"
				:auto-upload="false"
				:drag="true"
				:on-success="upSuccess"
				:data="{path:this.$store.state.user_info.uid + '/' + this.$store.state.path}"
				multiple
			>
				<el-button slot="trigger" size="small" type="primary" class="ch-btn">选取文件</el-button>
				<!-- <input type="file" webkitdirectory name="" id="" @change="upMore($event.target.files)"> -->
				<el-button
					style="margin-left: 10px;"
					size="small"
					type="success"
					@click="submitUpload"
					class="up-btn"
				>上传到服务器</el-button>
			</el-upload>

			<!-- <uploader :options="options" class="uploader-example">
				<uploader-unsupport :autoStart="false"></uploader-unsupport>
				<uploader-drop>
					<uploader-btn >上传文件</uploader-btn>
					<uploader-btn :directory="true">上传文件夹</uploader-btn>
				</uploader-drop>
				<uploader-list></uploader-list>
			</uploader>-->
		</el-drawer>

		<!-- 新建文件对话框 -->
		<el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="文件夹名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="newFolder">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 删除确认对话框 -->
		<el-dialog title="确认删除" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>确认要把所选文件放入回收站吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="del">确 定</el-button>
			</span>
		</el-dialog>
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
			loading: false,
			packdone: {},
			funcbtn: false,

			//上传面板
			fileList: [],
			/*
			options: {
				target: 'http://192.168.1.100/cloud_server/upload.php',
				testChunks: false,
			},*/

			//新建文件夹
			dialogTableVisible: false,
			dialogFormVisible: false,
			form: {
				name: ''
			},
			formLabelWidth: '120px',
			//wrong_name:['\\','\/',':','*','?','"','<','>','|']

			//删除文件
			dialogVisible: false
		}
	},
	created() {
		this.verifyToken()
	},

	methods: {
		upMore(e) {
			console.log(e)
		},
		open1() {
			this.packdone = this.$message({
				message: '文件打包中',
				iconClass: 'el-icon-loading',
				duration: 0
			})
		},
		open2() {
			this.packdone.close()
			this.$message({
				message: '打包完成',
				type: 'success'
			})
		},
		verifyToken() {
			// 验证token有效，并自动登录
			this.$axios({
				methods: 'POST',
				url: 'cloud_server/token.php',
				headers: {
					TOKEN: localStorage.getItem('token')
				}
			}).then(res => {
				this.$store.state.user_info = res.data
				if (res.data.state == 401) {
					this.$router.push('/login')
				} else {
					this.user_info = res.data
				}
			})
		},
		upSuccess() {
			var path =
				this.$store.state.user_info.uid + '/' + this.$store.state.path
			this.$refs.view.$refs.filelist.getList(path)
		},
		download() {
			this.open1()
			let temparr = []
			this.$store.state.checkedCities.forEach(e => {
				temparr.push(e.path)
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
					this.open2()
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
		del() {
			this.dialogVisible = false
			let temparr = []
			this.$store.state.checkedCities.forEach(e => {
				temparr.push(e.path)
			})
			this.$axios
				.post('cloud_server/delete.php', {
					file: temparr
				})
				.then(res => {
					var path =
						this.$store.state.user_info.uid +
						'/' +
						this.$store.state.path
					this.$refs.view.$refs.filelist.getList(path)
				})
		},
		newFolder() {
			let str = this.form.name
			if (str == '') {
				alert('名称不能为空!')
				return false
			}

			if (str.search(/\\|\/|\:|\*|\?|\"|\<|\>/) != -1) {
				alert('名称中不能包含 \\ / : * ? " < >')
				return false
			}

			var path =
				this.$store.state.user_info.uid + '/' + this.$store.state.path
			var params = new URLSearchParams()
			params.append('user', this.user_info.uid)
			params.append('folder_name', this.form.name)
			params.append('path', path)
			this.$axios.post('cloud_server/mkdir.php', params).then(res => {
				if (res.data.state == 200) {
					this.$refs.view.$refs.filelist.getList(path)
					this.$message({
						type: 'success',
						message: '文件夹创建成功!'
					})
					this.form.name = ''
					this.dialogFormVisible = false
				} else {
					this.$message({
						type: 'error',
						message: '文件夹创建失败!'
					})
					this.form.name = ''
					this.dialogFormVisible = false
				}
			})
		},

		logOut() {
			localStorage.clear()
			this.$router.push('/login')
		},
		overpop() {
			this.popflag = 1
			clearTimeout(this.timer)
		},
		outpop() {
			var pop = this
			clearTimeout(pop.timer)
			pop.timer = setTimeout(function() {
				pop.popflag = 0
			}, 300)
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
		},

		handleClose(done) {}
	},
	watch: {
		keywords: function(n) {
			this.$store.commit('search', n)
		},
		'$route.path': function(newValue, oldValue) {
			if (newValue.search(/filecontent/) == 1) this.funcbtn = false
			else this.funcbtn = true
		}
	}
}
</script>

<style lang="scss" scoped>
$t-height: 70px;
$b-height: calc(100% - 70px);
$func-height: 70px;

.app {
	min-width: 1440px;
	//overflow: hidden;
}

.top {
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
	z-index: 99;
}

.fc {
	color: rgb(248, 36, 36);
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

	.el-menu-item-group {
		.el-menu-item {
			background-color: #fff;
			padding-left: 50px !important;
		}
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

	.main-view {
		min-height: calc(100% - 70px);
		overflow: hidden;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.v-enter {
	opacity: 0;
	transform: translateY(100%);
}

.v-leave-to {
	opacity: 0;
	transform: translateY(-100%);
	//position: absolute;
}

.v-enter-active,
.v-leave-active {
	transition: 0.4s ease;
}
</style>

