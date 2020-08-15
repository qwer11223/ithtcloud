<template>
	<transition name="el-fade-in">
		<div class="login-container" v-show="show">
			<div class="box"  >
				<p class="title">Cloud</p>
				<div class="inner">
					<form>
						<p class="input">
							<i class="fa fa-user-o" aria-hidden="true"></i>
							<input type="text" v-model="user" placeholder="请输入用户名" required />
						</p>
						<p class="input">
							<i class="fa fa-lock" aria-hidden="true"></i>
							<input type="password" v-model="pwd" placeholder="请输入密码" required />
						</p>
						<p class="input btn">
							<button @click="submit">登录</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			user: '',
			pwd: '',
			show: false
		}
	},
	mounted() {
		this.show = true
	},
	methods: {
		submit() {
			if (this.user == '' || this.pwd == '') return false
			var params = new URLSearchParams()
			params.append('user', this.user)
			params.append('pwd', this.pwd)
			this.$axios.post('cloud_server/jwt.php', params).then(res => {
				if (res.data == 403) {
					this.open4()
					return false
				}
				localStorage.setItem('token', res.headers.authorization)
				this.$router.push('/')
			})
		},
		open4() {
			this.$message({
				showClose: true,
				message: '用户名或密码错误',
				type: 'error'
			})
		}

		/*
		check() {
			this.$axios({
				methods: 'POST',
				url: 'cloud_server/jwt.php',
				headers: {
					TOKEN: localStorage.getItem('token')
				}
			}).then(res => {
				console.log(res)
			})
		}
		*/
	}
}
</script>

<style lang="scss" scoped>
.login-container {
	width: 100%;
	height: 100%;
	background: url(../../public/images/login_bg.jpg);
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	.box {
		width: 500px;

		.title {
			font-size: 50px;
			color: #fff;
			font-weight: bold;
		}

		.inner {
			padding: 0 20%;

			.input {
				border: 1px solid #fff;
				display: flex;
				align-items: center;
				padding: 0 15px;
				margin: 20px 0;
				border-radius: 50px;
				color: #fff;

				> input {
					padding-left: 10px;
					color: #fff;
					font-size: 17px;
				}

				> button {
					font-size: 18px;
					font-weight: bold;
					letter-spacing: 5px;
					color: #fff;
				}

				input,
				button {
					width: 100%;
					height: 45px;
					border: none;
					background: none;
					outline: none;
				}
			}

			.btn {
				transition: 0.3s;

				&:hover {
					background-color: #fff;
				}
			}
		}
	}
}

.input-focus {
	border: 1px solid rgb(75, 60, 163) !important;
}

.transition-box {
	margin-bottom: 10px;
	width: 200px;
	height: 100px;
	border-radius: 4px;
	background-color: #409eff;
	text-align: center;
	color: #fff;
	padding: 40px 20px;
	box-sizing: border-box;
	margin-right: 20px;
}
</style>