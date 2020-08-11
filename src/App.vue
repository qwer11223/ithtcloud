<template>
	<div class="app">
		<!-- header -->
		<el-row>
			<el-col :span="24">
				<div class="header">
					<div class="logo">
						<i class="el-icon-upload">Cloud</i>
					</div>

					<div class="user">
						<div class="head"></div>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row>
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
					<el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
					<span id="statistics">10GB/150GB</span>
				</div>
			</el-col>

			<!-- main -->
			<el-col :span="21">
				<div class="main">
					<div class="main-func">
						<el-button type="primary">上传文件</el-button>
						<el-button type="primary" plain>新建文件夹</el-button>

						<div class="main-search">
							<div class="search">
								<input type="text" placeholder="搜索您的文件" />
								<i class="el-icon-search"></i>
							</div>
							<!-- <i class="fa fa-sort-amount-desc" aria-hidden="true"></i> -->
						</div>
					</div>

					<div class="main-view">
            <router-view></router-view>
          </div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}

.header {
	background: rgb(43, 43, 43);
	height: 70px;

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
			background-color: #ff0;
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
}
.aside {
	position: relative;
	background: #666;
	height: 600px;

	.as-storage {
		position: absolute;
		width: 100%;
		bottom: 0;
	}
}
.main {
	background: rgb(233, 241, 243);
	height: 600px;

	.main-func {
		position: relative;
    height: 60px;

		.main-search {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			margin: 0 15px;

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
}
</style>
